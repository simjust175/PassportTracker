// let today = new Date();
// let sixMonthsAgo = new Date(today.setMonth(today.getMonth() + 6));

// // Format the date if needed
// let formattedDate = sixMonthsAgo.toISOString().split('T')[0];
// console.log(formattedDate);

// let num = 0
// const printNum = (n) => {
//     console.log("n", n);
// }

// const addnum = () => {
//     num ++
//     printNum(num)
// }

// printNum()
// addnum()

// let word = "hello_world"

// const enhanceText = (txt) => {
//     if (txt.includes("_")){txt= txt.replace("_", " ")}
//     return txt.charAt(0).toUpperCase() + txt.slice(1, word.length)
// }

// const newWord = slash(word)

// console.log(newWord);

// let name = "yanky babchik"
// let name2 = "chaim m brecher"

// console.log(name.split(" ")[name.split(" ").length - 1]);
// const split = (word) => word.split(" ")
// console.log(name.slice(0, 1), split(name)[split(name).length - 1].slice(0, 1));

// const initl = (name) => {
//     console.log("hello");
// }

// const initializer = (name) => {
//     if (!name) return null
//     console.log("name to initialize: >>>", name)
//     const split = (word) => word.split(" ")
//     console.log(name.slice(0, 1));
//     console.log(name.slice(0, 1), split(name)[split(name).length - 1].slice(0, 1).toUpperCase());
// }

// initializer('Moishy y n Justman')

// const arr = ['yes', 'no'].forEach(ans => console.log(ans + "!"))

// const long = {}

// const original = {
//     name: "simcha",
//     age: 27
// }

// Object.assign(original, {
//     name: "", age: ""
// })

// console.log(original);

const a = [8, 8, "6"];
const b = [6, 8];
const c = {
  0: "red",
  1: "blue",
  2: "yellow",
  4: "green",
};
const d = {
  0: "red",
  1: "red",
  2: "blue",
  4: "white",
  // 0: "red",
  // 1: "blue",
  // 2: "yellow",
  // 4: "green"
};

// const compare = (computer, player) => {
//     const winningColors = Object.values(computer)
//     const playerPicks = Object.values(player)
//     // check for winner
//     let matchingColorsAndPositions = 0
//     let reds =
//     for (let i = 0; i <= 3; i++) {
//         if (winningColors[i] === playerPicks[i]) {
//             console.log("it's all the same!");
//             matchingColorsAndPositions++
//             winningColors[i] = ""
//             console.log(winningColors);
//         } else if (winningColors.includes(playerPicks[i])) console.log("not the same but...", winningColors.includes(playerPicks[i]), playerPicks[i]);
//         if (matchingColorsAndPositions === 4) return console.log("WINNER!!")
//     }
//     // check for reds or whites

// }
// compare(c, d)

// const ever = {
//     1: "chaim",
//     2: "j"
// }

// console.log(Object.values(ever).every(ev => ev));

const newObj = { yes: 2, no: 0 };
const arr = [];
//[ [ 'yes', 2 ], [ 'no', 1 ] ]
// const newArray = Object.entries(newObj).forEach((color) => {
//   for (let index = 0; index < color[1]; index++) {
//     arr.push(color[0]);
//   }
// });
// let on = 1
// console.log(on += 2);

// const col = ["white", "red", "white"]
// console.log(col.sort());

// const validatePlayersChoice = (comp, play) => {
//   const computer = Object.values(comp);
//   const player = Object.values(play);

//   let whites = 0;
//   let reds = 0;

//   for (let i = 0; i <= 3; i++) {
//     if (computer[i] === player[i]) {
//       whites++;
//       computer[i] = "";
//       player[i] = "";
//     }
//   }
//   player.forEach(peg => {
//     if (peg && computer.includes(peg)) {
//       console.log("we're here:", computer, peg);
//       computer[computer.indexOf(peg)] = ""
//       reds++
//     };
//   })

//   console.log("results", { white: whites, red: reds });
// };

const comp = { 1: "a", 2: "a", 3: "a", 4: "d" }
const play = { 1: "a", 2: "d", 3: "a", 4: "a" }
const squareIndex = (row, col) => {
  if (row >= 2 && col >= 2) {
    return 2
  } else if (row >= 5 && col >= 5) {

  }
}
// validatePlayersChoice(comp, play)
const addNumber = (row, column) => {
  for (let number = 1; number <= 9; number++) {
    if (!rows[row].includes(number) && !cols[column].includes(number) && !sq[row].includes(number)) {
      rows[row].push(number)
      cols[column].push(number)
      sq[row].push(number)
      break
    }
  }
}

const rows = [[], [], [], [], [], [], [], [], []]
const cols = [[], [], [], [], [], [], [], [], []]
/* # 0 1 2 3 4 5 6 7 8
   0 0 0 0 1 1 1 2 3 3
   1 0 0 0 1 1 1 2 3 3
   2 0 0 0 1 1 1 2 3 3
   3
   4
   5
   6
   7
   8
   */
const calculateSq = (row, col) => {
  if(row < 2 && col < 0) {
    return 1
  } else if()
}
const sq = {
  0: [], 1: [],
}
const sudoku = () => {
  for (let row = 0; row <= 8; row++) {
    for (let column = 0; column <= 8; column++) {
      addNumber(row, column)
    }
    console.log(rows);
  }
}

sudoku()

