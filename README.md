# Employee-Tracker
A command-line application that at a minimum allows the user to  add, view and update departments, roles and employees   

## Screenshots
*Command line*
![image]()

![image]()

## Installation
In order to use the employee tracker, you will need to run `npm init -y` to initialise the `package.json ` and then install the following list of dependencies:
`npm i inquirer`
`npm i mysql`
`npm i console.table`
Optional but recommended- `npm i dotenv`:  If you have set a password for your server, you will need to add an `.env` file to your repo to avoid and install the dotenv package to make sure this sensitive information is hidden. 

The inquirer package will give you access to a series of prompts to answer within the command line/terminal 

The mysql package connects you directly to the database created in the MySQL Workbench and the console.table package allow the data in database to be printed in a table format within the command line. 

Once all the dependencies are installed, you can initialise the application itself by running `node app.js` in the command line

 ## Test
We do not have any test packages for this app but always check the error messages within terminals and debug using console.log(s). 
 
## Usage 

*Gif of employee tracker in action*

*Please see the video walkthrough for this application below*

[Google Drive Link to video walkthrough]()

After running `node app.js` within the command line, the inquirer package will prompt users to answer a series of questions based on their team. 

The application takes in the user's reponses and populates the corresponding fields in the database.  For example,`first_name` is populated with the employee's first name

## Final Product
The Employee should be able to show the following:

    - Navbar with team name
    - Generates a card for each team member with their name, their role and id
    - Manager should also have an office number
    - Engineer should have a github username
    - Intern should also a school name --> -->

## License
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

> This project was created under the standard MIT licence.

> [Learn more about this licence.](https://lbesson.mit-license.org/)
