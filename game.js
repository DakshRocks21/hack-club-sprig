/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: test
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const wall = "w";
const goal = "g";
const obstacle = "o";
var gameRunning = true;

const gameMusic = tune`
205.4794520547945: C4~205.4794520547945 + G4^205.4794520547945,
205.4794520547945: D4~205.4794520547945 + G4^205.4794520547945 + A4^205.4794520547945,
205.4794520547945: E4~205.4794520547945 + B4^205.4794520547945 + A4^205.4794520547945 + C4-205.4794520547945,
205.4794520547945: F4~205.4794520547945 + B4^205.4794520547945 + C5^205.4794520547945 + D4-205.4794520547945 + G5/205.4794520547945,
205.4794520547945: G4~205.4794520547945 + C5^205.4794520547945 + D5^205.4794520547945 + B4-205.4794520547945 + E4-205.4794520547945,
205.4794520547945: A4~205.4794520547945 + D5^205.4794520547945 + E5^205.4794520547945 + C5-205.4794520547945 + F4-205.4794520547945,
205.4794520547945: B4~205.4794520547945 + E5^205.4794520547945 + F5^205.4794520547945 + D5-205.4794520547945,
205.4794520547945: C5~205.4794520547945 + G5^205.4794520547945 + E5-205.4794520547945 + F5-205.4794520547945 + D5/205.4794520547945,
205.4794520547945: C5~205.4794520547945 + G5^205.4794520547945 + F5-205.4794520547945 + E5-205.4794520547945 + D5/205.4794520547945,
205.4794520547945: B4~205.4794520547945 + F5^205.4794520547945 + E5^205.4794520547945 + D5-205.4794520547945,
205.4794520547945: A4~205.4794520547945 + E5^205.4794520547945 + D5^205.4794520547945 + F4-205.4794520547945 + C5-205.4794520547945,
205.4794520547945: G4~205.4794520547945 + D5^205.4794520547945 + C5^205.4794520547945 + E4-205.4794520547945 + B4-205.4794520547945,
205.4794520547945: F4~205.4794520547945 + C5^205.4794520547945 + B4^205.4794520547945 + D4-205.4794520547945 + G5/205.4794520547945,
205.4794520547945: E4~205.4794520547945 + B4^205.4794520547945 + A4^205.4794520547945 + C4-205.4794520547945,
205.4794520547945: D4~205.4794520547945 + A4^205.4794520547945 + G4^205.4794520547945,
205.4794520547945: C4~205.4794520547945 + G4^205.4794520547945,
205.4794520547945: C4~205.4794520547945 + G4^205.4794520547945,
205.4794520547945: D4~205.4794520547945 + G4^205.4794520547945 + A4^205.4794520547945,
205.4794520547945: E4~205.4794520547945 + B4^205.4794520547945 + A4^205.4794520547945 + C4-205.4794520547945,
205.4794520547945: F4~205.4794520547945 + B4^205.4794520547945 + C5^205.4794520547945 + D4-205.4794520547945 + G5/205.4794520547945,
205.4794520547945: G4~205.4794520547945 + D5^205.4794520547945 + C5^205.4794520547945 + B4-205.4794520547945 + E4-205.4794520547945,
205.4794520547945: A4~205.4794520547945 + E5^205.4794520547945 + D5^205.4794520547945 + C5-205.4794520547945 + F4-205.4794520547945,
205.4794520547945: B4~205.4794520547945 + E5^205.4794520547945 + F5^205.4794520547945 + D5-205.4794520547945 + G4-205.4794520547945,
205.4794520547945: C5~205.4794520547945 + G5^205.4794520547945 + F5-205.4794520547945 + E5-205.4794520547945 + D5/205.4794520547945,
205.4794520547945: C5~205.4794520547945 + G5^205.4794520547945 + E5-205.4794520547945 + F5-205.4794520547945 + D5/205.4794520547945,
205.4794520547945: B4~205.4794520547945 + E5^205.4794520547945 + F5^205.4794520547945 + D5-205.4794520547945 + G4-205.4794520547945,
205.4794520547945: A4~205.4794520547945 + D5^205.4794520547945 + E5^205.4794520547945 + C5-205.4794520547945 + F4-205.4794520547945,
205.4794520547945: G4~205.4794520547945 + C5^205.4794520547945 + D5^205.4794520547945 + B4-205.4794520547945 + E4-205.4794520547945,
205.4794520547945: F4~205.4794520547945 + B4^205.4794520547945 + C5^205.4794520547945 + D4-205.4794520547945 + G5/205.4794520547945,
205.4794520547945: E4~205.4794520547945 + A4^205.4794520547945 + B4^205.4794520547945 + C4-205.4794520547945,
205.4794520547945: D4~205.4794520547945 + G4^205.4794520547945 + A4^205.4794520547945,
205.4794520547945: C4~205.4794520547945 + G4^205.4794520547945`

