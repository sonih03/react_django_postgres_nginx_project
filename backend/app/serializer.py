# app/serializer.py
from rest_framework import serializers
from django.contrib.auth.hashers import make_password  # 🎯 장고 내장 암호화 함수
from .models import Users
from .models import Employee
from .models import Todo
from .models import Product
from .models import Sale

#user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'password', 'age', 'email', 'city']
        extra_kwargs = {
            'password': {'write_only': True}  # 🎯 조회(GET)할 때 비밀번호는 숨겨주는 센스!
        }

    # 회원가입(POST)할 때 호출되는 메서드 오버라이딩
    def create(self, validated_data):
        # 평문 비밀번호를 make_password를 통해 해시코드로 변환
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    # 회원 수정(PUT)할 때 호출되는 메서드 오버라이딩
    def update(self, instance, validated_data):
        # 만약 수정 데이터에 비밀번호가 포함되어 있다면 암호화 처리
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)

#employee
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'username', 'email', 'job', 'pay'] # 자바 키값 그대로 싱크 맞춤

#todo
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'subject', 'checked'] # 자바 변수명과 100% 일치!

#product
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'product_name', 'color', 'price', 'sale_price', 'category_code']

#sale
class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = ['id', 'user_id', 'product_id', 'quantity', 'discount_rate', 'total_price', 'created_at']