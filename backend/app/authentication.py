import jwt
from django.conf import settings
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed
from .models import Users


class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        # 1. HTTP 헤더에서 Authorization 추출
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return None  # 토큰이 없으면 그냥 통과 (인증 안 된 유저로 처리)

        if not auth_header.startswith('Bearer '):
            raise AuthenticationFailed('토큰 형식이 Bearer로 시작해야 합니다.')

        token = auth_header.split(' ')[1]

        try:
            # 2. 토큰 복호화
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')

            # 3. 토큰 속 유저 ID로 유저 객체 찾기
            user = Users.objects.get(id=user_id)

            # 🎯 중요: DRF 규칙상 (유저 객체, 토큰)을 튜플로 반환해야 함!
            # 이렇게 반환하면 뷰에서 `request.user`로 로그인한 유저에게 바로 접근 가능해져.
            return (user, token)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('토큰 유효기간이 만료되었습니다.')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('유효하지 않은 토큰입니다.')
        except Users.DoesNotExist:
            raise AuthenticationFailed('토큰의 사용자를 찾을 수 없습니다.')