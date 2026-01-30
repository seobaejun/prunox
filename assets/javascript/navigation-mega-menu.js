// 네비게이션 메뉴 호버 시 모든 세부 메뉴 표시 (메인 메뉴 위치에 맞춰)
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu .dropdown');
    const submenuSidebar = document.querySelector('.submenu-sidebar');
    const submenuGroups = document.querySelectorAll('.submenu-group');
    const nav = document.querySelector('.nav');
    let hoverTimeout;

    if (!submenuSidebar || !nav) {
        return;
    }

    // 메인 메뉴 항목의 위치를 계산하여 세부 메뉴 그룹 배치
    function updateSubmenuPositions() {
        if (!submenuSidebar.classList.contains('active')) {
            return;
        }
        
        const submenuContainer = submenuSidebar.querySelector('.submenu-container');
        if (!submenuContainer) return;
        
        menuItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const containerRect = submenuContainer.getBoundingClientRect();
            const relativeLeft = rect.left - containerRect.left;
            
            const submenuGroup = submenuGroups[index];
            if (submenuGroup) {
                submenuGroup.style.left = relativeLeft + 'px';
            }
        });
    }

    // 헤더 높이 계산
    function getHeaderHeight() {
        const header = document.querySelector('.header');
        if (header) {
            return header.offsetHeight;
        }
        return 80;
    }

    // 메뉴 항목에 마우스 오버 시
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            
            // 헤더 높이에 맞춰 top 위치 설정
            const headerHeight = getHeaderHeight();
            submenuSidebar.style.top = headerHeight + 'px';
            
            // 사이드바 표시
            submenuSidebar.style.display = 'block';
            submenuSidebar.style.opacity = '0';
            submenuSidebar.classList.add('active');
            
            // 위치 업데이트 (약간의 지연 후)
            setTimeout(() => {
                updateSubmenuPositions();
            }, 50);
            
            // 페이드 인 애니메이션
            requestAnimationFrame(() => {
                submenuSidebar.style.transition = 'opacity 0.3s ease';
                submenuSidebar.style.opacity = '1';
                // 위치 재계산
                setTimeout(() => {
                    updateSubmenuPositions();
                }, 100);
            });
        });

        item.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                if (!submenuSidebar.matches(':hover')) {
                    submenuSidebar.style.opacity = '0';
                    setTimeout(() => {
                        if (submenuSidebar.style.opacity === '0') {
                            submenuSidebar.classList.remove('active');
                            submenuSidebar.style.display = 'none';
                        }
                    }, 300);
                }
            }, 100);
        });
    });

    // 사이드바에 마우스가 있을 때는 유지
    submenuSidebar.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
    });
    
    submenuSidebar.addEventListener('mouseleave', function() {
        submenuSidebar.style.opacity = '0';
        setTimeout(() => {
            submenuSidebar.classList.remove('active');
            submenuSidebar.style.display = 'none';
        }, 300);
    });

    // 네비게이션 영역에서 벗어나면 사이드바 숨김
    nav.addEventListener('mouseleave', function() {
        hoverTimeout = setTimeout(() => {
            submenuSidebar.style.opacity = '0';
            setTimeout(() => {
                submenuSidebar.classList.remove('active');
                submenuSidebar.style.display = 'none';
            }, 300);
        }, 200);
    });

    // 윈도우 리사이즈 시 위치 재계산
    window.addEventListener('resize', function() {
        if (submenuSidebar.classList.contains('active')) {
            updateSubmenuPositions();
        }
    });
    
    // 스크롤 시 위치 재계산
    window.addEventListener('scroll', function() {
        if (submenuSidebar.classList.contains('active')) {
            updateSubmenuPositions();
        }
    });
});






