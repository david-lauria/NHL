import fs from 'fs';
import { player,playerResponse,statResponse } from './playerInterfaces';
import { callAPI } from './callAPI.js';

//get the player's team
function getTeam(p_player:player){
        return p_player.currentTeam.name;
}

//get the players Age
function getAge(p_player:player){
        return p_player.currentAge;
}

//get the players position
function getPosition(p_player:player){
        return p_player.primaryPosition.name;
}

//get the players number
function getNumber(p_player:player){
    return p_player.primaryNumber;
}

//check if player is a rookie
function checkRookie(p_player:player){
    return p_player.rookie;
}

//store information in variables ready to be used for now
var playerID = 8476792;
var season = 20152016;

//build URL used in our API calls
var build_player_url = 'https://statsapi.web.nhl.com/api/v1/people/'+playerID+'?season='+season;
var build_stat_url = 'https://statsapi.web.nhl.com/api/v1/people/'+playerID+'/stats?stats=statsSingleSeason&season='+season;


//make our API calls
var playerInfoResponse : playerResponse = await callAPI(build_player_url) as playerResponse;
var playerStatResponse : statResponse = await callAPI(build_stat_url) as statResponse;



var player : player = playerInfoResponse.people[0];

var playerName = player.fullName;
var currentTeam = getTeam(player);
var playerAge = getAge(player)
var playerPosition = getPosition(player);
var playerNumber = getNumber(player);
var playerRookie = checkRookie(player);

var playerStats = playerStatResponse.stats[0].splits[0].stat;

var assists = playerStats.assists;
var goals = playerStats.goals;
var games = playerStats.games;
var hits = playerStats.hits;
var points = playerStats.points;



let header = 'PLAYER_ID,PLAYER_NAME,CURRENT_TEAM,PLAYER_AGE,PLAYER_NUM,PLAYER_POS,ROOKIE_SW,ASSISTS_NUM,GOALS_NUM,GAMES_NUM,HITS_NUM,POINTS_NUM'
let text = playerID+','+playerName+','+currentTeam+','+playerAge+','+playerNumber+','+playerPosition+','+playerRookie+','+assists+','+goals+','+games+','+hits+','+points;

var output = header +'\n'+text;

var team_output = fs.writeFile('./player_output.csv',output,'utf8',function(error){
 if(error) throw error;
 });


