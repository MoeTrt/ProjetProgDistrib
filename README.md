# 📝 Todolist Microservice - Spring Boot + PostgreSQL + Docker

Ce projet est un microservice simple de gestion de tâches (todolist) développé avec **Spring Boot**, connecté à **PostgreSQL**, et orchestré avec **Docker** via `docker-compose`.

---

## 🚀 Fonctionnalités

- ✅ Ajouter une tâche
- 📋 Lister toutes les tâches
- ❌ Supprimer une tâche
- 🔌 API REST exposée sur `localhost:8080/tasks`

---

## ⚙️ Technologies

- Java 17
- Spring Boot 3.4.4
- Spring Web + Spring Data JPA
- PostgreSQL (image Docker officielle)
- Docker / Docker Compose
- Gradle

---

## 📦 Lancer le projet avec Docker Compose

Assurez-vous d’avoir Docker installé, puis exécutez :

```bash
docker-compose up --build