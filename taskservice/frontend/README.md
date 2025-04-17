# Todolist Microservice - Spring Boot + PostgreSQL + Docker

Ce projet est un microservice simple de gestion de tâches (todolist) développé avec **Spring Boot**, connecté à **PostgreSQL**, et orchestré avec **Docker Compose**.

## Fonctionnalités

- Ajouter une tâche
- Lister toutes les tâches
- Supprimer une tâche
- API REST exposée sur `localhost:8080/tasks`

## Architecture

Le projet repose sur deux services Docker :
- `taskservice-app` : service Spring Boot exposant une API REST
- `postgres-taskdb` : base de données PostgreSQL pour stocker les tâches

Ces services communiquent via un réseau Docker interne (`springnet`).

## Technologies

- Java 17
- Spring Boot 3.4.4
- Spring Web + Spring Data JPA
- PostgreSQL 15
- Docker / Docker Compose
- Gradle
- React + Vite

## Lancer le projet avec Docker Compose

Assurez-vous d’avoir Docker et Docker Compose installés, puis exécutez :

```bash
docker-compose up --build
```

Le backend sera accessible à l’adresse :  
http://localhost:8080/tasks

## Lancer le frontend React

Depuis le dossier `frontend`, exécutez :

```bash
npm install
npm run dev
```

Cela démarre l’interface utilisateur sur :  
http://localhost:5173/

## Utiliser l'API REST avec `curl`

Vous pouvez interagir avec l’API REST directement depuis un terminal avec les commandes suivantes :

### 1. Récupérer toutes les tâches (GET)
```bash
curl http://localhost:8080/tasks
```

### 2. Ajouter une tâche (POST)
```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Ma nouvelle tâche"}'
```

### 3. Supprimer une tâche par son ID (DELETE)
```bash
curl -X DELETE http://localhost:8080/tasks/1
```
Remplacez `1` par l’ID réel de la tâche à supprimer.

## Structure du projet

```
ProjetProgDistrib/
├── taskservice/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── build.gradle
│   ├── src/
│   │   └── main/
│   │       ├── java/com/example/taskservice/
│   │       │   ├── controller/TaskController.java
│   │       │   ├── model/Task.java
│   │       │   ├── repository/TaskRepository.java
│   │       │   └── TaskserviceApplication.java
│   │       └── resources/application.properties
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskForm.jsx
│   │   └── main.jsx
│   ├── public/index.html
│   ├── vite.config.js
│   └── package.json
```

Projet développé dans le cadre du module Programmation Distribuée avec Benoît Charroux