# Sportradar API coding Challenge
 > -David Lauria
 
 This project is done using Typescript. Included is how to install typescript if not installed and how to setup the dependencies if they are not working from the files I provided. 
 
### Install TypeScript
Install nvm  `https://github.com/coreybutler/nvm-windows`

In command line:
Install latest version of node and npm `nvm install`

Install typescript globally `npm install -g typescript`



### Setting up dependencies
In command line navigate to project directory and install the dependencies

`npm install fs`

`npm install node-fetch`


### Running code

compile code in command line: `tsc`
call player code in command line: `node runPlayerOutput.js 8471214 20152016`

call team code in command line: `node runTeamOutput.js 5 20152016`

CSV file will be created in local directory that the project is in
