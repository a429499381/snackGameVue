import {Between, log} from './gx'
import {collide} from './check/collide'
import {Reg} from './event/reg'
export class Snack {
  constructor(map, num = 4) {
    this.setup(map)
    this.addSnack(num)
    this.reg()
  }
  setup(map) {
    this.map = map
    this.map.ele.push(this)
    this.snackArr = []
    this.html = ''
    this.config = {
      name: 'snack',
      w: 20,
      h: 20,
      dir: { x: 0, y: 0, off: { x: -1, y: 0, }, up: { x: 1, y: 0 } },
    }
    this.autoMoveNum = 0
    this.autoMoveSpeed = 1
    this.is = this.map.is
    
     this.regOn = new Reg()
     this.on = this.regOn.register
  }

  update() {

    if (this.is.isMove) {
      this.is.isMove = false
      this.move()
      this.isSelf()
    } else {
      // log('autoMove')
      this.autoMove()
      this.isSelf()
    }
    if (this.is.isSnackSelf) {
      this.is.isSnackSelf = false
      this.is.isGameOver = true
      log('mapDom is', this.map.is)
      log('吃到自己啦')
    }
    this.collideArr(this.snackArr[this.snackArr.length - 1], this.map.foodArr)
    if (this.is.isSnackFood) {
      this.is.isSnackFood = false
      // 食物数量减少    
      this.map.food.config.foodNum -= 1
      this.sortArr(this.map.foodArr.index)
      this.addBody()
    }

  }

  draw() {
    this.html = '';
    let arr = this.snackArr
    let w = this.config.w
    let h = this.config.h
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        this.html += '<div class="snackBody" style="left:' + arr[i].x * w + 'px; top:' + arr[i].y * h + 'px' + '"' + '>' + '</div>';
      }
    }
  }

  autoMove() {
    this.autoMoveNum += 1
    if (this.autoMoveNum > this.autoMoveSpeed) {
      this.autoMoveNum = 0

      let dir = this.config.dir
      let off = dir.off
      // 检查禁止移动的方向, 反方向移动
      if (off.x !== 0) {
        if (off.x === 1) {
          dir.x = -1
          dir.y = 0
        } else {
          dir.x = 1
          dir.y = 0
        }
      }

      if (off.y !== 0) {
        if (off.y === 1) {
          dir.x = 0
          dir.y = -1
        } else {
          dir.x = 0
          dir.y = 1
        }
      }

      this.move()
    }
  }
  isSelf() {
    let head = this.snackArr[this.snackArr.length - 1] // 头
    let body = this.snackArr
    for (let i = 0; i < body.length - 2; i++) {
      let res = collide(head, body[i])
      if (res) {
        log(head.x, head.y, 'or ', body[i].x, body[i].y)
        this.is.isSnackSelf = true
        return true
      }
    }
  }

  move() {
    let dir = this.config.dir
    let arr = this.snackArr
    // 链式移动
    let long = arr.length - 1;
    let res = this.check(arr[long].x + dir.x, arr[long].y + dir.y)
    //是否到了边界
    if (!res) {
      return false
    }
    //使蛇后一节坐标等于前一节
    for (let i = 0; i < long; i++) {
      arr[i].x = arr[i + 1].x
      arr[i].y = arr[i + 1].y
    }
    //蛇头
    arr[long].x += dir.x;
    arr[long].y += dir.y;

    dir.x = 0
    dir.y = 0
  }
  // 边界检查
  check(x, y) {
    let w = this.map.config.w / this.config.w
    let h = this.map.config.h / this.config.h
    if (x < 0 || x >= w) {
      return false
    }
    if (y < 0 || y >= h) {
      return false
    }

    return true
  }

  reg() {
    //                 ArrowUp
    // 2on.js:17 keyup ArrowDown
    // 2on.js:17 keyup ArrowLeft
    // 2on.js:17 keyup ArrowRight
    let dir = this.config.dir
    let off = dir.off
    this.on('Space', () => {
      this.autoMoveSpeed += 1
      // log('speed', this.autoMoveSpeed)
    })
    this.on('ArrowLeft', () => {
      if (off.x === -1) {
        return false
      }
      //增加身体 临时测试
      // this.addBody()
      this.is.isMove = true
      dir.x = -1
      dir.y = 0
      dir.up.x = dir.x
      dir.up.y = dir.y

      // 要关闭的方向
      off.x = 1
      off.y = 0
    })
    this.on('ArrowRight', () => {
      if (off.x === 1) {
        return false
      }
      dir.x = 1
      dir.y = 0
      dir.up.x = dir.x
      dir.up.y = dir.y
      // 要关闭的方向
      off.x = -1
      off.y = 0
      this.is.isMove = true
    })
    this.on('ArrowUp', () => {
      if (off.y === -1) {
        return false
      }

      this.is.isMove = true
      dir.x = 0
      dir.y = -1
      dir.up.x = dir.x
      dir.up.y = dir.y

      // 要关闭的方向
      off.x = 0
      off.y = 1
    })
    this.on('ArrowDown', () => {
      if (off.y === 1) {
        return false
      }

      this.is.isMove = true
      dir.x = 0
      dir.y = 1
      dir.up.x = dir.x
      dir.up.y = dir.y

      // 要关闭的方向
      off.x = 0
      off.y = -1
    })
  }

  collideArr(snack, food) {
    let res = false

    food.forEach((obj, index) => {
      res = collide(snack, obj)
      if (res) {
        this.is.isSnackFood = true
        food.index = index
        return true
      }
    });
  }

  sortArr(index) {
    let food = this.map.foodArr
    // let name = ''

    for (let i = index; i < food.length - 1; i++) {
      food[i] = food[i + 1]
    }
    food.pop()
    food.index = -5
  }

  addBody() {
    let body = Object.assign({}, this.snackArr[0])
    body.num -= 1
    body.name = `snack${body.num}`
    body.x -= 1 // x轴后退一步
    this.snackArr.unshift(body)
  }
  addSnack(num) {
    let tempX = Between(2, this.map.config.w / this.config.w - num)
    let tempy = Between(2, this.map.config.h / this.config.h - num)
    for (let index = 0; index < num; index++) {      // var ele = Object.assign({}, this.config)
      var ele = {}
      ele.name = `snack${index}`
      ele.num = index
      ele.x = (tempX + index)
      ele.y = tempy
      this.snackArr.push(ele)
    }
    Object.assign(this.snackArr[num - 1], this.config)
    this.snackArr[num - 1].name = 'head'
    
    // this.snackArr[this.snackArr.length -1].name = 'head'
    // log('this.snackArr', this.snackArr)
  }
}