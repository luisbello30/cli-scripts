#!/usr/bin/env node
import chalk from "chalk";
import { default as inquirer } from "inquirer";
import { readPackage, readConfig, createConfigFile } from "./readFile.js";
import { createSpinner } from "nanospinner";

// const spinner = createSpinner("Run test").start({
//   text: "Load file config",
//   color: "yellow",
// });

function main() {
  console.log("Cli for run package.json scripts");

  configFile();
}

function configFile() {
  readConfig()
    .then((pat) => {
      console.log("---->", pat);
      getPackageScript();
    })
    .catch(() => {
      inquirer
        .prompt([
          {
            type: "confirm",
            name: "configFile",
            message: "the config file does not exist, create it then??",
          },
        ])
        .then((answers) => {
          if (!answers.configFile) {
            return;
          } else {
            createConfigFile()
              .then(() => {
                console.log("File is created");
                getPackageScript();
              })
              .catch((err) => err);
          }
        })
        .catch((error) => {
          if (error.isTtyError) {
            console.log("exit1");
          } else {
            console.log("exit2");
          }
        });
    });
}

function getPackageScript() {
  readPackage({})
    .then((cfg) => {
      console.log(cfg);
      console.log(cfg.bugs);
    })
    .catch((err) => console.log(err));
}

main();

// inquirer.prompt();
// inquirer
//   .prompt([
//     /* Pass your questions in here */
//     {
//       type: "confirm",
//       name: "bacon",
//       message: "Do you like bacon?",
//     },
//   ])
//   .then((answers) => {
//     console.log(answers);
//     // Use user feedback for... whatever!!
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });

// console.log(chalk.bgBlue("Hello World"));

// const packageJson = readPackage({});
// packageJson.then((pack) => console.log(pack));
