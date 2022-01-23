import  fetch  from 'node-fetch';
import fs from 'fs';

//move these interfaces to another file to clean this up later.

//interface that has less team information. just ID ,NAME and API link
interface teamInfo{
    id: number,
    name: string,
    link: string
}


//interface that contains the position of the player
interface position{
    code: string,
    name: string,
    type: string,
    abbreviation: string
}


//interface that contains player information
interface player{
    id: number,
    fullName: String,
    link: String,
    firstName: String,
    lastName: String,
    primaryNumber: String,
    birthDate: String,
    currentAge: number,
    birthCity: String,
    birthStateProvince: String,
    birthCountry: String,
    nationality: String,
    height: String,
    weight: number,
    active: boolean,
    alternateCaptain: boolean,
    captain: boolean,
    rookie: boolean,
    shootsCatches: String,
    rosterStatus: String,
    currentTeam: teamInfo,
    primaryPosition: position
}


//interface that will store stat information for a specific season
interface statsSingleSeason{
    timeOnIce: string,
  assists: number,
  goals: number,
  pim: number,
  shots: number,
  games: number,
  hits: number,
  powerPlayGoals: number,
  powerPlayPoints: number,
  powerPlayTimeOnIce: string,
  evenTimeOnIce: string,
  penaltyMinutes: string,
  faceOffPct: number,
  shotPct: number,
  gameWinningGoals: number,
  overTimeGoals: number,
  shortHandedGoals: number,
  shortHandedPoints: number,
  shortHandedTimeOnIce: string,
  blocked: number,
  plusMinus: number,
  points: number,
  shifts: number,
  timeOnIcePerGame: string,
  evenTimeOnIcePerGame: string,
  shortHandedTimeOnIcePerGame: string,
  powerPlayTimeOnIcePerGame: string
}

interface seasonStats{
    season: JSON,
    stat: statsSingleSeason
 }

interface stats{
   type: JSON,
   splits: seasonStats[]
}

//interface that stores the initial response when we make our api call to get team information
interface playerResponse{
    copyright: string,
    people: player[]
}

//interface that stores a player's single season stats
interface statResponse{
    copyright: string,
    stats: stats[]
}

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

//get team information from the NHL API
async function getPlayerAPI(p_player_id:number,p_season:number){
    var response = await fetch('https://statsapi.web.nhl.com/api/v1/people/'+p_player_id+'?season='+p_season);
    return response.json();
}

//get team information from the NHL API
async function getPlayerStats(p_player_id:number,p_season:number){
    var response = await fetch('https://statsapi.web.nhl.com/api/v1/people/'+p_player_id+'/stats?stats=statsSingleSeason&season='+p_season);
    return response.json();
}

//store information in variables ready to be used for now
var playerID = 8476792;
var season = 20152016;

//get team information from the API
var playerInfoResponse : playerResponse = await getPlayerAPI(playerID,season) as playerResponse;

var player : player = playerInfoResponse.people[0];


var playerName = player.fullName;
var currentTeam = getTeam(player);
var playerAge = getAge(player)
var playerPosition = getPosition(player);
var playerNumber = getNumber(player);
var playerRookie = checkRookie(player);

var playerStatResponse : statResponse = await getPlayerStats(playerID,season) as statResponse;


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


