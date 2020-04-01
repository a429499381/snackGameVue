<template>
  <div id='body'>
    <div id="snack" v-for="(obj, index) in snackArr" :key="index">
          <div class='snack'  v-bind:style='{left: obj.x, top: obj.y}'>{{index}}</div>
    </div>
    <div id="foodArr" v-for="(obj, index) in foodArr" :key="index">
          <div class="food"  v-bind:style='{left: obj.x, top: obj.y}'>{{index}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "games",
  props: {
    msg: String
  },
  data() {
    return {
      snackArr: [1,2,3,4,5],
      foodArr: [1,2,4,5,6],
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#body {
  position: relative;
  width: 20px;
  height: 20px;
}
#snack, .snack {

  background-color: rgb(228, 60, 60);
}
.food {
  background-color: rgb(66, 65, 65);
}
</style>
