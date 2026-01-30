const fs = require('fs');
const path = require('path');
const base = path.join(__dirname, 'assets/images');

const heroImages = [
  ['school', '학교청소/cleaning-and-disinfection-school-class-to-prevent-2026-01-09-07-38-52-utc.jpg'],
  ['government', '관공서청소/a-sleek-glass-building-reflects-the-sky-and-clouds-2026-01-08-00-08-59-utc.jpg'],
  ['waste', '폐기물처리/workers-on-waste-processing-plant-2026-01-09-06-39-36-utc.jpg'],
  ['death', '유품정리/worker-in-white-uniform-with-sprayer-working-in-ap-2026-01-05-23-02-33-utc.jpg'],
  ['trash', '쓰레기집청소/workers-in-empty-waste-processing-workshop-2026-01-08-06-40-50-utc.jpg'],
  ['floor', '바닥왁스코딩/woman-worker-using-scrubber-machine-for-cleaning-p-2026-01-11-09-10-24-utc.jpg'],
  ['carpet', '카페트클리닝/woman-cleaning-carpet-with-a-steam-cleaner-2026-01-05-04-58-08-utc.jpg'],
  ['bug', '방역소독/cleaning-and-disinfection-of-office-to-prevent-cov-2026-01-08-06-54-57-utc.jpg'],
  ['aircon', '에어컨정밀청소/air-conditioner-repair-preparing-for-summer-seaso-2026-01-09-07-07-11-utc.jpg'],
  ['store', '상업시설/modern-architecture-2026-01-09-00-40-08-utc.jpg'],
  ['office', '사무실청소/two-professional-cleaners-tidying-a-stylish-space-2026-01-09-11-53-33-utc.jpg'],
  ['building02', '외벽청소/skyscraper-2026-01-08-07-14-25-utc.jpg'],
  ['building', '준공청소/aerial-view-of-multistory-apartment-construction-s-2026-01-07-00-44-15-utc.jpg'],
  ['customer', 'call-center-2026-01-07-07-26-14-utc.jpg'],
  ['about', 'portrait-of-confident-chinese-business-people-2026-01-11-11-12-31-utc.jpg'],
];

let total = 0;
console.log('=== 히어로 이미지 용량 ===\n');
heroImages.forEach(([page, relPath]) => {
  const p = path.join(base, relPath);
  try {
    const stat = fs.statSync(p);
    const kb = (stat.size / 1024).toFixed(1);
    const mb = (stat.size / 1024 / 1024).toFixed(2);
    total += stat.size;
    console.log(`${page.padEnd(12)} ${mb} MB (${kb} KB)`);
  } catch (e) {
    console.log(`${page.padEnd(12)} 파일 없음: ${relPath}`);
  }
});
console.log('\n--- 합계 ---');
console.log(`총 ${(total / 1024 / 1024).toFixed(2)} MB (${(total / 1024).toFixed(0)} KB)`);
