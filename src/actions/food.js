// import {Between} from '../actions/main'
import {Between} from './main'
export class Food {
  constructor(map) {
    this.map = map
    this.setup()
    this.add(5)
  }
  setup() {
    // this.map.ele.push(this)
  
    // this.foodArr =this.map.foodArr
    this.html = ''
    this.foodArr = []
    this.config = {
      w: 20,
      h: 20,
      name: 'food',
    }
    console.count()
  }
  // update() {
  //   let con =this.config
  //   if(con.foodNum === 0) {
  //       let random = Between(3,6)
  //       this.config.foodNum = random
  //       this.add(random)
  //   }
  // }

  // draw() {
  //   let arr = this.foodArr
  //   let w = this.config.w
  //   let h = this.config.h
  //   this.html = ''
  //   //增加食物
  //   for (let i = 0; i < arr.length; i++) {
  //     if(arr[i]){
  //       this.html += '<div class="food" style="left:' + arr[i].x * w + 'px; top:' + arr[i].y * h + 'px' + '"' + '>' + '</div>';
  //     }
  //   }
  // }

  add(num) {
    for (let index = 0; index < num; index++) {
      var ele = Object.assign({}, this.config)
      ele.name = `food${index}`
      ele.x = Between(0, 20)
      ele.y = Between(0, 20)
      // log('food ele add', ele)
      this.foodArr.push(ele)
    }
    // log('food add foodArr', this.foodArr)
  }
}
