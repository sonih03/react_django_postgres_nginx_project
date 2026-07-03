from django.db import models

class Users(models.Model):
    username = models.CharField(max_length=50, unique=True) # 연습용 중복 방지
    password = models.CharField(max_length=128)
    age = models.IntegerField()
    email = models.EmailField()
    city = models.CharField(max_length=50)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.username

    @property
    def is_authenticated(self):
        return True

class Employee(models.Model):
    # 자바의 nullable = false는 장고에서 null=False, blank=False (기본값)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True) # 장고 이메일 전용 필드 활용
    job = models.CharField(max_length=100)
    pay = models.IntegerField()

    class Meta:
        db_table = 'employees' # 자바의 @Table(name = "employees")와 완벽 싱크!

    def __str__(self):
        return f"{self.username} ({self.job})"

class Todo(models.Model):
    # 자바의 unique = true 및 변수명 subject 완벽 매칭
    subject = models.CharField(max_length=200, unique=True)
    # 자바의 checked 변수명 및 기본값 false 완벽 매칭
    checked = models.BooleanField(default=False)

    class Meta:
        db_table = 'todos'  # 데이터그립으로 밀었던 그 실물 테이블 이름 매핑!

    def __str__(self):
        return self.subject

class Product(models.Model):
    product_name = models.CharField(max_length=200)
    color = models.CharField(max_length=50)
    price = models.IntegerField()
    sale_price = models.IntegerField()
    category_code = models.CharField(max_length=50)

    class Meta:
        db_table = 'products' # 데이터그립에 있던 실물 테이블 매핑!

    def __str__(self):
        return f"[{self.category_code}] {self.product_name}"

class Sale(models.Model):
    user_id = models.BigIntegerField()       # 자바 Long user_id 매칭
    product_id = models.BigIntegerField()    # 자바 Long product_id 매칭
    quantity = models.IntegerField()
    discount_rate = models.FloatField()      # 자바 Double 매칭 (소수점)
    total_price = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True) # 자바 LocalDateTime 매칭

    class Meta:
        db_table = 'sales' # 데이터그립 실물 테이블 매핑

    def __str__(self):
        return f"Sale ID: {self.id} (User: {self.user_id}, Product: {self.product_id})"