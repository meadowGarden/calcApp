# Cost Calculation App

## Description

This is a simple cost calculation application used to compute the material cost of products. It features a backend (Java Spring Boot) and frontend, and is designed for educational and personal use cases.

---

## Deployment (linux + docker)

### Requirements:

- a linux environment
- docker installed (`docker -v` should return a version)
  If not installed, you can install Docker using:
  `sudo apt install docker.io`.

### Deployment Steps

1. Create a folder named **calcApp** and clone this repository inside it:
   `git clone https://github.com/meadowGarden/calcApp.git`

2. Move the following files from the templates/ folder into the parent directory of calcApp:
   .env
   .env.production
   deploy.sh

3. Configure environment files:
   In .env (backend), set a secure 256-bit encryption key and your PostgreSQL password.
   In .env.production (frontend), set the correct server URL.

4. Edit the deploy.sh file to update the path to the calcApp directory.

5. From the parent directory, run:
   `bash deploy.sh`

## Notes

- docker will expose port 3000 and map it to port 80.
- if you need to expose additional ports, you can uncomment the relevant lines in the calcApp.yaml file.

## Initial Configuration

The application includes sample material, product, and user data for testing purposes.

## Running Locally (Development Mode)

To run the app locally:

- ensure PostgreSQL is installed and running.
- adjust local database connection settings as needed.
- run the backend and frontend separately using your IDE or CLI.
