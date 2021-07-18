# Palms & Dates - Backend
Demo Page: https://ahmadshahrour951.github.io/intensive-fall-2020/
## Tech Stack
- Language: **Javascript**
- Environment: **NodeJS**
- Framework: **Express**
- Database: **Postgres**
- ORM: **Sequelize**
- Deployment: **Docker** & **CapRover**
- Testing Suite: **Supertest** & **Mocha** & **Chai**
## Architecture


## Deployment
There are three states of the application:
- Development
- Test
- Production

In each state there are different configurations, seeders, and migrations made specifically for it's environment. Please make the conscience choice of knowing state you'd like to run before moving forward
### Development
If you'd like to run the server in a development environment run:
```bash
yarn run dev
```
This will drop any previous database created for dev and start a new one along with migrations and seeders

### Test
If you'd like to run the server in a test environment run:
```bash
yarn run test
```
This will drop any previous database created for test and start a new one along with migrations and seeders just like for dev. Except, unit tests will be run.

### Production
The server is deployed to a droplet on Digital Ocean and the Dockerfile in the root directory is run by caprover. caprover will keep the server alive, listening on the desired port, and takes care of  SSL certification.
