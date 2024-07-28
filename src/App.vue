<template>
  <div id="app">
    <div id="nav">
      
      <router-link to="/">Inicio</router-link>
      </div>
      <BarraNav/>
    <router-view />

  </div>
</template>

<script>

import BarraNav from './components/BarraNav.vue';
export default {
  name: 'App',
  components: {
    BarraNav
  },

  methods: {
    logout() {
      this.$store.commit("logout")
    }
  },
  mounted() {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000; 
}
body{
  background: linear-gradient(#8e8a90);
}

.h1 {
  text-align: center;
  border: 2px solid rgb(2, 136, 2); 
  box-shadow: 0px 0px 10px 0px rgb(161, 255, 161) inset; 
  padding: 10px;
  color: rgb(0, 100, 0); 
  
}

nav {
  padding: 100px;
}

nav a {
  font-weight: bold;
  color: black; 
}

nav a.router-link-exact-active {
  color: rgb(1, 111, 1); 
}
</style>
