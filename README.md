# Todolist Microservice - Spring Boot + PostgreSQL + Docker + Kubernetes + Istio

Ce projet est un microservice de gestion de tâches (todolist) développé en Java avec Spring Boot.  
Il expose une API REST permettant de créer, afficher et supprimer des tâches.  
Il utilise une base de données PostgreSQL, Docker, Docker Compose, Kubernetes (Minikube) et Istio.

---

## Fonctionnalités

- Ajouter une tâche
- Lister toutes les tâches
- Marquer une tâche comme terminée (checkbox)
- Supprimer une tâche
- Frontend React minimaliste communiquant avec l’API
- Base de données persistante avec volumes Docker
- Déploiement dans Kubernetes + Service Mesh Istio

---

## Architecture

```
                    +------------------+
                    |     Frontend      |
                    |   (React + Vite)  |
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
- CSS natif

### DevOps

- Docker
- Docker Compose
- Kubernetes (Minikube)
- Istio Service Mesh
- Docker Hub

---

## Démarrage rapide en local (Docker Compose)

### Prérequis

- Docker installé
- Port 8080 libre (backend)
- Port 5432 libre (PostgreSQL)
- Port 5173 libre (frontend React)

### Lancer l'application en local

Depuis la racine du projet :

```bash
docker-compose up --build
```

Puis, pour le frontend React :

```bash
cd frontend
npm install
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173` et communiquera avec l'API sur `http://localhost:8080`.

---

## Utilisation de l'API REST avec curl

### Récupérer la liste des tâches

```bash
curl http://localhost:8080/tasks
```

### Ajouter une tâche

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title": "Faire les courses"}' http://localhost:8080/tasks
```

### Supprimer une tâche

Remplacer `{id}` par l'identifiant de la tâche :

```bash
curl -X DELETE http://localhost:8080/tasks/{id}
```

---

## Déploiement Kubernetes + Istio

### 1. Prérequis

- Minikube installé (`minikube start --driver=docker`)
- Istio installé (`istioctl install --set profile=demo -y`)
- Activer l'injection automatique :

```bash
kubectl label namespace default istio-injection=enabled
```

### 2. Déploiement PostgreSQL

Appliquer successivement :

```bash
kubectl apply -f postgres-secret.yaml
kubectl apply -f postgres-storage.yaml
kubectl apply -f postgres-deployment.yaml
kubectl apply -f postgres-service.yaml
```

### 3. Déploiement du backend (Spring Boot)

Taguer et push l'image Docker (exemple) :

```bash
docker tag taskservice-taskservice votreDockerID/taskservice:latest
docker push votreDockerID/taskservice:latest
```

Puis déployer :

```bash
kubectl apply -f taskservice-deployment.yaml
kubectl apply -f taskservice-service.yaml
kubectl apply -f taskservice-gateway.yaml
kubectl apply -f taskservice-virtualservice.yaml
```

### 4. Accéder au service

Faire un port-forward vers Istio ingress gateway :

```bash
kubectl -n istio-system port-forward deployment/istio-ingressgateway 31380:8080
```

Puis accéder à l'API REST via :

```
http://localhost:31380/tasks
```

**Attention** : en Kubernetes, seul l'API est exposée ! Le frontend React doit être lancé manuellement avec `npm run dev`.

---

## Structure du projet

```
.
├── backend/
│   ├── Dockerfile
│   ├── src/main/java/com/example/taskservice/
│   │   ├── controller/TaskController.java
│   │   ├── model/Task.java
│   │   └── repository/TaskRepository.java
│   └── build.gradle
│
├── frontend/
│   ├── Dockerfile (optionnel pour déploiement futur)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   └── index.css
│   └── package.json
│
├── kubernetes/
│   ├── postgres-secret.yaml
│   ├── postgres-storage.yaml
│   ├── postgres-deployment.yaml
│   ├── postgres-service.yaml
│   ├── taskservice-deployment.yaml
│   ├── taskservice-service.yaml
│   ├── taskservice-gateway.yaml
│   ├── taskservice-virtualservice.yaml
│
├── docker-compose.yml
└── README.md
```

---

## Points importants

- La base de données PostgreSQL utilise un Secret Kubernetes pour protéger le mot de passe.
- Le stockage de la base est persistant avec un PersistentVolumeClaim.
- Le backend utilise un VirtualService et une Gateway Istio pour le routage.
- Le frontend React n'est pas encore déployé dans Kubernetes (optionnel).
- L'API REST reste accessible en local via l'ingress Istio.

---