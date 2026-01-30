/**
 * 히어로 이미지 일괄 최적화
 * - 최대 가로 1920px 리사이즈 (비율 유지)
 * - JPG 품질 82%로 압축
 * - 원본은 assets/images/hero-backup 에 백업 후 덮어쓰기
 */

const fs = require('fs');
const path = require('path');

const heroImages = [
  '학교청소/cleaning-and-disinfection-school-class-to-prevent-2026-01-09-07-38-52-utc.jpg',
  '관공서청소/a-sleek-glass-building-reflects-the-sky-and-clouds-2026-01-08-00-08-59-utc.jpg',
  '폐기물처리/workers-on-waste-processing-plant-2026-01-09-06-39-36-utc.jpg',
  '유품정리/worker-in-white-uniform-with-sprayer-working-in-ap-2026-01-05-23-02-33-utc.jpg',
  '쓰레기집청소/workers-in-empty-waste-processing-workshop-2026-01-08-06-40-50-utc.jpg',
  '바닥왁스코딩/woman-worker-using-scrubber-machine-for-cleaning-p-2026-01-11-09-10-24-utc.jpg',
  '카페트클리닝/woman-cleaning-carpet-with-a-steam-cleaner-2026-01-05-04-58-08-utc.jpg',
  '방역소독/cleaning-and-disinfection-of-office-to-prevent-cov-2026-01-08-06-54-57-utc.jpg',
  '에어컨정밀청소/air-conditioner-repair-preparing-for-summer-seaso-2026-01-09-07-07-11-utc.jpg',
  '상업시설/modern-architecture-2026-01-09-00-40-08-utc.jpg',
  '사무실청소/two-professional-cleaners-tidying-a-stylish-space-2026-01-09-11-53-33-utc.jpg',
  '외벽청소/skyscraper-2026-01-08-07-14-25-utc.jpg',
  '준공청소/aerial-view-of-multistory-apartment-construction-s-2026-01-07-00-44-15-utc.jpg',
  'call-center-2026-01-07-07-26-14-utc.jpg',
  'portrait-of-confident-chinese-business-people-2026-01-11-11-12-31-utc.jpg',
];

const MAX_WIDTH = 1920;
const JPEG_QUALITY = 82;
const imagesDir = path.join(__dirname, 'assets/images');
const backupDir = path.join(imagesDir, 'hero-backup');

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('sharp 패키지가 필요합니다. 프로젝트 루트에서 실행하세요: npm install');
    process.exit(1);
  }

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    console.log('백업 폴더 생성:', backupDir);
  }

  let totalBefore = 0;
  let totalAfter = 0;

  console.log('=== 히어로 이미지 최적화 시작 ===\n');
  console.log(`설정: 최대 가로 ${MAX_WIDTH}px, JPG 품질 ${JPEG_QUALITY}%\n`);

  for (const relPath of heroImages) {
    const srcPath = path.join(imagesDir, relPath);

    if (!fs.existsSync(srcPath)) {
      console.log('건너뜀 (파일 없음):', relPath);
      continue;
    }

    const beforeSize = fs.statSync(srcPath).size;
    totalBefore += beforeSize;

    const backupPath = path.join(backupDir, relPath.replace(/\//g, '_'));
    const dir = path.dirname(backupPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(srcPath, backupPath);

    try {
      await sharp(srcPath)
        .resize(MAX_WIDTH, null, { withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY })
        .toFile(srcPath + '.tmp');

      fs.renameSync(srcPath + '.tmp', srcPath);
      const afterSize = fs.statSync(srcPath).size;
      totalAfter += afterSize;

      const saved = ((1 - afterSize / beforeSize) * 100).toFixed(1);
      console.log(
        `${path.basename(relPath).slice(0, 40).padEnd(42)} ` +
        `${(beforeSize / 1024 / 1024).toFixed(2)} MB → ${(afterSize / 1024).toFixed(0)} KB (${saved}% 감소)`
      );
    } catch (err) {
      console.error('오류:', relPath, err.message);
      fs.copyFileSync(backupPath, srcPath);
    }
  }

  console.log('\n--- 결과 ---');
  console.log(`최적화 전: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`최적화 후: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`절감: ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%`);
  console.log('\n원본 백업 위치: assets/images/hero-backup/');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
