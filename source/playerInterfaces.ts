//interface that has less team information. just ID ,NAME and API link
export interface teamInfo {
    id: number,
    name: string,
    link: string
}


//interface that contains the position of the player
export interface position {
    code: string,
    name: string,
    type: string,
    abbreviation: string
}


//interface that contains player information
export interface player {
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

export interface player {
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

export interface player {
    id: number,
    fullName: String,
    link: String,
    firstName: String,
    lastName: String,
    birthDate: String,
    birthCity: String,
    birthStateProvince: String,
    birthCountry: String,
    nationality: String,
    height: String,
    weight: number,
    active: boolean,
    rookie: boolean,
    shootsCatches: String,
    rosterStatus: String,
    primaryPosition: position
}


//interface that will store stat information for a specific season
export interface statsSingleSeason {
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

//interface that holds the json object for the single season stats
export interface seasonStats {
    season: JSON,
    stat: statsSingleSeason
}

//interfact that stores the stats information 
export interface stats {
    type: JSON,
    splits: seasonStats[]
}

//interface that stores the initial response when we make our api call to get team information
export interface playerResponse {
    copyright: string,
    people: player[]
}

//interface that stores a player's single season stats
export interface statResponse {
    copyright: string,
    stats: stats[]
}