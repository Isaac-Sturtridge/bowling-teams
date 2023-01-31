
const enterPlayerButton = document.getElementById('enter-player-button');
const removePlayerButton = document.getElementById('remove-player-button');
let enterPlayer = document.getElementById('enter-player');
const getTeams = document.getElementById('get-teams');
const playerList = document.getElementById('player-list');
const output = document.getElementById('output');
const threeTeamsCheck = document.getElementById('three-teams');
let threeTeams = false;
let players = [];


enterPlayerButton.addEventListener('click', () => {
    if(parseInt(enterPlayer.value)) {
      playerList.innerHTML = playerList.innerHTML + " " + enterPlayer.value;
      players.push(parseInt(enterPlayer.value))
    }
    enterPlayer.value = ''
  }
) 

removePlayerButton.addEventListener('click', () => {
  players.pop()
  playerList.innerHTML = "Players: " + formatPlayers(players)
  }
)

threeTeamsCheck.addEventListener('change', () => {
    if (!threeTeams) {
        threeTeams = true;
    } else {
        threeTeams = false;
    }
})

function formatPlayers(players) {
  let returnString = '';
  for (let i = 0; i < players.length; i++) {
    returnString += ' ' + players[i]
  }
  return returnString;
}

function sum_array(arr) {
    return arr.reduce((acc, a) => acc + a, 0);
}

// Find the handicap if teams were made given this player order
function find_difference(arr) {
    let team1 = [];
    let team2 = [];
    let team3 = [];
    let teams = [team1, team2]
    if (threeTeams) {
        teams = [team1, team2, team3]
    } 
    for (let i = 0; i < arr.length; i++) {
        let sum_team = teams.map((team) => sum_array(team))
        let lowestTeam = sum_team.indexOf(Math.min(...sum_team))
        teams[lowestTeam].push(arr[i])
    }
    sum_team = teams.map((team => sum_array(team)))
    return Math.max(...sum_team) - Math.min(...sum_team)
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function find_ordering(players) {
  // collect possible differences by shuffling players
  let differences = []
  // TODO: Maximum shuffles needed is given by some division of factorial (factorial too large to be worth it)
  let i = 0
  while (i < Math.pow(players.length, 4)) {
      let difference = find_difference(players);
      if (differences.indexOf(difference) == - 1) {
          differences.push(difference);
      }
      shuffle(players);
      i++;
  }
  
  console.log(differences)
  console.log(Math.min(...differences))
  
  // Find the ordering by which a minimum difference is outputted
  while (find_difference(players) != Math.min(...differences)) {
      shuffle(players)
  }
  return players
}

// redoes the find_difference function but outputs the teams instead
function output_teams(arr) {
    let team1 = [];
    let team2 = [];
    let team3 = [];
    let teams = [team1, team2]
    if (threeTeams) {
        teams = [team1, team2, team3]
    } 

    for (let i = 0; i < arr.length; i++) {
        let sum_team = teams.map((team) => sum_array(team))
        let lowestTeam = sum_team.indexOf(Math.min(...sum_team))
        teams[lowestTeam].push(arr[i])
    }
    team1.sort((a, b) => b - a)
    team2.sort((a, b) => b - a)
    if (threeTeams) {
        team3.sort((a, b) => b - a)
        return `[Team 1: ` + team1 + `], total: ${sum_array(team1)}, \n ` + 
        `[Team 2: ` + team2 + `], total: ${sum_array(team2)}, handicap: ${Math.abs(sum_array(team1) - sum_array(team2))} `
         + `[Team 3: ` + team3 + `], total: ${sum_array(team3)}, handicap: ${Math.abs(sum_array(team1) - sum_array(team3))} `;
    } 
    return `[Team 1: ` + team1 + `], total: ${sum_array(team1)}, \n ` + `[Team 2: ` + team2 + `], total: ${sum_array(team2)}, handicap: ${Math.abs(sum_array(team1) - sum_array(team2))} `;
}

getTeams.addEventListener('click', () => {
    if(players.length > 0) {
        players = find_ordering(players)
        let teams = output_teams(players)
        output.innerHTML = teams
    }
} 
)