This project is a simple file management system built with Angular for the frontend and Express.js for the backend. The system allows users to upload, view, and delete files with metadata stored in a MongoDB database.

Installation

To get started with this project, clone the repository and install the necessary dependencies.
Prerequisites

Ensure that you have the following installed:

    Node.js (v14 or higher)
    npm (v6 or higher)
    MongoDB (locally or on a cloud service like MongoDB Atlas)

Clone the Repository

    bash

    git clone https://github.com/your-username/file-management-system-angular.git
    cd file-management-system

Install Dependencies

Run the following command to install the necessary Node.js packages:

    bash

    npm install express body-parser cors multer mongoose axios

Usage
Running the Backend Server

To start the Express backend server, run:

    bash
    
    node server.js

The backend server will start on http://localhost:8081.
Running the Frontend Server

To start the Angular development server, run:

    bash
    
    ng serve

The frontend will be accessible at http://localhost:8080.
Accessing the Application

Once both servers are running, you can access the application by navigating to http://localhost:8080 in your web browser.
Technologies Used

    Frontend: Angular
    Backend: Express.js, MongoDB, Mongoose, Multer, CORS, Body-Parser
    Styling: Custom CSS with Google Fonts
