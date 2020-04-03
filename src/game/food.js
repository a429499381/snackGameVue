import {Between} from './gx'
export class Food {
  constructor(map, num = 5) {
    this.setup(map, num)
    this.add(num)
  }
  setup(map, num) {
    this.map = map
    this.map.ele.push(this)
    this.foodArr =this.map.foodArr
    this.html = ''
    this.config = {
      w: 20,
      h: 20,
      foodNum: num ,
      name: 'food',
    }
  }
  update() {
    let con =this.config
    if(con.foodNum === 0) {
        let random = Between(3,6)
        this.config.foodNum = random
        this.add(random)
    }
  }

  draw() {
    let arr = this.foodArr
    let w = this.config.w
    let h = this.config.h
    this.html = ''
    //增加食物
    for (let i = 0; i < arr.length; i++) {
      if(arr[i]){
        this.html += '<div class="food" style="left:' + arr[i].x * w + 'px; top:' + arr[i].y * h + 'px' + '"' + '>' + '</div>';
      }
    }
  }

  add(num) {
    for (let index = 0; index < num; index++) {
      var ele = Object.assign({}, this.config)
      ele.name = `food${index}`
      ele.x = Between(0, this.map.config.w / ele.w - 1)
      ele.y = Between(0, this.map.config.h / ele.h - 1)
      // log('food ele add', ele)
      this.foodArr.push(ele)
    }
    // log('food add foodArr', this.foodArr)
  }
}
