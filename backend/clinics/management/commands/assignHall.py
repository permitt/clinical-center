from django.core.management.base import BaseCommand, CommandError
from clinics.models import Appointment, OperatingRoom, Holiday, AppointmentType
from datetime import date, timedelta, datetime
from users.models import Doctor, Schedule
from django.db.models import OuterRef, Exists

class Command(BaseCommand):

    def add_arguments(self, parser):
        pass

    def time_add(self, time, duration):
        start = datetime(
            2000, 1, 1,
            hour=time.hour, minute=time.minute, second=time.second)
        end = start + timedelta(minutes=duration)
        return end.time()

    def getAvailableHalls(self, duration, date, time, clinic):
        hallsQuery = OperatingRoom.objects.filter(clinic=clinic)
        hall_list = list(hallsQuery)
        for hall in hall_list:
            for app in hall.appointment_set.all():
                if (not (app.date == date)):
                    continue
                choosenStartTime = time
                choosenEndTime = self.time_add(time, duration)
                endsBefore = choosenEndTime < app.time
                startsAfter = choosenStartTime > self.time_add(app.time, app.typeOf.duration)

                if (not (endsBefore or startsAfter)):
                    hall_list.remove(hall)
                    break
        return hall_list

    def getAvailableDoctors(self, clinic, typeOfID, date, time):
        doctors = Doctor.objects.filter(employedAt=clinic)

        # check if doctor is on holiday
        doctors = doctors.exclude(Exists(Holiday.objects.filter(
            employee=OuterRef('user'),
            approved=True,
            startDate__lte=date,
            endDate__gte=date
        )))
        # check if doctor works that day in that time
        typeObject = AppointmentType.objects.get(id=typeOfID)
        doctors = doctors.filter(Exists(Schedule.objects.filter(
            employee__pk=OuterRef('pk'),
            day=date.weekday(),
            startTime__lte=time,
            endTime__gt=self.time_add(time, typeObject.duration)
        )))

        # check if doctor has another appointment or operation in choosen time
        doctors = list(doctors)
        for doc in doctors:
            for app in doc.appointments.all():
                if (not (app.date == date)):
                    continue
                choosenEndTime = self.time_add(time, typeObject.duration)
                endsBefore = choosenEndTime < app.time
                startsAfter = time > self.time_add(app.time, app.typeOf.duration)
                if (not (endsBefore or startsAfter)):
                    doctors.remove(doc)
                    break

            # check if doctor has another operation in choosen time
            for operation in doc.operations.all():
                if (not (operation.date == date)):
                    continue
                choosenEndTime = self.time_add(time, typeObject.duration)
                endsBefore = choosenEndTime < operation.time
                startsAfter = time > self.time_add(app.time, operation.duration)
                if (not (endsBefore or startsAfter)):
                    doctors.remove(doc)
                    break
        return doctors

    def firstAvailableDate(self, hall):
        today = date.today()
        foundDate = today

        if (foundDate.weekday() == 6):
            foundDate = foundDate + timedelta(days=1)
        if (foundDate.weekday() == 5):
            foundDate = foundDate + timedelta(days=2)

        for app in hall.appointment_set.all():
            if app.date < foundDate:
                continue
            if app.date == foundDate:
                foundDate = foundDate + timedelta(days=1)
            else:
                break

        if (foundDate.weekday() == 6) :
            foundDate = foundDate + timedelta(days=1)

        if (foundDate.weekday() == 5):
            foundDate = foundDate + timedelta(days=2)

        return foundDate


    def handle(self, *args, **options):
        self.stdout.write("Assigning halls!")
        today = date.today()
        appointments = Appointment.objects.exclude(operatingRoom__isnull=False).all()
        allHalls = OperatingRoom.objects.all()

        for app in appointments:
            if(app.created):
                if ((today - app.created).days > 1):
                    assigned = False
                    halls = self.getAvailableHalls(app.typeOf.duration, app.date, app.time, app.clinic)
                    if len(halls) > 0:
                        app.operatingRoom = halls[0]
                        app.save()
                        assigned = True
                        break
                    else:
                        for hall in allHalls:
                            if (not (hall.clinic == app.clinic)):
                                continue
                            newDate = self.firstAvailableDate(hall)
                            newTime =  datetime.strptime('08:00', '%H:%M').time()
                            doctors = self.getAvailableDoctors(app.clinic.id, app.typeOf.id, newDate, newTime)
                            doctorAvailable = False
                            for doc in doctors:
                                print(doc.email, app.doctor.email)
                                if(doc.email == app.doctor.email):
                                    doctorAvailable = True
                                    break
                            if(doctorAvailable):
                                app.date = newDate
                                app.time = newTime
                                app.operatingRoom = hall
                                app.save()
                                assigned = True
                                break
                            elif (len(doctors) > 0):
                                app.date = newDate
                                app.time = newTime
                                app.operatingRoom = hall
                                app.doctor = doctors[0]
                                print(app)
                                app.save()
                                assigned = True

                        if not assigned:
                            print('Can not assign hall for appointment: ' , app)










