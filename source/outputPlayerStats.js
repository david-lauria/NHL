import fs from 'fs';
import { callAPI } from './callAPI.js';
import { checkSeason } from './checkSeason.js';
//get the player's team
function getTeam(p_player) {
    try {
        return p_player.currentTeam.name;
    }
    catch (error) {
        return "";
    }
}
//get the players Age
function getAge(p_player) {
    if (p_player.currentAge === undefined) {
        return "";
    }
    return p_player.currentAge;
}
//get the players position
function getPosition(p_player) {
    if (p_player.primaryPosition.name === undefined) {
        return "";
    }
    return p_player.primaryPosition.name;
}
//get the players number
function getNumber(p_player) {
    if (p_player.primaryNumber === undefined) {
        return "";
    }
    return p_player.primaryNumber;
}
//check if player is a rookie
function checkRookie(p_player) {
    return p_player.rookie;
}
export async function outputPlayerStats(playerID, season) {
    //header for CSV in our output variable
    var output = 'PLAYER_ID,PLAYER_NAME,CURRENT_TEAM,PLAYER_AGE,PLAYER_NUM,PLAYER_POS,ROOKIE_SW,ASSISTS_NUM,GOALS_NUM,GAMES_NUM,HITS_NUM,POINTS_NUM';
    try {
        //get list of ID if a list is provided
        // check season format and make sure it is valid.
        checkSeason(season);
        var idList = playerID.split(',');
        var playerInfoResponse = null;
        var playerStatResponse = null;
        for (var i in idList) {
            //build URL used in our API calls
            var build_player_url = 'https://statsapi.web.nhl.com/api/v1/people/' + idList[i] + '?season=' + season;
            var build_stat_url = 'https://statsapi.web.nhl.com/api/v1/people/' + idList[i] + '/stats?stats=statsSingleSeason&season=' + season;
            //setting up variables
            var playerStats = "";
            var assists = "";
            var goals = "";
            var games = "";
            var hits = "";
            var points = "";
            //make our API calls
            try {
                playerInfoResponse = await callAPI(build_player_url);
            }
            catch (error) {
                throw "Player Info API Call Error: " + error;
            }
            try {
                playerStatResponse = await callAPI(build_stat_url);
            }
            catch (error) {
                throw "Player Stat API Call Error: " + error;
            }
            //get player from our response
            var person = playerInfoResponse.people[0];
            var playerName = person.fullName;
            var currentTeam = getTeam(person);
            var playerAge = getAge(person);
            var playerNumber = getNumber(person);
            var playerPosition = getPosition(person);
            var playerRookie = checkRookie(person);
            //wrap these in a try catch because some players do not have stats recorded
            try {
                //need to check more on this playerStatResponse.. need to see if hardcoding can hurt. 
                playerStats = playerStatResponse.stats[0].splits[0].stat;
                assists = playerStats.assists;
                goals = playerStats.goals;
                games = playerStats.games;
                hits = playerStats.hits;
                points = playerStats.points;
            }
            catch (error) {
                assists = "";
                goals = "";
                games = "";
                hits = "";
                points = "";
            }
            //output "CSV"
            let text = idList[i] + ',' + playerName + ',' + currentTeam + ',' + playerAge + ',' + playerNumber + ',' + playerPosition + ',' + playerRookie + ',' + assists + ',' + goals + ',' + games + ',' + hits + ',' + points;
            output += '\n' + text;
        }
        var team_output = fs.writeFile('./output/player_output.csv', output, 'utf8', function (error) {
            if (error)
                throw error;
        });
        return "File Created in local directory";
    }
    catch (error) {
        return error;
    }
}
