import fs from 'fs';
import { callAPI } from './callAPI.js';
import { checkSeason } from './checkSeason.js';
//gets the single season stats vs regular season rankings stats that are returned by the API
function getSingleSeasonStats(stats) {
    for (var i in stats) {
        //  console.log(teamJson[type])
        if (stats[i].type.displayName == 'statsSingleSeason') {
            return stats[i].splits[0].stat;
        }
    }
}
//finds the first game of the regular season for the team and returns an event instance
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
//checks the game given vs your team ID and returns which one was the opponent.
function getOpponent(game, p_team_id) {
    if (game.away.team.id == p_team_id) {
        return game.home.team;
    }
    else {
        return game.away.team;
    }
}
export async function outputTeamStats(teamID, season) {
    try {
        // check season format and make sure it is valid.
        checkSeason(season);
        //store information in variables ready to be used for now
        var build_info_url = 'https://statsapi.web.nhl.com/api/v1/teams?teamId=' + teamID + '&expand=team.stats&season=' + season;
        var teamInfoResponse = null;
        var teamScheduleResponse = null;
        var output = "";
        //get team information from the API
        try {
            teamInfoResponse = await callAPI(build_info_url);
        }
        catch (error) {
            throw "Team Info API Call Error: " + error;
        }
        //get team schedule Information from the API
        output = 'TEAM_ID,TEAM_NAME,TEAM_VENUE_NAME,GAMES_PLAYED,WINS,LOSSES,POINTS,GOALS_PER_GAME,FIRST_GAME_OF_SEASON_DATE,FIRST_GAME_OF_SEASONS_OPP';
        //loop through items incase we pass in more than one. 
        for (var i in teamInfoResponse.teams) {
            var team = teamInfoResponse.teams[i];
            var id = teamInfoResponse.teams[i].id;
            var singleSeasonStats = getSingleSeasonStats(team.teamStats);
            //get information we need from team and singleSeasonStats 
            var teamName = team.name;
            var teamVenueName = team.venue.name;
            var gamesPlayed = singleSeasonStats.gamesPlayed;
            var wins = singleSeasonStats.wins;
            var losses = singleSeasonStats.losses;
            var points = singleSeasonStats.pts;
            var goalsPerGame = singleSeasonStats.goalsPerGame;
            //get first game from our list of events
            var build_schedule_url = 'https://statsapi.web.nhl.com/api/v1/schedule?teamId=' + id + '&season=' + season + '&gameType=R';
            try {
                teamScheduleResponse = await callAPI(build_schedule_url);
            }
            catch (error) {
                throw "Schedule API Call Error: " + error;
            }
            var firstGame = getFirstGame(teamScheduleResponse.dates);
            //get first game information
            var firstGameDate = firstGame.date;
            var firstGameOpp = getOpponent(firstGame.games[0].teams, id);
            var firstGameOppName = firstGameOpp.name;
            //output "CSV"
            let text = id + ',' + teamName + ',' + teamVenueName + ',' + gamesPlayed + ',' + wins + ',' + losses + ',' + points + ',' + goalsPerGame + ',' + firstGameDate + ',' + firstGameOppName;
            output += '\n' + text;
        }
        var team_output = fs.writeFile('./output/team_output.csv', output, 'utf8', function (error) {
            if (error)
                throw error;
        });
        return "File Created in local directory";
    }
    catch (error) {
        return error;
    }
}
