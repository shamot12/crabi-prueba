# Technical test for Crabi

This API is built with Node JS using NestJS framework and Typescript, MongoDB was implemented for Databases using Mongoose ORM, and pnpm as the package manager.

The system is a proposal for registering and retreiving users data. In order to accomplish that functionality, 3 endpoints where requested.

### Architecture
The system was implemented based on the domain driven design architecture, to define the modules' architecture. 
An AppModule integrates the system, setting the config module, the database connections and the 2 submodules, users and authentication, where the functionality is splitted. The authentication module manages the login flow, while the users module handles the registration and the reading of the users data.
All endpoints consume and produce *application/json* requests and responses.

### Endpoints
The endpoints will be described according to the flow process of the happy path.

`POST /users`: validates from with an external service if the user trying to create the register is not in a blacklist. If the data is valid, a MongoDB document is created in the users collection. Otherwise, an error is thrown to finish the request. Required data for creating the register is *first_name*, *last_name*, *email*, *password* and *country*. For storing the password on DB, a hash process is performed.

`POST /login`: login authetication is performed through email and password.
Therefore, email and password are required when sending the request.
If credentials are correct, a JSON object with a true boolean *status*, a *message* string and a JSON Web Token (*jwt* field) is returned.
Otherwise, just a JSON object with a false boolean *status* and a WRONG CREDENTIALS *message*.

`GET /users`: this endpoint consumption requires sending the JWT received on the login response in order to retrieve the user data. The JWT stores the user email and ID, decoded to validate the user identity.

### Other resources
An example of the users collection generated is included on the `data` folder.
A POSTMAN collection including requests examples for the endpoints presented is also included on the `data` folder.

### Future work
- Docker files
- Tests
