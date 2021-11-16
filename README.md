# Helló, Világ!

## Előfeltételek
A szerver működtetéséhez **Node.js 16** (vagy újabb) és **Python 3.8** (vagy újabb) szükséges.

## Telepítés

### Node.js
```sh
cd mysite/groups/

npm install
```

### Python
```sh
cd mysite/

python manage.py makemigrations main accounts groups

python manage.py migrate main accounts groups

python manage.py createsuperuser
```

## Futtatás
1. VSCode-ban nyiss egy új terminált, majd azt oszd ketté! (`Ctrl+Shift+ö` és `Ctrl+Shift+5`)
2. Az egyikben a `mysite/groups/`-ban legyen, a másik pedig a `mysite/`-ban!
3. Az előbbiben az `npm run dev` (vagy `dev` helyett `build`, ha az éles verzió kell), az utóbbiban pedig a `python manage.py runsever` parancsot futtasd le!
