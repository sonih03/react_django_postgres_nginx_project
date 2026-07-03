# 1. 파이썬 3.12 슬림 버전 베이스 이미지 (용량 최적화)
FROM python:3.12-slim

# 2. 컨테이너 내부 환경 설정
# PYTHONDONTWRITEBYTECODE: .pyc 파일 생성을 막아 용량 절약
# PYTHONUNBUFFERED: 로그가 버퍼링 없이 즉시 터미널에 찍히도록 설정 (디버깅용)
# PYTHONUTF8: 윈도우 한글 인코딩(cp949) 트랩 방지용 UTF-8 강제
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONUTF8=1

# 3. 컨테이너 내부의 기본 작업 디렉토리 지정
WORKDIR /app

# 4. 종속성 패키지 설치 (캐시를 남기지 않아 컨테이너 용량 최적화)
# 오타 나 있던 파일 이름인 거 기억하지? 철자 맞춰서 requirements.txt로 지정!
COPY requirements.txt /app/
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 5. 현재 backend 폴더의 모든 소스코드를 컨테이너 내부 /app으로 복사
COPY . /app/

# 6. 장고의 기본 포트인 8000번을 외부(도커 네트워크)에 개방
EXPOSE 8000

# 7. 컨테이너가 켜질 때 자동으로 실행될 명령어
# 로컬호스트(127.0.0.1)가 아니라 0.0.0.0으로 열어야 도커 컴포즈나 엔진엑스가 접근 가능해!
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]