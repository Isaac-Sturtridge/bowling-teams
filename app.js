
const enterPlayerButton = document.getElementById('enter-player-button')
let enterPlayer = document.getElementById('enter-player')
const getTeams = document.getElementById('get-teams')
const playerList = document.getElementById('player-list')
const output = document.getElementById('output')
let players = [];


enterPlayerButton.addEventListener('click', () => {
    if(parseInt(enterPlayer.value)) {
      playerList.innerHTML = playerList.innerHTML + " " + enterPlayer.value;
      players.push(parseInt(enterPlayer.value))
    }
    enterPlayer.value = ''
  }
) 



function sum_array(arr) {
    return arr.reduce((acc, a) => acc + a, 0);
}

// Find the handicap if teams were made given this player order
function find_difference(arr) {
    let team1 = [];
    let team2 = [];

    for (let i = 0; i < arr.length; i++) {
        if (sum_array(team1) <= sum_array(team2)) {
            team1.push(arr[i])
        }
        else {
            team2.push(arr[i])
        }
    }
    if (sum_array(team1) > sum_array(team2)) {
        return sum_array(team1) - sum_array(team2)
    }
    else {
        return sum_array(team2) - sum_array(team1)
    }
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

    for (let i = 0; i < arr.length; i++) {
        if (sum_array(team1) <= sum_array(team2)) {
            team1.push(arr[i])
        }
        else {
            team2.push(arr[i])
        }
    }
    team1.sort((a, b) => b - a)
    team2.sort((a, b) => b - a)
    return "[Team 1: " + team1 + "], " + "[Team 2: " + team2 + "], ";
}

getTeams.addEventListener('click', () => {
    if(players.length > 0) {
        players = find_ordering(players)
        let teams = output_teams(players)
        output.innerHTML = teams
    }
} 
)