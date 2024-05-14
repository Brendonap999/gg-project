## Project Name

This project is a full-stack web application that includes a React frontend, a .NET Core API, and a MongoDB database, all containerized using Docker.
The aim is to provide a easy start up and development experience.

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### Getting Started

```bash
git clone git@github.com:Brendonap999/gg-project.git
cd gg-project
```

### Building and Running the Containers

```bash
docker-compose up --build
```

this command will:

1. Build the Docker images for the frontend, API, and MongoDB
2. seed the database with games data
3. Start the containers

### Accessing the Application

Frontend: [http://localhost:3000](http://localhost:3000)
Swagger: [http://localhost:8080/swagger/index.html](http://localhost:8080/swagger/index.html)

### Stop the Containers

```bash
docker-compose down
```

### Project TODO list

- [x] Create an .NET API, including auth, swagger
- [x] Create a MongoDB database
- [x] Create a React frontend, with auth, ribbon, and a grid
- [x] CRUD operations for games
- [x] Dockerize the API, frontend, and MongoDB
- [ ] E2e/unit test
- [ ] Deployed
