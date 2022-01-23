import  fetch  from 'node-fetch';

//get team information from the NHL API
export async function callAPI(p_url: string){
    var response = await fetch(p_url);
    if(!response.ok){
        throw Error(response.statusText);
    }
    return response.json();
}