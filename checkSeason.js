export function checkSeason(p_season) {
    if (p_season.length != 8)
        throw "Season format needs to be two consecutive years in ascending order. Ex 20152016";
    if (parseInt(p_season).toString() != p_season)
        throw "Season contains non-numeric characters";
    var v_season_one = parseInt(p_season.substring(0, 4));
    var v_season_two = parseInt(p_season.substring(4, 8));
    if (v_season_two - 1 != v_season_one)
        throw "Seasons are not consecutive ascending order";
    return true;
}
