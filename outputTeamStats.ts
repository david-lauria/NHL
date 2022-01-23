import fs from 'fs';
import { statsSingleSeason,teamStats,event,matchup,teamResponse,scheduleResponse } from './teamPipelineInterfaces';
import { callAPI } from './callAPI.js';


//gets the single season stats vs regular season rankings stats that are returned by the API
function getSingleSeasonStats(stats:teamStats[]){
    for(var i in stats) {
      //  console.log(teamJson[type])
        if(stats[i].type.displayName == 'statsSingleSeason'){
            return stats[i].splits[0].stat as statsSingleSeason;
        }
     }
}


//finds the first game of the regular season for the team and returns an event instance
function getFirstGame(games:event[]){
    var min_date = new Date('9999-12-13')
    var min_game;
    for(var i in games) {
        if(new Date(games[i].date) <  min_date){
            min_date = new Date(games[i].date);
            min_game = games[i];
        }
     }
    return min_game;
}


//checks the game given vs your team ID and returns which one was the opponent.
function getOpponent(game:matchup,p_team_id:number){
    if(game.away.team.id == p_team_id){
        return game.home.team;
    }
    else{
        return game.away.team;
    }
}

export async function outputTeamStats(teamID: string, season: string){
    try{

        //store information in variables ready to be used for now
        var build_info_url ='https://statsapi.web.nhl.com/api/v1/teams?teamId='+teamID+'&expand=team.stats&season='+season;
        var teamInfoResponse : any= null;
        var teamScheduleResponse : any= null;
        var output : string = "";

        //get team information from the API
        try{
        teamInfoResponse = await callAPI(build_info_url) as teamResponse;
        }
        catch(error){
            throw "Team Info API Call Error: " + error;
        }

        //get team schedule Information from the API

        output = 'TEAM_ID,TEAM_NAME,TEAM_VENUE_NAME,GAMES_PLAYED,WINS,LOSSES,POINTS,GOALS_PER_GAME,FIRST_GAME_OF_SEASON_DATE,FIRST_GAME_OF_SEASONS_OPP'

        //loop through items incase we pass in more than one. 
        for(var i in teamInfoResponse.teams){
            var team = teamInfoResponse.teams[i]
            var id = teamInfoResponse.teams[i].id
            var singleSeasonStats : statsSingleSeason = getSingleSeasonStats(team.teamStats) as statsSingleSeason;


            //get information we need from team and singleSeasonStats 
            var teamName = team.name;
            var teamVenueName = team.venue.name;
            var gamesPlayed = singleSeasonStats.gamesPlayed;
            var wins = singleSeasonStats.wins;
            var losses = singleSeasonStats.losses;
            var points = singleSeasonStats.pts;
            var goalsPerGame = singleSeasonStats.goalsPerGame;
            
            
            //get first game from our list of events
            var build_schedule_url ='https://statsapi.web.nhl.com/api/v1/schedule?teamId='+id+'&season='+season+'&gameType=R';

            try{
            teamScheduleResponse = await callAPI(build_schedule_url) as scheduleResponse;
            }
            catch(error){
                throw "Schedule API Call Error: " + error;
            }
            
            var firstGame : event = getFirstGame(teamScheduleResponse.dates) as event
            
            //get first game information
            var firstGameDate = firstGame.date;
            var firstGameOpp = getOpponent(firstGame.games[0].teams,id);
            var firstGameOppName = firstGameOpp.name;
            
            
            
            //output "CSV"
            let text = id+','+teamName+','+teamVenueName+','+gamesPlayed+','+wins+','+losses+','+points+','+goalsPerGame+','+firstGameDate+','+firstGameOppName;
            output += '\n'+text;
            


        }


        var team_output = fs.writeFile('./team_output.csv',output,'utf8',function(error){
            if(error) throw error;
            });
            return "File Created in local directory"
        }
        catch(error){
            return error;
        }
        }