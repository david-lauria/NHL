import { outputPlayerStats } from './outputPlayerStats.js';
try {
    var playerID = process.argv[2];
    var season = process.argv[3];
    if (playerID === undefined)
        throw "Player is not specifed";
    if (season === undefined)
        throw "Season is not specified";
    var result = await outputPlayerStats(playerID, season);
    console.log(result);
}
catch (error) {
    console.log(error);
}
