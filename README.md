# node-geometry-dash

A node.js module for searching for levels, accounts, getting songs, and the leaderboards of the game Geometry Dash

---

### How to install:

```
npm install node-geometry-dash
```


### How to use:

```js
const GDClient = require("node-geometry-dash");

const GD = new GDClient({
  username: "...",  // doesn't work yet :/
  password: "..."   // doesn't work yet :/
});

// Searching for levels
GD.levels("Bloodbath").then( levels => {
  console.log(levels[0]) /* { name: 'Bloodbath',
                              id: '10565740',
                              author: { name: 'Riot', id: '503085' },
                              song:
                               { name: 'At the Speed of Light',
                                 author: 'Dimrain47',
                                 id: '467339',
                                 size: '9.56MB',
                                 url: 'http://audio.ngfiles.com/467000/467339_At_the_Speed_of_Light_FINA.mp3' },
                              difficulty: 'Demon',
                              downloads: '1530678',
                              likes: '275137',
                              stars: '10',
                              featured: true,
                              description: 'Whose blood will be spilt in the Bloodbath? Who will the victors be? How many will survive? Good luck...',
                              length: 'XL',
                              coins: '0',
                              version: 1,
                              verifiedCoins: false,
                              requestedStars: '0' } */
});

// Searching for user accounts
GD.users("AnnoyingDog87").then( users => {
  console.log(users[0]) /*{ username: 'AnnoyingDog87',
                            id: '13506210',
                            coins: '45',
                            userCoins: '244',
                            stars: '972',
                            demons: '12',
                            creatorPoints: '0',
                            extID: '3626073' } */
});
```


# Objects

---

### Level object


| Key | Description | Example |
| :---: | :---: | :---: |
| name | The level name | Bloodbath |
| id | The level id | 10565740 |
| song | A song object | {...} |
| difficulty | The level difficulty | Demon |
| downloads | The amount of downloads the level has | 1530678 |
| likes | The amount of likes the level has | 275137 |
| stars | The amount of stars the level has | 10 |
| featured | If the level is featured or not | true |
| description | The level description | Whose blood will be spilt in the Bloodbath? Who will the victors be? How many will survive? Good luck... |
| length | The level length | XL |
| coins | The amount of coins the level has | 0 |
| version | The level version | 1 |
| verifiedCoins | If the level has user coins or not | false |
| requestedStars | The amount of stars the level owner requested | 0 |


### User object


| Key | Description | Example |
| :---: | :---: | :---: |
| username | The user's username | AnnoyingDog87 |
| id | The user's id | 13506210 |
| coins | The user's secret coins | 45 |
| userCoins | The user's secret coins | 244 |
| stars | The amount of stars the user has | 972 |
| demons | The amount of demons the user has | 12 |
| creatorPoints | The amount of creator points the user has | 0 |
| extID | The user's extID (???) | 0 |


### Mappack object


| Key | Description | Example |
| :---: | :---: | :---: |
| name | The mappack name | Alpha Pack |
| id | The mappack id | 67 |
| levels | An array with all the 3 mappack levels | [...] |
| stars | The amount of stars the mappack has | 2 |
| coins | The amount of coins the mappack has | 1 |
| difficulty | The mappack difficulty | Easy |
| rgb | The mappack color (rgb) | [...] |


### Account Comment


| Key | Description | Example |
| :---: | :---: | :---: |
| comment | The comment content | "..." |
| likes | The amount of likes the comment has | 1 |
| date | The time the comment was posted | 1 second ago |
| commentID | The comment id | 0 |


### Level Comment


| Key | Description | Example |
| :---: | :---: | :---: |
| comment | The comment content | "..." |
| username | The author's username | AnnoyingDog87 |
| userID | The author's id | 1 |
| likes | The amount of likes the comment has | 1 |
| date | The time the comment was posted | 1 second ago |
| commentID | The comment id | 0 |



---

Made by [AnnoyingDog87](https://github.com/annoyingdog87/)