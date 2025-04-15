# Todolist Microservice - Spring Boot + PostgreSQL + Docker

Ce projet est un microservice de gestion de tâches (todolist) développé en Java avec Spring Boot. Il expose une API REST permettant de créer, afficher et supprimer des tâches.  
Il s’appuie sur une base de données PostgreSQL et utilise Docker et Docker Compose pour l’orchestration.

---

## Fonctionnalités

- Ajouter une tâche
- Lister toutes les tâches
- Marquer une tâche comme terminée (checkbox)
- Supprimer une tâche
- Frontend React minimaliste communiquant avec l’API
- Base de données persistante grâce à Docker volumes

---

## Architecture

```
                    +------------------+
                    |     Frontend     |
                    |   (React + Vite) |
                    +--------+---------+
                             |
                             | appels HTTP (fetch)
                             v
                    +--------+---------+
                    |   Backend API    |
                    |  (Spring Boot)   |
                    +--------+---------+
                             |
                             v
                    +--------+---------+
                    |   PostgreSQL DB  |
                    +------------------+
```

---

## Technologies utilisées

### Backend

- Java 17
- Spring Boot 3.4.4
- Spring Web
- Spring Data JPA
- PostgreSQL Driver
- Gradle 8.4

### Frontend

- React
- Vite
- CSS natif (style simple, sans framework)

### DevOps

- Docker
- Docker Compose

---

## Démarrage rapide

### Prérequis

- Docker installé
- Port 8080 libre (backend)
- Port 5432 libre (PostgreSQL)
- Port 5173 libre (frontend)

### Lancement des services

Depuis la racine du projet :

```bash
docker-compose up --build
```

Cela va :
- Construire l’application Spring Boot (packagée dans un `.jar`)
- Démarrer le conteneur PostgreSQL
- Lancer le backend Spring sur `localhost:8080`
- Lancer le frontend React sur `localhost:5173`

---

## API REST disponible

### Récupérer la liste des tâches

```http
GET /tasks
```

### Ajouter une tâche

```http
POST /tasks
Content-Type: application/json

{
  "title": "Faire les courses"
}
```

### Supprimer une tâche

```http
DELETE /tasks/{id}
```

---

## Structure du projet

```
.
├── backend/
│   ├── Dockerfile
│   ├── src/
│   │   └── main/java/com/example/taskservice/
│   │       ├── controller/TaskController.java
│   │       ├── model/Task.java
│   │       └── repository/TaskRepository.java
│   └── build.gradle
│
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   │   ├── App.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   └── index.css
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## Déploiement Kubernetes (étape suivante possible)

Le projet peut être facilement adapté à un déploiement Kubernetes à l’aide de :
- YAML de déploiement pour chaque microservice
- Services de type `ClusterIP` ou `NodePort`
- Ingress controller ou Spring Cloud Gateway pour le routage
- Secrets et ConfigMaps pour la configuration

---

## Commandes utiles

### Nettoyer et reconstruire

```bash
docker-compose down
docker-compose up --build
```

### Accéder à la base PostgreSQL depuis le conteneur

```bash
docker exec -it postgres-taskdb psql -U postgres -d tasksdb
```

---

## Améliorations possibles

- Ajout de tests unitaires avec JUnit
- Intégration Swagger/OpenAPI pour la documentation
- Authentification utilisateur
- Ajout d’échéances et de filtres sur les tâches  