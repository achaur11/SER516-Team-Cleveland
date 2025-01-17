# SER516-Team-Cleveland

# Taiga API Integration

This project is a Python script for interacting with the Taiga API to perform various task and calculating metrics.

## Prerequisites

Before running the script, make sure you have the following installed:

- Python 3 (Note: Python version>=3.11 for `date.fromisoformat()` to work properly)
- Required Python packages (Go to `taigaProject` folder and install using `pip install -r requirements.txt`)
- Taiga account with API access
- Taiga project slug
- Clone the repository
```bash
   git clone https://github.com/ser516asu/SER516-Team-Cleveland.git
   cd SER516-Team-Cleveland/taigaProject
```

## Getting Taiga Project Slug

To interact with the Taiga API using the provided Python script, you will need the project slug of your Taiga project. Follow these steps to find the project slug:

1. **Login to Taiga**: Open your web browser and log in to your Taiga account.

2. **Select the Project**: Navigate to the project for which you want to obtain the project slug.

3. **Project URL**: Look at the URL in your browser's address bar while you are inside the project. The project slug is the part of the URL that comes after the last slash ("/"). For example:


## Running the Backend Application

Go to `taigaProject` folder
``` bash
cd taigaProject
```
Run the command to download required dependencies
``` bash
pip install -r requirements.txt
```
Go to the source folder of the backend application(`cd taigaProject/src` or `cd src` depending on the current folder) and run the command- 
``` bash
uvicorn main:app 
```

You can hit the API using `http://127.0.0.1:8000/[requiredApiPath]` or `http://localhost:8000/[requiredApiPath]`
while providing the necessary payload. 

Visit http://localhost:8000/docs to look at the possible APIs which can be hit from Postman.

Use the command 
``` bash
uvicorn main:app --reload
```
to run the application in developer mode, it reloads everytime there's a change in a file. 

### Writing/Running unit test

We're using pytest to write the unit test for the backend application. 
The dependency is added to the requirements.txt file, please do a pip install before trying to run the tests. 
In the test folder, create the python file in the format "test_{test-file-name}", since pytest only identifies the 
files named in this format.

To run the tests, go to the root folder, and run the command 
```
pytest
```
in the terminal to run the tests and get the results.

## To run the frontend

## Download Node.js

Download node.js from https://nodejs.org/en/download

On Mac, you can download either from above website or using homebrew.

### `brew search node`


### `brew install node`

## Check Node and npm version

Command to check the Node version to confirm successful installation

### `node -v`

Command to check the npm version

### `npm -v`

### Run the project
1. Go to `react-ui` folder
2. Install the packages using command:
## `npm install`
3. After successful install, start the project:
## `npm start`
4. Go to http://localhost:3000 to view in browser

### Fetch Metrics from Application
1. Go to http://localhost:3000 to view in browser
2. Enter username and password of taiga account to login
3. Project page will be displayed
4. Enter project slug eg: ser516asu-ser516-team-cleveland
5. Select type of metric from dropdown.
6. Submit to get the metric displaoyed on the same screen
