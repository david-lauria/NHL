//interface that can store the single season stats or regular season rankings. also has a reduced team information
export interface stats {
    stat: any,
    team: teamInfo
}

//interface that contains the stat type (Single season or regular season) and the corresponding stats
export interface teamStats {
    type: statType,
    splits: stats[]
}


//interface that contains the stat type / display name
export interface statType {
    displayName: string
}


//interface that contains a team's record
export interface record {
    wins: number,
    losses: number,
    ot: number,
    type: string
}


//interface that contians the results for a game
export interface teamResults {
    leagueRecord: record,
    score: number,
    team: teamInfo
}


//interface that contains the matchup for a game
export interface matchup {
    away: teamResults,
    home: teamResults
}


//interface that contains the information for a game. 
export interface game {
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
export interface event {
    date: string,
    totalItems: number,
    totalEvents: number,
    totalGames: number,
    totalMatches: number,
    games: game[],
    events: [],
    "matches": []
}

//timezone that the team venue is in
export interface timeZone {
    id: string,
    offset: number,
    tz: string
}

//team venue interface that has more information. City/timezone
export interface teamVenue {
    name: string,
    link: string,
    city: string,
    timeZone: timeZone
}

//team venue interface that just has the name and link in api
export interface teamVenue {
    name: string,
    link: string
}


//interface that contains team information. Main things needed are ID,NAME,VENUE
export interface teamInfo {
    id: number,
    name: string,
    link: string,
    venue: teamVenue,
    abbreviation: string,
    teamName: string,
    locationName: string,
    firstYearOfPlay: string,
    division: string,
    conference: string,
    franchise: string,
    teamStats: teamStats[],
    shortName: string,
    officialSiteURL: string,
    franchiseId: number,
    active: boolean
}


//interface that has less team information. just ID ,NAME and API link
export interface teamInfo {
    id: number,
    name: string,
    link: string
}

//interface that will store stat information for a specific season
export interface statsSingleSeason {
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
export interface regularSeasonStatRankings {
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


//interface that stores the initial response when we make our api call to get team information
export interface teamResponse {
    copyright: string,
    teams: teamInfo[]
}



//interface that stores the initial response when we make our api call to get team schedule information
export interface scheduleResponse {
    copyright: string,
    totalItems: number,
    totalEvents: number,
    totalGames: number,
    totalMatches: number,
    metaData: JSON,
    wait: number,
    dates: event[]
}