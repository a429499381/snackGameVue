// import SnackGame from "./actions/snackGame.js";
import SnackGame from './snackGame.js'

export const { log } = console

export const Between = function(min, max) {
  let t = Math.floor(Math.random() * (max + 1 - min)) + min;
  return t
}

export const __main = function () {
  const game = new SnackGame()
  return game
}


