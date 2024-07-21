# ZooArcadia
## Démarche à suivre afin de déployer l'application en local

## Prérequis
Assurez-vous d'avoir les outils suivants installés sur votre machine :

.NET SDK, Node.js, Angular CLI, PostgreSQL, MongoDB

## Installation 

- Cloner les dépôts : git clone https://github.com/Bizkiit/ZooArcadia et https://github.com/Bizkiit/ZooArcadia.API
## PostgreSQL (utilisez le script fournis dans le répertoire `sql_scripts`):
- Créez une base de données nommée ZooArcadia.
- Créez un utilisateur avec les privilèges appropriés (Username = admin, Password = admin).

## MongoDB (utilisez le script fournis dans le répertoire `sql_scripts`):
- Connectez vous en localhost:27017.
- Créez une BDD ZooArcadia et une collection ZooArcadia.

## Backend

- Restaurer les packages NuGet (dotnet restore).
- Lancer l'API (Mode debug, IIS Express).

## FrontEnd

- Installer les dépendances (npm install).
- Lancer l'application Angular (ng serve).
- Ouvrez votre navigateur et accédez à http://localhost:4200.

## Remarques

- Assurez-vous que les services PostgreSQL et MongoDB sont en cours d'exécution.
