import {Food} from './food'
import {Snack} from './snack'
import {Reg} from './reg';

export class SnackGame {
  constructor(el) {
    this.el = el
    this.setup()
    this.loop()
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
      w: '',
      h: '',
      speed: 1000/10, //
      speedPuaue: 30000, // 暂停的循环速度
      loopId: -5,
    }
    this.ele = []
    this.foodArr = []

    this.reg = new Reg()
    this.on = this.reg.register
    this.food = new Food()
    this.snack = new Snack(this)
    this.ele.push(this.food)
    this.ele.push(this.snack)
  }

  update() {

    this.ele.forEach((obj) => {
      if (obj && typeof obj === 'object') {
        obj.update()  
      }
    })

  }
 

  loop() {
    if(this.loopId ) {
      return false
    }
  this.loopId = setInterval(() => {
      if(this.isPause){
        this.config.speed = this.config.speedPuaue // 毫秒 30秒
        return false
      }
      this.update()
    }, this.config.speed);
  }

}

