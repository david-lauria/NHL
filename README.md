# Sportradar API coding Challenge
 > -David Lauria
 
 This project is done using Typescript. Included is how to install typescript if not installed and how to setup the dependencies if they are not working from the files I provided. 
 
### Install TypeScript
Install nvm  `https://github.com/coreybutler/nvm-windows`

In command line:
Install latest version of node and npm `nvm install latest`

`nvm use 17.4.0`

Install typescript globally `npm install -g typescript`


### Running code
Navigate to directory that the project is in.
Compile code in command line: `tsc`
Call player code in command line: `node runPlayerOutput.js 8471214 20152016`

Call team code in command line: `node runTeamOutput.js 5 20152016`

CSV file will be created in local directory that the project is in



## Procedures

### callAPI(p_url: string)

Calls the URL passed in using node-fetch. Returns the JSON response. 

Catches error if there is any and throws it so the calling procedure can get it.





### outputTeamStats(teamID: string, season: string)

Makes call to the NHL Team API and outputs a CSV with the following information:

* Team ID
* Team Name
* Team Venue Name
* Games Played
* Wins
* Losses
* Points
* Goals Per Game
* Game Date of First Game of Season
* Opponent Name in First Game of Season


Note:

Passing in a list of team ID like 1,2,3 will return all three in the CSV




###  outputPlayerStats(playerID: string, season: string)

Makes call to the NHL Player API and outputs a CSV with the following information:

* Player ID
* Player Name
* Current Team
* Player Age
* Player Number
* Player Position
* If the player is a rookie
* Assists
* Goals
* Games
* Hits
* Points

Note: If a player is in the API but is not in the NHL, it will still return a CSV about that player, but only with the information that it can gather. 

Passing in a list of player ID like 1,2,3 will return all three in the CSV
