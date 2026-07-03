# ===================================================================
# 젠킨스 공식 LTS 이미지 기반 빌드 서버 (Git 기본 내장)
# ===================================================================
FROM jenkins/jenkins:lts-jdk17

# 루트 권한으로 전환하여 패키지 설치 진행
USER root

# -------------------------------------------------------------------
# 1. 시스템 업데이트 및 필수 유틸리티 설치
# -------------------------------------------------------------------
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    ca-certificates \
    lsb-release \
    && rm -rf /var/lib/apt/lists/*

# -------------------------------------------------------------------
# 2. Node.js (v20 LTS) 설치
# -------------------------------------------------------------------
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# -------------------------------------------------------------------
# 3. Docker CLI 설치 (Docker-out-of-Docker 구현용 - 오타 교정 완료! ✨)
# -------------------------------------------------------------------
RUN mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update \
    && apt-get install -y docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*

# -------------------------------------------------------------------
# 4. 권한 제어 알고리즘 (중요 🚨)
# -------------------------------------------------------------------
# 젠킨스 유저가 호스트의 docker.sock을 긁어다 쓸 수 있도록 docker 그룹(GID 999 등) 생성 및 할당
RUN groupadd -g 999 docker || true \
    && usermod -aG docker jenkins

# 다시 안전하게 jenkins 유저로 복귀
USER jenkins

# 환경 변수 확인용 주석 (빌드 완료 후 버전 체크용)
# git --version
# node --version
# npm --version
# docker --version