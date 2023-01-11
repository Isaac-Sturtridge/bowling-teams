
// example players todo: input
const players = [158, 142, 114, 112, 110, 103, 60];

function sum_array(arr) {
    return arr.reduce((acc, a) => acc + a, 0);
}

// need to do this loop several times and make an array
// ultimate goal is finding the smallest possible difference between team1 and team2 sums
// and then output the team that leads to that
    let team1 = [];
    let team2 = [];

    for (let i = 0; i < players.length; i++) {
        if (sum_array(team1) <= sum_array(team2)) {
            team1.push(players[i])
        }
        else {
            team2.push(players[i])
        }
    }