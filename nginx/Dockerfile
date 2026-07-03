# 📦 1단계: 리액트 앱을 빌드하는 "temporary" 스테이지
FROM node:22-alpine AS builder
WORKDIR /app

# 컴포즈 최상위 context(.) 기준으로 프론트엔드 의존성 복사 및 설치
COPY frontend/package*.json ./
RUN npm install

# 프론트엔드 전체 소스코드 복사 후 실전 배포용 빌드(dist 생성) 돌리기
COPY frontend/ ./
RUN npm run build

# 🌐 2단계: 진짜 배포용 엔진엑스 서버를 굽는 스테이지
FROM nginx:alpine

# 우리가 만든 엔진엑스 라우팅 설정 파일 주입
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# 🎯 핵심: 1단계(builder) 가상 환경에서 열심히 구운 /app/dist 폴더만 쏙 빼와서 엔진엑스 웹 루트에 복사!
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]