// Firebase 초기화
// Firebase SDK가 로드된 후 실행됩니다
document.addEventListener('DOMContentLoaded', function() {
    // Firebase가 로드되었는지 확인
    if (typeof firebase !== 'undefined') {
        try {
            // Firebase 초기화
            const app = firebase.initializeApp(firebaseConfig);
            
            // Analytics 초기화 (선택사항)
            if (firebase.analytics) {
                const analytics = firebase.analytics(app);
                console.log('Firebase Analytics initialized');
            }
            
            console.log('Firebase initialized successfully');
            
            // 전역 변수로 app 객체 저장 (다른 스크립트에서 사용 가능)
            window.firebaseApp = app;
        } catch (error) {
            console.error('Firebase initialization error:', error);
        }
    } else {
        console.error('Firebase SDK is not loaded. Make sure to include Firebase scripts in your HTML.');
    }
});

