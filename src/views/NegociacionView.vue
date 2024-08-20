<template>
    <div class="negociacion">
     <PrintPrincipal/>
     <PurchaseSale />
    <h1>{{ this.$store.state.userEmail }}</h1>
     
    </div>
  </template>
  
  <script> 
 
import PrintPrincipal from "@/components/PrintPrincipal.vue";
import PurchaseSale from "@/components/PurchaseSale.vue";
  
  
  export default {
    name: 'NegociacionView',
    components: {
    
    PrintPrincipal,
    PurchaseSale
}
  }
  </script>