import os
import json
import django
from django.contrib.auth.hashers import make_password

# 1. 장고 환경 변수 연동 설정
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

# 2. 필요한 모델들 임포트
from app.models import Users, Product, Sale


def inject_json():
    if Users.objects.exists():
            print("💡 [안내] 이미 디비에 강사님 데이터가 수혈되어 있습니다. 주입을 건너뜁니다.")
            return
    file_path = os.path.join(os.path.dirname(__file__), 'data.json')

    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # === [1] 유저 데이터 주입 ===
    user_list = data.get('user', [])
    user_count = 0
    for u in user_list:
        Users.objects.create(
            id=int(u.get('id')),
            username=u.get('name') or u.get('username'),
            password=make_password(str(u.get('password'))),
            age=int(u.get('age')) if u.get('age') else 0,
            email=u.get('email'),
            city=u.get('city')
        )
        user_count += 1

    # === [2] 상품(Product) 데이터 주입 ===
    product_list = data.get('product', [])
    product_count = 0
    for p in product_list:
        # 강사님 데이터의 'cost_price' 혹은 'price' 둘 다 방어
        price_value = p.get('cost_price') or p.get('price')

        Product.objects.create(
            id=int(p.get('id')),
            product_name=p.get('product_name') or p.get('name'),
            color=p.get('color'),
            price=int(price_value) if price_value else 0,  # 🎯 이성적으로 해결 완료!
            sale_price=int(p.get('sale_price')) if p.get('sale_price') else 0,
            category_code=p.get('category_code')
        )
        product_count += 1

    # === [3] 판매 내역(Sale) 데이터 주입 ===
    sale_list = data.get('sales', []) or data.get('sale', [])
    sale_count = 0
    for s in sale_list:
        # 장고 모델에 created_at 필드가 없을 경우를 대비해 딕셔너리로 가공
        sale_kwargs = {
            'id': int(s.get('id')),
            'user_id': int(s.get('user_id')),
            'product_id': int(s.get('product_id')),
            'quantity': int(s.get('quantity')),
            'discount_rate': float(s.get('discount_rate')),
            'total_price': int(s.get('total_price'))
        }

        # 만약 네 장고 모델에 created_at 필드가 존재한다면 추가로 넣어줌
        if hasattr(Sale, 'created_at') and s.get('created_at'):
            sale_kwargs['created_at'] = s.get('created_at')

        Sale.objects.create(**sale_kwargs)
        sale_count += 1

    print(f"\n🔥 [데이터 이식 최종 완벽 올클리어!]")
    print(f"👥 유저 데이터: {user_count}개 삽입 완료")
    print(f"📦 상품 데이터: {product_count}개 삽입 완료")
    print(f"💰 판매 내역: {sale_count}개 삽입 완료")


if __name__ == '__main__':
    inject_json()