import  fetch  from 'node-fetch';
import fs from 'fs';

//move these interfaces to another file to clean this up later.

//timezone that the team venue is in
interface timeZone{
    id: string,
    offset: number,
    tz: string
}

//team venue interface that has more information. City/timezone
interface teamVenueExpanded{
    name: string,
    link: string,
    city: string,
    timeZone: timeZone
}

//team venue interface that just has the name and link in api
interface teamVenue{
    name: string,
    link: string
}


//interface that contains team information. Main things needed are ID,NAME,VENUE
interface teamInfo{
    id: number,
    name: string,
    link: string,
    venue: teamVenueExpanded,
    abbreviation: string,
    teamName: string,
    locationName: string,
    firstYearOfPlay: string,
    division: string,
    conference: string,
    franchise: string,
    shortName: string,
    officialSiteURL: string,
    franchiseId: number,
    active: boolean
}


//interface that has less team information. just ID ,NAME and API link
interface reduceTeamInfo{
    id: number,
    name: string,
    link: string
}

//interface that will store stat information for a specific season
interface statsSingleSeason{
    gamesPlayed: number,
    wins: number,
    losses: number,
    ot: number,
    pts: number,
    ptPctg: string,
    goalsPerGame: number,
    goalsAgainstPerGame: number,
    evGGARatio: number,
    powerPlayPercentage: string,
    powerPlayGoals: number,
    powerPlayGoalsAgainst: number,
    powerPlayOpportunities: number,
    penaltyKillPercentage: string,
    shotsPerGame: number,
    shotsAllowed: number,
    winScoreFirst: number,
    winOppScoreFirst: number,
    winLeadFirstPer: number,
    winLeadSecondPer: number,
    winOutshootOpp: number,
    winOutshotByOpp: number,
    faceOffsTaken: number,
    faceOffsWon: number,
    faceOffsLost: number,
    faceOffWinPercentage: string,
    shootingPctg: number,
    savePctg: number
}

//not needed but made for fun.. stores the other information that we can get back from the API that contains the single season stats for a team
interface regularSeasonStatRankings{
    wins: string,
    losses: string,
    ot: string,
    pts: string,
    ptPctg: string,
    goalsPerGame: string,
    goalsAgainstPerGame: string,
    evGGARatio: string,
    powerPlayPercentage: string,
    powerPlayGoals: string,
    powerPlayGoalsAgainst: string,
    powerPlayOpportunities: string,
    penaltyKillOpportunities: string,
    penaltyKillPercentage: string,
    shotsPerGame: string,
    shotsAllowed: string,
    winScoreFirst: string,
    winOppScoreFirst: string,
    winLeadFirstPer: string,
    winLeadSecondPer: string,
    winOutshootOpp: string,
    winOutshotByOpp: string,
    faceOffsTaken: string,
    faceOffsWon: string,
    faceOffsLost: string,
    faceOffWinPercentage: string,
    savePctRank: string,
    shootingPctRank: string
}

//interface that can store the single season stats or regular season rankings. also has a reduced team information
interface stats{
    stat: any,
    team : reduceTeamInfo
}

//interface that contains the stat type (Single season or regular season) and the corresponding stats
interface teamStats{
    type: statType,
    splits: stats[]
}


//interface that contains the stat type / display name
interface statType{
    displayName: string
}


//interface that contains a team's record
interface record{
    wins: number,
    losses: number,
    ot: number,
    type: string
}


//interface that contians the results for a game
interface teamResults{
    leagueRecord: record,
    score: number,
    team: reduceTeamInfo
}


//interface that contains the matchup for a game
interface matchup{
    away: teamResults,
    home: teamResults
}


//interface that contains the information for a game. 
interface game{
    gamePk: number,
    link: string,
    gameType: string,
    season: string,
    gameDate: string,
    status: JSON,
    teams: matchup,
    venue: teamVenue
    "content": JSON
}

//interface that contains the date and game happening on a specific day
interface event{
    date: string,
    totalItems: number,
    totalEvents: number,
    totalGames: number,
    totalMatches: number,
    games: game[],
    events:[] , 
    "matches":[] 
}


//interface that stores the initial response when we make our api call to get team information
interface teamResponse{
    copyright: string,
    teams: teamInfo[]
}


//interface that stores the initial response when we make our api call to get team statistic information
interface statResponse{
    copyright: string,
    stats: teamStats[]
}



//interface that stores the initial response when we make our api call to get team schedule information
interface scheduleResponse{
    copyright: string,
    totalItems: number,
    totalEvents: number,
    totalGames: number,
    totalMatches: number,
    metaData: JSON,
    wait: number,
    dates: event[]
}



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


//get team information from the NHL API
async function getTeamAPI(p_team_id:number,p_season:number){
    var response = await fetch('https://statsapi.web.nhl.com/api/v1/teams/'+p_team_id+'?expand=team.schedule&season='+p_season);
    return response.json();
}

//get team statistic information from the NHL API
async function getTeamStatsAPI(p_team_id:number,p_season:number){
    var response = await fetch('https://statsapi.web.nhl.com/api/v1/teams/'+p_team_id+'/stats?season='+p_season);
    return response.json();
}


//get team schedule information from the NHL API
async function getTeamSchedule(p_team_id:number,p_season:number){
    var response = await fetch('https://statsapi.web.nhl.com/api/v1/schedule?teamId='+p_team_id+'&season='+p_season+'&gameType=R');
    return response.json();
}



//store information in variables ready to be used for now
var teamID = 5;
var season = 20152016;

//get team information from the API
var teamInfoResponse: teamResponse = await getTeamAPI(teamID,season) as teamResponse;

//get team Statistic information from the API
var teamStatResponse : statResponse = await getTeamStatsAPI(teamID,season) as statResponse;

//get team schedule Information from the API
var teamScheduleResponse : scheduleResponse = await getTeamSchedule(teamID,season) as scheduleResponse;

//get first item in the array since we are only querying one team. change?? 
var team = teamInfoResponse.teams[0];



//grab the single season stats from the stats object. This makes sure we don't get the regular season rankings
var singleSeasonStats : statsSingleSeason = getSingleSeasonStats(teamStatResponse.stats) as statsSingleSeason;


//get information we need from team and singleSeasonStats 
var teamName = team.name;
var teamVenueName = team.venue.name;
var gamesPlayed = singleSeasonStats.gamesPlayed;
var wins = singleSeasonStats.wins;
var losses = singleSeasonStats.losses;
var points = singleSeasonStats.pts;
var goalsPerGame = singleSeasonStats.goalsPerGame;


//get first game from our list of events
var firstGame : event = getFirstGame(teamScheduleResponse.dates) as event

//get first game information
var firstGameDate = firstGame.date;
var firstGameOpp = getOpponent(firstGame.games[0].teams,teamID);
var firstGameOppName = firstGameOpp.name;



//output "CSV"
let header = 'TEAM_ID,TEAM_NAME,TEAM_VENUE_NAME,GAMES_PLAYED,WINS,LOSSES,POINTS,GOALS_PER_GAME,FIRST_GAME_OF_SEASON_DATE,FIRST_GAME_OF_SEASONS_OPP'
let text = teamID+','+teamName+','+teamVenueName+','+gamesPlayed+','+wins+','+losses+','+points+','+goalsPerGame+','+firstGameDate+','+firstGameOppName;

var output = header +'\n'+text;

var team_output = fs.writeFile('./team_output.csv',output,'utf8',function(error){
 if(error) throw error;
 });
