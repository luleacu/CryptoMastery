<template>
  <div>
    <div class="form-registro m-auto mb-3">
      <form @submit.prevent="createUser">
        <h1 class="h1">REGISTRO</h1>
        <div class="form-floating">
          <input
            type="text"
            class="form-control mb3"
            id="userName"
            name="userName"
            v-model="userName"
            placeholder="Ingrese su usuario"
            :class="{ 'invalid-usuario': !isUsuarioValid }"
          />
          <label for="floatingInput">Ingrese su usuario</label>
        </div>
        <p v-if="!isUsuarioValid && userName !== ''" class="text-danger">
          El nombre de usuario no es válido. Debe tener al menos 10 caracteres y contener al menos una letra y un número</p>
        <br /><br />
        <button 
          type="submit" 
          class="btn btn-light" 
          :class="{ 'btn-success': isUsuarioLoggedOut }"
        >
          Ingresar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  data() {
    return {
      userName: "",
    };
  },
  computed: {
    isUsuarioValid() {
      const usuario = this.userName;
      return (
        usuario.length >= 10 &&
        /[a-zA-Z]/.test(usuario) &&
        /\d/.test(usuario)
      );
    },
    isUsuarioLoggedOut() {
      return this.$store.state.userName === "";
    },
  },
  methods: {
    createUser() {
      if (this.isUsuarioValid) {
        this.$store.commit("setuserName", this.userName);
        console.log("Usuario guardado en el store:", this.$store.state.userName);
        this.$router.push("/PurchaseSale");
      }
    },
  },
};
</script>

<style scoped>
.btn-success {
  background-color: #28a745 !important;
  border-color: #28a745 !important;
  color: white;
}

h1,
h2 {
  color: #00FF00; 
  font-size: xx-large;  
}
</style>
