<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <ul class="nav d-flex w-100 justify-content-between mb-2 mb-md-0 text-black">
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
.navbar {
  margin-bottom: 50px;
  
}
.nav-link {
  color: #00a300;
  transition: color 0.3s ease;
  border: 2px solid #00FF00;
  border-radius: 10%; 
  padding: 15px 150px; 
  background-color: #333;
  
}

.nav-link:hover {
  color: #0a7a24; 
}
.router-link-active {
  color: #fff; 
}
</style>
