<template>
  <div class="tablas">
    <div class="titulo d-flex justify-content-center align-items-center flex-column">
      <h2>VALOR DE LAS CRIPTOMONEDAS</h2>
      <span class="username">{{ $store.state.userName }}</span>
    </div>

    <div class="row d-flex flex-wrap justify-content-center">
      <div class="col-md-4">
        <div class="card bg-dark text-light mb-3">
          <div class="card-header encabezado">
            <h5 class="card-title d-inline">BITCOIN</h5>
          </div>
          <div class="card-body">
            <div v-for="exchangeBtc of exchangesBtc" :key="exchangeBtc.id">
              <p class="card-text">Precio de Compra: AR$ {{ Number(exchangeBtc.ask).toLocaleString() }}</p>
              <p class="card-text">Precio de Venta: AR$ {{ Number(exchangeBtc.bid).toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card bg-dark text-light mb-3">
          <div class="card-header encabezado">
            <h5 class="card-title d-inline">ETHEREUM</h5>
          </div>
          <div class="card-body">
            <div v-for="exchangeEth of exchangesEth" :key="exchangeEth.id">
              <p class="card-text">Precio de Compra: AR$ {{ Number(exchangeEth.ask).toLocaleString() }}</p>
              <p class="card-text">Precio de Venta: AR$ {{ Number(exchangeEth.bid).toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card bg-dark text-light mb-3">
          <div class="card-header encabezado">
            <h5 class="card-title d-inline">TETHER (USDT)</h5>
          </div>
          <div class="card-body">
            <div v-for="exchangeUsdt of exchangesUsdt" :key="exchangeUsdt.id">
              <p class="card-text">Precio de Compra: AR$ {{ Number(exchangeUsdt.ask).toLocaleString() }}</p>
              <p class="card-text">Precio de Venta: AR$ {{ Number(exchangeUsdt.bid).toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PrintPrincipal",
  data() {
    return {
      exchangesBtc: null,
      exchangesEth: null,
      exchangesUsdt: null,
    };
  },
  async mounted() {
    const optionsBtc = {
      method: 'GET',
      url: 'https://criptoya.com/api/btc/ars/0.1',
    };

    axios.request(optionsBtc).then(response => {
      const firstExchangeBtc = Object.keys(response.data)[1];

      if (firstExchangeBtc) {
        this.exchangesBtc = [{
          exchangeBtc: firstExchangeBtc,
          bid: response.data[firstExchangeBtc].totalBid,
          ask: response.data[firstExchangeBtc].totalAsk
        }];
      }
    });

    const optionsEth = {
      method: 'GET',
      url: 'https://criptoya.com/api/Eth/ars/0.1',
    };

    axios.request(optionsEth).then(response => {
      const firstExchangeEth = Object.keys(response.data)[1];

      if (firstExchangeEth) {
        this.exchangesEth = [{
          exchangeEth: firstExchangeEth,
          bid: response.data[firstExchangeEth].totalBid,
          ask: response.data[firstExchangeEth].totalAsk,
        }];
      }
    });

    const optionsUsdt = {
      method: 'GET',
      url: 'https://criptoya.com/api/Usdt/ars/0.1',
    };

    axios.request(optionsUsdt).then(response => {
      const firstExchangeUsdt = Object.keys(response.data)[1];
      if (firstExchangeUsdt) {
        this.exchangesUsdt = [{
          exchangeUsdt: firstExchangeUsdt,
          bid: response.data[firstExchangeUsdt].totalBid,
          ask: response.data[firstExchangeUsdt].totalAsk
        }];
      }
    });
  }
};


</script>

<style scoped>
.titulo {
  padding: 20px 10px;
  margin: 20px 15px;
  text-align: center;
  border: 2px solid #006400;  
  color: #333; 
  background-color: #006400; 
  border-radius: 10px;
  display: flex;
  align-items: center;
  
}
h2 {
  margin: 0;
  flex-grow: 1; 
  text-align: center;
  
}
.username {
  color: #00FF00; 
  font-size: 1.2em;
}
.card-title {
  color: #00FF00; 
}

.card {
  border: 2px solid #00FF00; 
  border-radius: 10px;
}

.card-header {
  background-color: #006400;
  border-bottom: 2px solid #00FF00; 
}

.card-body {
  background-color: #333; 
}

.card-text {
  color: #FFF; 
}

.row {
  margin: 0;
  padding: 0;
}

.mb-3 {
  margin-bottom: 1rem !important;
}

</style>
