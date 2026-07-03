from django.urls import path, include
from .views import(
    UsersListView,
    UsersDetailView,
    UsersCreateView,
    UsersDeleteView,
    UsersUpdateView,
    UsersLoginView,
    UsersMeView,
    EmployeeListView,
    EmployeeDetailView,
    TodoListView,
    TodoDetailView,
    ProductListView,
    ProductDetailView,
    SaleListView,
    SaleDetailView
)

urlpatterns = [
    path('users/', UsersListView.as_view()),
    path('users/<int:pk>', UsersDetailView.as_view()),
    path('users/create', UsersCreateView.as_view()),
    path('users/update/<int:pk>', UsersUpdateView.as_view()),
    path('users/delete/<int:pk>', UsersDeleteView.as_view()),
    path('auth/login/', UsersLoginView.as_view()),
    path('auth/me/', UsersMeView.as_view()),
    path('employees/', EmployeeListView.as_view()),
    path('employees/<int:pk>/', EmployeeDetailView.as_view()),
    path('todos/', TodoListView.as_view()),
    path('todos/<int:pk>/', TodoDetailView.as_view()),
    path('products/', ProductListView.as_view()),
    path('products/<int:pk>/', ProductDetailView.as_view()),
    path('sales/', SaleListView.as_view()),
    path('sales/<int:pk>/', SaleDetailView.as_view()),
]