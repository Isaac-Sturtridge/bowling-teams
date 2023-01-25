# bowling-teams
An app for sorting bowling teams - given each player's average, sort them into even teams with the smallest difference between them.

Current use case expects less than 10 players, any more would be sorted into 3 teams*. Smallest difference is not currently guaranteed, but 99.99% likely - and even if the correct outcome is not reached, a small difference is all that is desired, smallest or not. Currently the issue is that factorial is required to guarantee smallest difference, which requires too much computing power to be worth solving the problem.

*The inspiration for this app is from attending a bowling group, at which, given every player's recent bowling average, attempts are made to sort them into roughly equal teams (on lanes) with the smallest possible handicap. Most of the time this group is sized between 4 and 10 with the most I remember being 15, generally with sizes >= 9 we try to expand to 3 lanes.

Scalability of formula is unlikely to need to be higher than 20 players.

TODO: Put appreciable input onto html page
TODO: Acceptable output.
TODO: Expand possibilities to 3 teams (formula rework?)
TODO: Guarantee output is minimum?