import { outputTeamStats } from './outputTeamStats.js';


var teamID = process.argv[2];
var season = process.argv[3];

var result = await outputTeamStats(teamID,season);

console.log(result)