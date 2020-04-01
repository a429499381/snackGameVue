<template>
  <div id="App">
      <games>
      </games>
  </div>
</template>

<script>
import games from './components/games.vue'

export default {
  name: 'App',
  components: {
    games,
  }
}
</script>

<style>
#App {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 400px;
  height: 400px;
  border: 1px solid #000;
  position: absolute;
}
</style>
