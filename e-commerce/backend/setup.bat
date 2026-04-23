@echo off
echo Setting up Django Backend...
echo.

REM Create virtual environment
echo Creating virtual environment...
python -m venv venv
if errorlevel 1 (
    echo Error: Python not found. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo Error: Failed to install dependencies.
    pause
    exit /b 1
)

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    echo SECRET_KEY=django-insecure-change-this-in-production > .env
    echo DEBUG=True >> .env
    echo .env file created. Please update SECRET_KEY for production.
)

REM Run migrations
echo Running migrations...
python manage.py makemigrations
python manage.py migrate

echo.
echo Setup complete!
echo.
echo To start the server, run:
echo   venv\Scripts\activate
echo   python manage.py runserver
echo.
pause
