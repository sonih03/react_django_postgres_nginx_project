pipeline {
    agent any

    stages {
        // 1단계: 배포 서버의 도커 환경 상태 체크
        stage('Check Environment') {
            steps {
                sh '''
                    echo "===== 필수 도구 버전 검문 ====="
                    pwd
                    docker --version
                    docker-compose --version || true
                '''
            }
        }

        // 2단계: 도커 컴포즈 빌드 및 컨테이너 기상
        stage('Deploy Containers') {
            steps {
                sh '''
                    echo "===== 1. 구버전 컨테이너 깔끔하게 다운 ====="
                    docker-compose down || true

                    echo "===== 2. 캐시 없이 클린 배포 이미지 빌드 및 가동 ====="
                    docker-compose up --build -d
                '''
            }
        }

        // 3단계: 갓 태어난 데이터베이스에 뼈대와 데이터 주입
        stage('Database Initialization') {
            steps {
                sh '''
                    echo "===== 1. 포스트그레스 디비 부팅 대기 (10초) ====="
                    sleep 10

                    echo "===== 2. 장고 마이그레이션 강제 실행 (테이블 생성) ====="
                    # 🚨 CI/CD 환경에서는 반드시 -T 옵션을 붙여야 터미널 에러가 안 나!
                    docker-compose exec -T backend python manage.py migrate

                    echo "===== 3. 강사님 JSON 샘플 데이터 최종 수혈 ====="
                    docker-compose exec -T backend python insert_data.py
                '''
            }
        }

        // 4단계: 컨테이너 정상 가동 여부 최종 확인
        stage('Check Live Containers') {
            steps {
                sh '''
                    echo "===== 현재 살아 숨 쉬는 컨테이너 목록 ====="
                    docker ps
                '''
            }
        }
    }

    post {
        success {
            echo '====================================='
            echo '🎉 축하한다 인호야! 배포 자동화 완전 성공! 🎉'
            echo '====================================='
        }

        failure {
            echo '====================================='
            echo '🚨 배포 실패! 블랙박스(로그)를 분석해라! 🚨'
            echo '====================================='
            sh '''
                echo "===== 1. 실패한 컨테이너 실황 조사 ====="
                docker ps -a || true

                echo "===== 2. 백엔드 장고 컨테이너 에러 로그 추적 ====="
                docker-compose logs backend || true
            '''
        }
    }
}