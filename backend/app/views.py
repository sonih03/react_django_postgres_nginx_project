from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# 🎯 [추가] 장고의 암호화된 비밀번호를 검증해 주는 핵심 함수!
from django.contrib.auth.hashers import check_password

#user
from .models import Users
from .serializer import UserSerializer
#employee
from .models import Employee
from .serializer import EmployeeSerializer
#todo
from .models import Todo
from .serializer import TodoSerializer
#product
from .models import Product
from .serializer import ProductSerializer
#sale
from .models import Sale
from .serializer import SaleSerializer

import jwt
import datetime
from django.conf import settings

# JWT 설정 값
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = 'HS256'


#get all
class UsersListView(APIView):
    def get(self, request):
        users = Users.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

#get one
class UsersDetailView(APIView):
    def get(self, request, pk):
        users = Users.objects.get(pk=pk)
        serializer = UserSerializer(users)
        return Response(serializer.data)

#post
class UsersCreateView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#put
class UsersUpdateView(APIView):
    def put(self, request, pk):
        user = Users.objects.get(pk=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#delete
class UsersDeleteView(APIView):
    def delete(self, request, pk):
        user = Users.objects.get(pk=pk)
        user.delete()
        return Response(pk, status=status.HTTP_204_NO_CONTENT)


class UsersLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = Users.objects.get(username=username)

            # 🎯 기존 user.password == password 를 아래 코드로 변경!
            # 입력받은 평문(password)과 DB의 해시값(user.password)을 교차 검증해 줌
            if check_password(password, user.password):
                payload = {
                    'user_id': user.id,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
                }
                token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

                return Response({'message': '로그인 성공!', 'access_token': token}, status=status.HTTP_200_OK)
            else:
                return Response({'error': '비밀번호가 틀렸어.'}, status=status.HTTP_401_UNAUTHORIZED)

        except Users.DoesNotExist:
            return Response({'error': '존재하지 않는 유저야.'}, status=status.HTTP_404_NOT_FOUND)


# 👤 2. 내 정보 조회 API (강사님 스타일로 대폭 축소!)
class UsersMeView(APIView):
    # 🎯 인증 안 된 녀석들은 들어오지도 못하게 DRF 가드 치기!
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # 🎯 대박인 점: authentication.py 덕분에 이미 로그인된 유저 객체가
        # request.user에 자동으로 꽂혀있음! 복잡하게 토큰 까는 코드 싹 제거됨.
        user = request.user

        serializer = UserSerializer(user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)

#employee
class EmployeeListView(APIView):
    def get(self, request):
        employees = Employee.objects.all().order_by('id') # ID 순서대로 정렬
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 👥 특정 직원 수정 및 삭제 (PUT, DELETE)
class EmployeeDetailView(APIView):
    def get(self, request, pk):
        try:
            employee = Employee.objects.get(pk=pk)  # 딱 ID(pk)에 맞는 한 명만 타겟팅!
            serializer = EmployeeSerializer(employee)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Employee.DoesNotExist:
            return Response({'error': '존재하지 않는 직원이야.'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            employee = Employee.objects.get(pk=pk)
            # 자바 DTO 스펙에 맞춰 넘어온 데이터(pay, job 등)를 부분 수정(partial=True)
            serializer = EmployeeSerializer(employee, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Employee.DoesNotExist:
            return Response({'error': '존재하지 않는 직원이야.'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            employee = Employee.objects.get(pk=pk)
            employee.delete()
            return Response(pk, status=status.HTTP_204_NO_CONTENT)
        except Employee.DoesNotExist:
            return Response({'error': '존재하지 않는 직원이야.'}, status=status.HTTP_404_NOT_FOUND)


#todo
class TodoListView(APIView):
    def get(self, request):
        todos = Todo.objects.all().order_by('id') # ID 순서대로 정렬
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 📝 특정 할 일 상세 조회, 수정, 삭제 (GET, PUT, DELETE)
class TodoDetailView(APIView):
    # 🎯 아까 배운 레슨 반영! 단건 조회 GET을 미리 만들어둬서 405 예방하기
    def get(self, request, pk):
        try:
            todo = Todo.objects.get(pk=pk)
            serializer = TodoSerializer(todo)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Todo.DoesNotExist:
            return Response({'error': '존재하지 않는 일정이야.'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            todo = Todo.objects.get(pk=pk)
            # checked 상태 변경이나 subject 수정을 위해 partial=True 활성화
            serializer = TodoSerializer(todo, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Todo.DoesNotExist:
            return Response({'error': '존재하지 않는 일정이야.'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            todo = Todo.objects.get(pk=pk)
            todo.delete()
            return Response(pk, status=status.HTTP_204_NO_CONTENT)
        except Todo.DoesNotExist:
            return Response({'error': '존재하지 않는 일정이야.'}, status=status.HTTP_404_NOT_FOUND)


#product
class ProductListView(APIView):
    def get(self, request):
        products = Product.objects.all().order_by('id')
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 📦 특정 상품 상세 조회, 수정, 삭제 (GET, PUT, DELETE)
class ProductDetailView(APIView):
    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({'error': '존재하지 않는 상품이야.'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response({'error': '존재하지 않는 상품이야.'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            product.delete()
            return Response(pk, status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response({'error': '존재하지 않는 상품이야.'}, status=status.HTTP_404_NOT_FOUND)

#sale
class SaleListView(APIView):
    def get(self, request):
        sales = Sale.objects.all().order_by('id')
        serializer = SaleSerializer(sales, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SaleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 💰 특정 판매 상세 조회, 수정, 삭제 (GET, PUT, DELETE)
class SaleDetailView(APIView):
    def get(self, request, pk):
        try:
            sale = Sale.objects.get(pk=pk)
            serializer = SaleSerializer(sale)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Sale.DoesNotExist:
            return Response({'error': '존재하지 않는 판매 정보야.'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            sale = Sale.objects.get(pk=pk)
            serializer = SaleSerializer(sale, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Sale.DoesNotExist:
            return Response({'error': '존재하지 않는 판매 정보야.'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            sale = Sale.objects.get(pk=pk)
            sale.delete()
            return Response(pk, status=status.HTTP_204_NO_CONTENT)
        except Sale.DoesNotExist:
            return Response({'error': '존재하지 않는 판매 정보야.'}, status=status.HTTP_404_NOT_FOUND)