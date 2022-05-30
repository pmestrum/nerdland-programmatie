# NerdlandProgrammatie

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.


## Installation requirements

this application must be deployed locally, since the server needs to be started with a reverse proxy to avoid CORS errors. 

Node and yarn must be installed. Run `yarn` first to fetch all necessary libraries.

## Running the application

Run `yarn start` to start the server. Navigate to `http://localhost:4200/`.

Data is fetched from the nerdland server, loaded from cache or fetched from file in code.  Last method is activated now. 

This application can use an enterprise version of ag-grid. To enable this, uncomment the import in app.module.ts. This will enable table grouping.


