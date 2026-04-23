# Django E-Commerce Backend

This is the Django REST API backend for the e-commerce website.

## Setup Instructions

### 1. Create a Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
```

You can generate a secret key using:
```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

### 4. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create a Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 6. Run the Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Categories
- `GET /api/categories/` - List all categories
- `GET /api/categories/{id}/` - Get category details
- `GET /api/categories/{id}/products/` - Get products in a category

### Products
- `GET /api/products/` - List all products
  - Query parameters:
    - `category` - Filter by category slug
    - `search` - Search products by name or description
- `GET /api/products/{id}/` - Get product details
- `GET /api/products/featured/` - Get featured products

### Orders
- `POST /api/orders/` - Create a new order
- `GET /api/orders/{id}/` - Get order details

## Admin Panel

Access the Django admin panel at `http://localhost:8000/admin/` after creating a superuser.

## Project Structure

```
backend/
├── config/          # Django project settings
├── store/           # E-commerce app
│   ├── models.py    # Database models
│   ├── views.py     # API views
│   ├── serializers.py  # DRF serializers
│   └── urls.py      # URL routing
├── manage.py        # Django management script
└── requirements.txt # Python dependencies
```
