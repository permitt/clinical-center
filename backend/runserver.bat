python manage.py migrate
python manage.py loaddata DATA.json
schtasks /create /tn "AssignHallTaskName" /tr C:\Users\bekim\Desktop\FINALNO\clinical-center\backend\scheduleTask.bat /sc daily /st 07:00 /ed 07/30/2020
python manage.py runserver
