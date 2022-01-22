import fetch from 'node-fetch';
import fs from 'fs';
function getSingleSeasonStats(stats) {
    for (var i in stats) {
        //  console.log(teamJson[type])
        if (stats[i].type.displayName == 'statsSingleSeason') {
            return stats[i].splits[0].stat;
        }
    }
}
function getFirstGame(games) {
    var min_date = new Date('9999-12-13');
    var min_game;
    for (var i in games) {
        if (new Date(games[i].date) < min_date) {
            min_date = new Date(games[i].date);
            min_game = games[i];
        }
    }
    return min_game;
}
function getOpponent(game, p_team_id) {
    if (game.away.team.id == p_team_id) {
        return game.home.team;
    }
    else {
        return game.away.team;
    }
}
//get team information from the NHL API
async function getTeamAPI(p_team_id, p_season) {
    var response = await fetch('https://statsapi.web.nhl.com/api/v1/teams/' + p_team_id + '?expand=team.schedule&season=' + p_season);
    return response.json();
}
//get team statistic information from the NHL API
async function getTeamStatsAPI(p_team_id, p_season) {
    var response = await fetch('https://statsapi.web.nhl.com/api/v1/teams/' + p_team_id + '/stats?season=' + p_season);
    return response.json();
}
async function getTeamSchedule(p_team_id, p_season) {
    var response = await fetch('https://statsapi.web.nhl.com/api/v1/schedule?teamId=' + p_team_id + '&season=' + p_season + '&gameType=R');
    return response.json();
}
// //store information in variables ready to be used
var teamID = 5;
var season = 20152016;
var response = await getTeamAPI(teamID, season);
var team = response.teams[0];
var teamStatResponse = await getTeamStatsAPI(teamID, season);
var teamScheduleResponse = await getTeamSchedule(teamID, season);
var singleSeasonStats = getSingleSeasonStats(teamStatResponse.stats);
var teamName = team.name;
var teamVenueName = team.venue.name;
var gamesPlayed = singleSeasonStats.gamesPlayed;
var wins = singleSeasonStats.wins;
var losses = singleSeasonStats.losses;
var points = singleSeasonStats.pts;
var goalsPerGame = singleSeasonStats.goalsPerGame;
var firstGame = getFirstGame(teamScheduleResponse.dates);
var firstGameDate = firstGame.date;
var firstGameOpp = getOpponent(firstGame.games[0].teams, teamID);
var firstGameOppName = firstGameOpp.name;
let header = 'TEAM_ID,TEAM_NAME,TEAM_VENUE_NAME,GAMES_PLAYED,WINS,LOSSES,POINTS,GOALS_PER_GAME,FIRST_GAME_OF_SEASON_DATE,FIRST_GAME_OF_SEASONS_OPP';
let text = teamID + ',' + teamName + ',' + teamVenueName + ',' + gamesPlayed + ',' + wins + ',' + losses + ',' + points + ',' + goalsPerGame + ',' + firstGameDate + ',' + firstGameOppName;
var output = header + '\n' + text;
var data = fs.writeFile('./team_output.csv', output, 'utf8', function (error) {
    if (error)
        throw error;
});
