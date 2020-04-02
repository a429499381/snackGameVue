<template>
  <div id="body">
    <div id="snack" v-for="(obj, index) in snackArr" :key="'00' + index">
      <div
        :num="index"
        class="snack"
        v-bind:style="{left: obj.x * num + 'px', top: obj.y  * num + 'px'}"
      >{{index}}</div>
    </div>
    <div id="foodArr" v-for="(obj, index) in foodArr" :key="'01' +index">
      <div class="food" :num='index' v-bind:style="{left: obj.x * num + 'px', top: obj.y * num + 'px'}">{{index}}</div>
    </div>
    <!-- <div>{{game.food}}</div> -->
  </div>
</template>

<script>
// import {__main} from '../actions/main.js';
import { SnackGame } from "../actions/snackGame";
// import {Game} from '../actions/cs';
export default {
  name: "games",
  props: {
    msg: String
  },
  data() {
    return {
      snackArr: [1],
      foodArr: [],
      num: 20
    };
  },
  mounted: function() {
    this.game = new SnackGame("xutao");
    this.foodArr = this.game.food.foodArr;
    this.snackArr = this.game.snack.snackArr;

    console.log("this.game $el", this.$el.children);
    console.log("this.game", this.game);
  }
};
</script>

// <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#body {
  position: relative;
  width: 20px;
  height: 20px;
}
.snack {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: rgb(228, 60, 60);
}
.food {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: rgb(66, 65, 65);
}
</style>