setLegend(
  [player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`],
  [obstacle, bitmap`
6666666666666666
6666666666666666
9666666666666669
9966666666666699
9966666666666699
9966666666666699
9996666666666999
9999C666666C9999
9999CC6666CC9999
9999CCC66CC99999
.9999CCCCCC9999.
..999CCCCCC999..
...999CCCC999...
....999CC999....
.....999999.....
......9999......`],
  [goal, bitmap`
................
..66........66..
..666......666..
..666......666..
..666666666666..
..666666666666..
..666666666666..
...6666666666...
...6666666666...
....66666666....
.66666666666666.
6666.666666.6666
.....666666.....
...6666666666...
6666666666666666
..666666666666..`],

  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]);

setSolids([player], [wall]);

let level = 0
const levels = [
  map`
wwwwwwwwww
wpwww..wgw
w...w.ww.w
www...ww.w
w....www.w
w.wwwww..w
w...w...ww
.ww.w.w.ww
.w....w.ww
....w.....`,
  map`
wwwwwww...www
wp......w...w
.ww.w.w..wwgw
....w.ww..ww.
ww.ww..ww.w..
ww.w..ww....w
.....ww..wwww
.w.ww...ww.ww
.www.ww.ww.ww
.ww.....w..ww
..w.w..ww.w.w
w...ww......w
www.....wwwww`
]
const playback = playTune(gameMusic, Infinity);

setMap(levels[level]);

setPushables({
  [player]: []
});

onInput("s", () => {
  if (gameRunning) {
    const nextTile = getTile(getFirst(player).x, getFirst(player).y + 1);

    if (!nextTile.some(sprite => sprite.type === wall)) {
      getFirst(player).y += 1;
    }
  }
});
onInput("w", () => {
  if (gameRunning) {
    const nextTile = getTile(getFirst(player).x, getFirst(player).y - 1);

    if (!nextTile.some(sprite => sprite.type === wall)) {
      getFirst(player).y -= 1;
    }
  }
});
onInput("a", () => {
  if (gameRunning) {
    const nextTile = getTile(getFirst(player).x - 1, getFirst(player).y);

    if (!nextTile.some(sprite => sprite.type === wall)) {
      getFirst(player).x -= 1;
    }
  }
});
onInput("d", () => {
  if (gameRunning) {
    const nextTile = getTile(getFirst(player).x + 1, getFirst(player).y);

    if (!nextTile.some(sprite => sprite.type === wall)) {
      getFirst(player).x += 1;
    }
  }
});

function spawnObstacle() {
  
  let x = Math.floor(Math.random() * 13);
  let y = 0;
  addSprite(x, y, obstacle);
}


function moveObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}


function despawnObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].y == 13) {
      obstacles[i].remove();
    }
  }
}

// See if the player was hit
function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }

  return false;
}

var gameLoop = setInterval(() => {
  if (gameRunning) {
    despawnObstacles();
    moveObstacles();
    spawnObstacle();
    // Step 4 - Add all game functions
    if (checkHit()) {
      playback.end()
      clearInterval(gameLoop);
      gameRunning = false;
      addText("Game Over!", {
        x: 5,
        y: 6,
        color: color`3`
      });
    }
  }
}, 1000);

var gameLoopButHitChecker = setInterval(() => {
   if (gameRunning) {
  if (checkHit()) {
    playback.end()
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }
   }

}, 100);

afterInput(() => {
  const winner = tilesWith(player, goal).length;
  if (winner > 0) {
    level = level + 1;

    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      gameRunning = false;
      addText("you win!", { y: 7, color: color`3` });
    }
  }
})
