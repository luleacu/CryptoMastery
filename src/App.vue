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
  border: 2px solid rgb(0, 100, 0); /* Borde verde oscuro */
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.7) inset; /* Sombra negra */
  padding: 10px;
  color: rgb(0, 100, 0); /* Verde oscuro */
  text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.195); /* Sombra blanca */
}

nav {
  padding: 100px;
}

nav a {
  font-weight: bold;
  color: black; /* Color negro */
}

nav a.router-link-exact-active {
  color: rgb(1, 111, 1); /* Verde oscuro */
}
</style>
