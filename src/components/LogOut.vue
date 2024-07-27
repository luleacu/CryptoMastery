<template>
    <div>
      <button @click="signOff" class="btn btn-danger" :disabled="!isUsuarioLoggedIn">
        Cerrar Sesión
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "LogOut",
    computed: {
      isUsuarioLoggedIn() {
        return this.$store.state.userName !== "";
      },
    },
    methods: {
      signOff() {
        if (this.isUsuarioLoggedIn) {
          this.$store.commit("setuserName", "");
          console.log("Usuario ha cerrado sesión");
          this.$router.push("/LogIn");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .btn-danger {
    background-color: #ff0000;
    border-color: #ff0000;
    color: white;
  }
  
  .btn-danger:disabled {
    background-color: #cccccc;
    border-color: #cccccc;
    color: #666666;
  }
  </style>
  