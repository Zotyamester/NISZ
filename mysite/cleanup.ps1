rm -Force db.sqlite3
rm -r main/migrations/
rm -r accounts/migrations/
rm -r groups/migrations/
python manage.py makemigrations
python manage.py makemigrations main
python manage.py makemigrations accounts
python manage.py makemigrations groups
python manage.py migrate
python manage.py migrate main
python manage.py migrate accounts
python manage.py migrate groups
# python manage.py createsuperuser --noinput --username "admin" --email "szatmary.zoltan1222@gmail.com"
