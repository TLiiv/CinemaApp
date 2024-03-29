# Getting Started with Backend

MongoDB: A document-oriented NoSQL database (download and install from https://www.mongodb.com/try/download/community)
Backend framework (e.g., Spring Boot) with its development tools (e.g., IntelliJ IDEA)
## To run the project:

Project database is done with MongoDB, and backend API connects to mongoDB through .env file that is located at Backend\cinema\src\main\resources. There is also a .env 0example file for  mongo setup. 

Install MongoDB Driver: Install the official MongoDB driver for your chosen backend language. These drivers provide methods to interact with your MongoDB database instance.
Establish MongoDB Connection: Within your backend API code, configure the connection details to your MongoDB database. This typically involves specifying the hostname, port, database name, and credentials (if applicable).

MONGO_DATABASE="cinema-api-db" database name
MONGO_USER="username"
MONGO_PASSWORD="password"
MONGO_CLUSTER="clustername"

in the same folder there are .json files an database_folder that are needed fordatabase. In mongoDB compasss just add files and .json files every file is different collection. !Every folder inside of database_folder is named after collection name!

### Compiling the backend

After data is but added to mongoDB compile the Springboot with chosesen IDE. I did it with IntelliJ. Compile it from CinemaApplication file. Hope you have an error free time! The frontend has to run in localhost:3000. If you want to use another port forfrontend change this address in controller files: @CrossOrigin(origins = "http://localhost:3000")// because of CORS, Front end cannot locally connect otherwise

### Running the Application

Start the MongoDB server.
Build and run the backend API.
Start the frontend application

### Additional Notes

Ensure you have the necessary MongoDB driver installed in your backend project to interact with MongoDB.
Consider implementing proper error handling in your backend API for database connection issues or query errors.



