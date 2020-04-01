export class Game {
  constructor(params) {
    this.params = params
  }

  add(num = 1) {
    this.num = 2 * 2 * num
    return this.params
  }
}