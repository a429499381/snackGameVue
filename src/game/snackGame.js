
import {Snack} from '../game/snack'
import {Food} from '../game/food'
export class SnackGame {
  constructor(dom = 'bigBorder') {
    this.domInit(dom)
    this.setup()
    this.loop()
  }
  domInit(dom) {
    if (typeof dom === 'string') {
      let mapDom = document.getElementById(dom);
      this.mapDom = mapDom.clientWidth;
    } else {
      this.mapDom = dom
    }
  }
  setup() {
    this.is = {
      isFoodNull: false, // 是否还有食物
      isGameOver: false,
      isCollide: false, // 是否碰撞
      isPause: false, //  是否暂停游戏
      isSnackSelf: false, // 是否蛇吃到自己
      isSnackFood: false, // 是否蛇吃到食物
      isMove: false,
    }
    // this.keyOn = new KeyOn()
    this.config = {
      w: this.mapDom || 400,
      h: this.mapDom || 400,
      speed: 1000 / 10, //
      speedPuaue: 30000, // 暂停的循环速度
      loopId: -5,
    }
    this.ele = []
    this.foodArr = []


    this.food = new Food(this)
    this.snack = new Snack(this)
  }

  update() {

    this.ele.forEach((obj) => {
      if (obj && typeof obj === 'object') {
        obj.update()
      }
    })

  }
  draw() {
    let mapHtml = ''
    this.ele.forEach((obj) => {
      if (obj && typeof obj === 'object') {
        obj.draw()
        mapHtml += obj.html
      }
    })
    // 一次写入所有html
    this.mapDom.innerHTML = mapHtml
  }


  loop() {
    if (this.loopId) {
      return false
    }
    this.loopId = setInterval(() => {
      if (this.isPause) {
        this.config.speed = this.config.speedPuaue // 毫秒 30秒
        return false
      }
      this.update()
      // this.draw()
    }, this.config.speed);
  }

}

