<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 text-black">
          <li><router-link to="./PurchaseSale" class="nav-link px-2 text-black">Compra Venta</router-link></li>
          <li><router-link to="./HistorialMov" class="nav-link px-2 text-black">Historial de Movimientos</router-link></li>
          <li><router-link to="./ActualState" class="nav-link px-2 text-black">Estado actual</router-link></li>
          <li><router-link to="./InvestAnalysis" class="nav-link px-2 text-black">Analisis de Inversiones</router-link></li>
        </ul>        
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "BarraNav",
};
</script>

<style scoped>

img {
  height: 1.5em;
  width: 1.5em;
  border: 2px solid #00FF00; 
  background-color: #333; 
}
.nav-link {
    color: #00FF00; 
}
</style>
