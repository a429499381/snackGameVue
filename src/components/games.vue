<template>
  <div id="body">
    <div id="snack" v-for="(obj, index) in snackArr" :key="index">
      <div :num="index" class="snack" v-bind:style="{left: obj.x, top: obj.y}">{{index}}</div>
    </div>
    <div id="foodArr" v-for="(obj, index) in foodArr" :key="index">
      <div class="food" v-bind:style="{left: obj.x, top: obj.y}">{{index}}</div>
    </div>
    <div>{{game.food}}</div>
  </div>
</template>

<script>
// import {__main} from '../actions/main.js';
import {SnackGame} from '../actions/snackGame';
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
      game: '',
    };
  },
  mounted: function() {
      this.game = new SnackGame('xutao')
  
      console.log('this.game', this.$el)
      console.log('this.game', this.game)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#body {
  position: relative;
  width: 20px;
  height: 20px;
}
.snack {
  background-color: rgb(228, 60, 60);
}
.food {
  background-color: rgb(66, 65, 65);
}
</style>
