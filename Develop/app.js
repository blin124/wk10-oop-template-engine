const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// inside of buildTeam method, needs to call to render and receive all members
// buildTeam() = fs.writeFileAsync(filname, render(allMembers), "utf-8")

const render = require("./lib/htmlRenderer");
const allMembers = [];


function createManager() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name"
        },
        {
            type: "input",
            message: "Please enter your ID.",
            name: "id"
        },
        {
            type: "input",
            message: "What is your email address?",
            // regular expression
            // "check value"
            // validate: "",
            name: "email"
        },
        {
            type: "input",
            message: "What is your office number?",
            name: "officeNumber"
        }
    ])
    .then(answers => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        allMembers.push(manager);
        createTeam()
    })
}

function createTeam() {
    inquirer
    .prompt([
        {
            type: "list",
            message: "What type of member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "Nothing else"
            ],
            name: "type"
        }
    ])
    .then(answers => {
        if (answers.type === "Engineer") {
            addEngineer()
        } else if (answers.type === "Intern") {
            addIntern()
        } else {
            // htmls go into buildTeam
            // last thing is buildTeam 
            // call to a method and push all members into that method
            buildTeam()
        }
    })
}

function addEngineer() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name"
        },
        {
            type: "input",
            message: "Please enter your ID.",
            name: "id"
        },
        {
            type: "input",
            message: "What is your email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your github username?",
            name: "github",
        }
    ])
    .then(answers => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        allMembers.push(engineer);

        createTeam();
    })
}

function addIntern() {
    inquirer 
    .prompt ([
        
        {
            type: "input",
            message: "What is your name?",
            name: "name",
        },
        {
            type: "input",
            message: "Please enter your ID.",
            name: "id",
        },
        {
            type: "input",
            message: "What is your email address?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your school name?",
            name: "school",
        }
    ])
    .then(answers => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        allMembers.push(intern);

        createTeam();
    })
}

function buildTeam() {
    fs.writeFile(outputPath, render(allMembers), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Success!");
    })
}

createManager();