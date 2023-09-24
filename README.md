
# Art Gallery

This is an e-commerce web application that I'm creating for in my learning journey. I created it as an opportunity for learning docker, microservice, message-oriented communication,...etc.

This is the repo for the customer side. I'm going to create an admin side for app management in another repo.

## Features

- Ability to login/register via social auth.
- Shopping products
- Payment options
- Responsive design

## Microservices

The app is divided into multiple microservices which may be overcomplication but it's an opportunity for me for investigating this type of architectural pattern.

The app is divided into 3 microservices and an API gateway which includes the necessary logging, authentication, authorization and any other services that are independant of any microservice.

The following image illustrates this design:

![Design](https://drive.google.com/uc?id=1Zj2ZTtdhFKbUv6UvCNT-th7iZQ-eib3s)

As shown in the above image, the API gateway has services that act as middelwares and are meant to be "pluggable" in the API gateway which encourages the idea of isolation and separation of concerns.

For more about each microservice, head to its README file.

### Authentication and Authorization

For the purpose of authentication and authorization, I used Auth0.

### Containerization

Every microservice is in its own container so that it can be tested and deployed independently.

To run each microservice individually (**make sure docker is installed and docker daemon is running**), run the following command:

```bash
cd MICROSERVICE_DIR
docker-compose up
```

To run tests, run the following command:

```bash

npm test


```

## Tech Stack

**Client:** Angular, Typescript

**Server:** Node, Express, Typescript, Jest (testing)

**Database:** MySQL, PrismaORM
