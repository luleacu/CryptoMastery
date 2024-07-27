<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mb-3">
        <label class="form-label">Moneda que desea comprar</label>
        <select v-model.trim="purchaseType" class="form-select" required>
          <option disabled selected value="">Seleccione una moneda</option>
          <option>Bitcoin (BTC)</option>
          <option>Ethereum (ETH)</option>
          <option>Tether (USDT)</option>
        </select>
        <label class="form-label">Seleccione la cantidad que desea comprar</label>
        <input
          type="text"
          v-model.number="cryptoAmountCompra"
          class="form-control"
          @input="validateDecimal($event, 'cryptoAmountCompra')"
        />
        <button
          type="button"
          class="btn btn-primary mt-2"
          @click="makePurchase"
        >
          Compra
        </button>
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label">Moneda que desea vender</label>
        <select v-model.trim="saleType" class="form-select" required>
          <option disabled selected value="">Seleccione una moneda</option>
          <option>Bitcoin (BTC)</option>
          <option>Ethereum (ETH)</option>
          <option>Tether (USDT)</option>
        </select>
        <label class="form-label">Seleccione la cantidad que desea vender</label>
        <input
          type="text"
          v-model.number="cryptoAmountVenta"
          class="form-control"
          @input="validateDecimal($event, 'cryptoAmountVenta')"
        />
        <button
          type="button"
          class="btn btn-outline-primary mt-2"
          @click="checkMakeSale"
        >
          Venta
        </button>
      </div>
    </div>
    
    <div class="row mt-4">
      <div class="col-12 mb-3">
        <div class="card text-light">
          <div class="card-body">
            <h3 class="card-title">{{ action }}</h3>
            <ul class="list-group list-group-flush text-dark">
              <li class="list-group-item">
                La cantidad {{ action }} de: {{ cryptoCode }} es: {{
                action === 'compra' ? cryptoAmountCompra : cryptoAmountVenta }}
              </li>
              <li class="list-group-item">
                El total pagado es: $
                {{
                action === 'compra'
                  ? totalAsk * cryptoAmountCompra
                  : totalBid * cryptoAmountVenta
                }}
              </li>
              <li class="list-group-item">Fecha {{ dateFormat() }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cryptoService from "../services/cryptoService";

export default {
  name: "PurchaseSale",
  data() {
    return {
      purchaseType: "",
      saleType: "",
      userId: this.$store.state.userName,
      action: "",
      cryptoCode: "",
      cryptoAmountCompra: 0,
      cryptoAmountVenta: 0,
      totalAsk: 0,
      totalBid: 0,
      cryptos: {
        "Bitcoin (BTC)": "BTC",
        "Ethereum (ETH)": "ETH",
        "Tether (USDT)": "USDT",
      },
    };
  },
  methods: {
    async makePurchase() {
      try {
        this.action = "compra";
        this.cryptoCode = this.cryptos[this.purchaseType];
        this.totalAsk = await cryptoService.getCryptoInfo(
          this.cryptoCode,
          "compra"
        );
        const body = {
          user_id: this.userId,
          action: "purchase",
          crypto_code: this.cryptoCode,
          crypto_amount: parseFloat(this.cryptoAmountCompra),
          money: this.totalAsk * parseFloat(this.cryptoAmountCompra),
          datetime: Date.now(),
        };
        await cryptoService.makePurchase(body);
        alert("Compra realizada con éxito");
      } catch (error) {
        console.error("Error al realizar la compra", error);
        alert("Error al realizar la compra");
      }
    },

    async checkMakeSale() {
      const disponible = await this.checkAvailability();
      if (disponible) {
        await this.makeSale();
      } else {
        alert("No hay suficiente cantidad para vender");
      }
    },

    async makeSale() {
      try {
        this.action = "venta";
        this.cryptoCode = this.cryptos[this.saleType];
        this.totalBid = await cryptoService.getCryptoInfo(
          this.cryptoCode,
          "venta"
        );
        const body = {
          user_id: this.userId,
          action: "sale",
          crypto_code: this.cryptoCode,
          crypto_amount: parseFloat(this.cryptoAmountVenta),
          money: this.totalBid * parseFloat(this.cryptoAmountVenta),
          datetime: Date.now(),
        };
        await cryptoService.makeSale(body);
        alert("Venta realizada con éxito");
      } catch (error) {
        console.error("Error al realizar la venta", error);
        alert("Error al realizar la venta");
      }
    },

    async checkAvailability() {
      try {
        const transactions = await cryptoService.getTransactionsUser();
        const compras = transactions.filter(
          (trans) =>
            trans.action === "purchase" &&
            trans.crypto_code === this.cryptos[this.saleType]
        );
        const ventas = transactions.filter(
          (trans) =>
            trans.action === "sale" &&
            trans.crypto_code === this.cryptos[this.saleType]
        );

        const cantidadComprada = compras.reduce(
          (total, trans) => total + parseFloat(trans.crypto_amount),
          0
        );
        const cantidadVendida = ventas.reduce(
          (total, trans) => total + parseFloat(trans.crypto_amount),
          0
        );

        const cantidadDisponible = cantidadComprada - cantidadVendida;

        return cantidadDisponible >= parseFloat(this.cryptoAmountVenta);
      } catch (error) {
        console.error("Error al verificar disponibilidad", error);
        return false;
      }
    },

    dateFormat() {
      const currentDate = new Date();

      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const year = currentDate.getFullYear().toString();

      const hours = currentDate.getHours().toString().padStart(2, "0");
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");

      const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;

      return formattedDateTime;
    },

    validateDecimal(event, field) {
      const value = event.target.value;
      const decimalRegex = /^\d*\.?\d*$/;

      if (!decimalRegex.test(value)) {
        this[field] = value.slice(0, -1);
      } else {
        this[field] = value;
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.form-label {
  color: #00ff00; 
  font-weight: bold;
}

.form-select,
.form-control {
  border: 2px solid #00ff00; 
  background-color: #333; 
  color: #fff; 
  border-radius: 10px;
  padding: 5px 10px;
}

.btn-primary {
  background-color: #006400; 
  border: none;
  color: #fff; 
  font-weight: bold;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #00ff00; 
  color: #000; 
}

.btn-outline-primary {
  border: 2px solid #00ff00; 
  color: #00ff00; 
  background-color: transparent;
  border-radius: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-outline-primary:hover {
  background-color: #00ff00; 
  color: #000; 
}

.card {
  background-color: #006400; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  color: #00ff00; 
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.list-group-item {
  background-color: #333; 
  color: #fff; 
}
</style>
