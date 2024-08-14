/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: test
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const goal = "g"


setLegend(
  [ player, bitmap`
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
................` ],
  [ goal, bitmap`
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
  [ wall, bitmap`
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
0000000000000000`]
)

setSolids([ player, wall ]);

let level = 1
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
wp..www.w...w
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

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  const winner = tilesWith(player, goal).length;
  if (winner > 0) {
    level = level + 1;

    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 7, color: color`3` } );
    }
  }
})
