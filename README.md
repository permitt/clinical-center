# Clinical Center 2020 - ISA/MRS Project @ FTN, Novi Sad, Serbia

  

## Technology stacks:  
 * Backend - Django + Django Rest Framework + PostgresQL database
 * Frontend - React + Redux (JWT auth)
  
## Starting application:
Frondend:
Potrebno je pozicionirati se u folder frontend/clinical_center
I pokrenuti nmp install i zatim npm start


Pokretanje backend dela aplikacije:

Potrebno je zameniti [[apsolutePathToProject] sa apsolutnom putanjom do backend foldera u projektu.
(Npr C:\Users\userName\backend ) u fajlovima:
1. runserver.bat
2. scheduleTask.bat
koji se nalaze unutar foldera backend

Info: dvoklik na ove fajlove dovodi do njihovog izvrsanja, za editovanje je potrebno otvoriti ih u notepadu

Nakon promene ovih fajlova server se pokrece dvoklikom na fajl runserver.bat

Nakon gasenja servera potrebno je pokrenuti fajl removeTask.bat iz foldera backend.


### Prerequisites

What things you need to install how to install them


### Installing

How to get a development env running: 


## Deployment
Fully integrated CICD SonarCloud,CircleCI,Heroku at
Repo where backend is deployed from: https://github.com/permitt/clinical-center-backend 
It is set to private because of secrets.json file

Heroku deployed front: https://obscure-garden-67271.herokuapp.com
API requests are sent to backend deployed, example : https://quiet-tor-04502.herokuapp.com/api/users/patient/


