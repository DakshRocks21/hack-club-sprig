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
200: C4~200 + G4^200,
200: D4~200 + G4^200 + A4^200,
200: E4~200 + B4^200 + A4^200 + C4-200,
200: F4~200 + B4^200 + C5^200 + D4-200 + G5/200,
200: G4~200 + C5^200 + D5^200 + B4-200 + E4-200,
200: A4~200 + D5^200 + E5^200 + C5-200 + F4-200,
200: B4~200 + E5^200 + F5^200 + D5-200,
200: C5~200 + G5^200 + E5-200 + F5-200 + D5/200,
200: C5~200 + G5^200 + F5-200 + E5-200 + D5/200,
200: B4~200 + F5^200 + E5^200 + D5-200,
200: A4~200 + E5^200 + D5^200 + F4-200 + C5-200,
200: G4~200 + D5^200 + C5^200 + E4-200 + B4-200,
200: F4~200 + C5^200 + B4^200 + D4-200 + G5/200,
200: E4~200 + B4^200 + A4^200 + C4-200,
200: D4~200 + A4^200 + G4^200,
200: C4~200 + G4^200,
200: C4~200 + G4^200,
200: D4~200 + G4^200 + A4^200,
200: E4~200 + B4^200 + A4^200 + C4-200,
200: F4~200 + B4^200 + C5^200 + D4-200 + G5/200,
200: G4~200 + D5^200 + C5^200 + B4-200 + E4-200,
200: A4~200 + E5^200 + D5^200 + C5-200 + F4-200,
200: B4~200 + E5^200 + F5^200 + D5-200 + G4-200,
200: C5~200 + G5^200 + F5-200 + E5-200 + D5/200,
200: C5~200 + G5^200 + E5-200 + F5-200 + D5/200,
200: B4~200 + E5^200 + F5^200 + D5-200 + G4-200,
200: A4~200 + D5^200 + E5^200 + C5-200 + F4-200,
200: G4~200 + C5^200 + D5^200 + B4-200 + E4-200,
200: F4~200 + B4^200 + C5^200 + D4-200 + G5/200,
200: E4~200 + A4^200 + B4^200 + C4-200,
200: D4~200 + G4^200 + A4^200,
200: C4~200 + G4^200`
const gameOver = tune`
208.33333333333334: C5-208.33333333333334 + B5-208.33333333333334,
208.33333333333334: G5^208.33333333333334 + C5-208.33333333333334 + A5-208.33333333333334 + E5~208.33333333333334,
208.33333333333334: D5-208.33333333333334 + C5-208.33333333333334 + A5-208.33333333333334 + E5~208.33333333333334,
208.33333333333334: G5^208.33333333333334 + D5-208.33333333333334 + C5-208.33333333333334 + A5-208.33333333333334 + E5~208.33333333333334,
208.33333333333334: G5-208.33333333333334 + E5~208.33333333333334 + C5-208.33333333333334,
208.33333333333334: F5^208.33333333333334 + G5-208.33333333333334 + E5/208.33333333333334 + C5-208.33333333333334,
208.33333333333334: F5~208.33333333333334 + G5-208.33333333333334 + E5/208.33333333333334 + C5-208.33333333333334,
208.33333333333334: G5^208.33333333333334 + F5~208.33333333333334 + A5^208.33333333333334 + C5-208.33333333333334 + E5/208.33333333333334,
208.33333333333334: G5^208.33333333333334 + A5^208.33333333333334 + F5~208.33333333333334 + D5-208.33333333333334 + E5/208.33333333333334,
208.33333333333334: F5~208.33333333333334 + G5-208.33333333333334 + A5^208.33333333333334 + D5-208.33333333333334 + E5/208.33333333333334,
208.33333333333334: F5~208.33333333333334 + G5-208.33333333333334 + A5^208.33333333333334 + D5-208.33333333333334 + E5/208.33333333333334,
208.33333333333334: G5-208.33333333333334 + A5^208.33333333333334 + D5-208.33333333333334 + E5-208.33333333333334 + F5~208.33333333333334,
208.33333333333334: G5-208.33333333333334 + A5^208.33333333333334 + D5-208.33333333333334 + E5-208.33333333333334 + F5~208.33333333333334,
208.33333333333334: G5-208.33333333333334 + A5^208.33333333333334 + E5-208.33333333333334 + F5/208.33333333333334,
208.33333333333334: G5-208.33333333333334 + A5^208.33333333333334 + E5-208.33333333333334 + F5/208.33333333333334,
208.33333333333334: A5^208.33333333333334 + G5-208.33333333333334 + E5-208.33333333333334 + F5/208.33333333333334,
208.33333333333334: A5^208.33333333333334 + G5/208.33333333333334 + E5-208.33333333333334 + F5~208.33333333333334,
208.33333333333334: G5-208.33333333333334 + A5^208.33333333333334 + E5-208.33333333333334 + D5-208.33333333333334 + F5~208.33333333333334,
208.33333333333334: G5/208.33333333333334 + A5^208.33333333333334 + F5~208.33333333333334 + D5-208.33333333333334,
208.33333333333334: G5/208.33333333333334 + F5~208.33333333333334 + D5-208.33333333333334,
208.33333333333334: G5/208.33333333333334 + F5~208.33333333333334 + D5-208.33333333333334,
208.33333333333334: G5/208.33333333333334 + F5~208.33333333333334 + D5-208.33333333333334,
208.33333333333334: F5~208.33333333333334 + A5-208.33333333333334 + D5-208.33333333333334 + G5/208.33333333333334,
208.33333333333334: F5-208.33333333333334 + A5-208.33333333333334 + D5-208.33333333333334 + G5/208.33333333333334,
208.33333333333334: F5-208.33333333333334 + A5/208.33333333333334 + D5-208.33333333333334 + G5~208.33333333333334,
208.33333333333334: F5-208.33333333333334 + A5/208.33333333333334 + D5-208.33333333333334 + G5~208.33333333333334,
208.33333333333334: F5-208.33333333333334 + A5/208.33333333333334 + D5-208.33333333333334 + G5~208.33333333333334,
208.33333333333334: F5-208.33333333333334 + A5-208.33333333333334 + C5-208.33333333333334 + G5~208.33333333333334 + B5/208.33333333333334,
208.33333333333334: F5^208.33333333333334 + A5-208.33333333333334 + C5-208.33333333333334 + G5~208.33333333333334,
208.33333333333334: E5^208.33333333333334 + C5-208.33333333333334 + G5~208.33333333333334,
208.33333333333334: C5-208.33333333333334 + A5~208.33333333333334,
208.33333333333334: A5~208.33333333333334`

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
const endScreen = map`
wwwwwwwwww
wwwwggwwww
wwpwggwoww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww`;

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
onInput("j", () => {

    // Stop the game loops
    clearInterval(gameLoop);
    clearInterval(gameLoopButHitChecker);

    // Reset game variables
    gameRunning = true;
    level = 0;

    getAll(obstacle).forEach(obstacle => {
      obstacle.remove();
    });
    if (gameOverMusic !== undefined) {
    gameOverMusic.end()
    }
    getFirst(player).x = 1; 
    getFirst(player).y = 1; 

    gameLoop = setInterval(() => {
      if (gameRunning) {
        despawnObstacles();
        moveObstacles();
        spawnObstacle();

        if (checkHit()) {
          playback.end();
          setMap(endScreen);
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

    gameLoopButHitChecker = setInterval(() => {
      if (gameRunning) {
        if (checkHit()) {
          playback.end();
          setMap(endScreen);
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
});


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
    if (checkHit()) {
      playback.end()
      setMap(endScreen);
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
      setMap(endScreen);
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
      playback.end()
      const gameOverMusic = playTune(gameOver, Infinity)
      setMap(endScreen);
      gameRunning = false;
      addText("you win!", { y: 6, color: color`3` });
    }
  }
});
