<template>
    <div>
        <h1 class="h1">Estado Actual</h1>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Criptomoneda</th>
                        <th>Cantidad</th>
                        <th>Valor en ARS$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(balance, index) in balances" :key="index">
                        <td>{{ balance.crypto_code }}</td>
                        <td>{{ balance.crypto_amount.toFixed(2) }}</td>
                        <td>$ {{ formatNumber(balance.money.toFixed(2)) }}</td>
                    </tr>
                    <tr>
                        <td colspan="2">Total Dinero en ARS$</td>
                        <td>$ {{ formatNumber(totalMoney) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import cryptoService from '@/services/cryptoService';

export default {
    name: "EstadoActual",
    data() {
        return {
            userId: this.$store.state.userName,
            balances: [],
        }
    },
    created() {
        this.getCurrentStatus();
    },
    computed: {
        totalMoney() {
            return this.balances.reduce((total, balance) => total + balance.money, 0).toFixed(2);
        }
    },
    methods: {
        async getCurrentStatus() {
            try {
                const historial = await cryptoService.getTransactionsUser();
                const balancesMap = new Map();

                historial.forEach(transaction => {
                    const amount = parseFloat(transaction.crypto_amount);
                    if (transaction.action === 'purchase') {
                        balancesMap.set(transaction.crypto_code, (balancesMap.get(transaction.crypto_code) || 0) + amount);
                    } else if (transaction.action === 'sale') {
                        balancesMap.set(transaction.crypto_code, (balancesMap.get(transaction.crypto_code) || 0) - amount);
                    }
                });

                const balances = await Promise.all(Array.from(balancesMap.entries()).map(async ([crypto_code, crypto_amount]) => {
                    const precio = await this.getCryptoInfo(crypto_code, 'venta');
                    const money = crypto_amount * parseFloat(precio);
                    return { crypto_code, crypto_amount, money };
                }));

                this.balances = balances;
            } catch (error) {
                console.error("Error recuperando el historial de usuario", error);
            }
        },
        async getCryptoInfo(crypto, action) {
            try {
                return await cryptoService.getCryptoInfo(crypto, action);
            } catch (error) {
                console.error('Error al obtener información de la criptomoneda:', error);
                throw error;
            }
        },
        formatNumber(value) {
            return new Intl.NumberFormat('es-AR').format(value);
        }
    }
};
</script>

<style scoped>

h1,
h2 {
    color: #00FF00; 
    font-size: xx-large;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7); 
}
.table-dark {
    background-color: #333; 
}
</style>
