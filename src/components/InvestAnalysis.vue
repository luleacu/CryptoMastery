<template>
    <div>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Criptomoneda</th>
                        <th>Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(balance, index) in balances" :key="index">
                        <td>{{ balance.crypto_code }}</td>
                        <td :class="{ 'text-success': balance.importeResultante >= 0, 'text-danger': balance.importeResultante < 0 }">
                            $ {{ formatNumber(balance.importeResultante.toFixed(2)) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import cryptoService from '@/services/cryptoService';

export default {
    name: "InvestAnalysis",
    data() {
        return {
            userId: this.$store.state.userName,
            balances: [],
        };
    },
    async created() {
        await this.getAnalisis();
    },
    methods: {
        async getAnalisis() {
            try {
                const historial = await cryptoService.getTransactionsUser();
                const balancesMap = this.calculateBalances(historial);
                const balances = await this.calculateResults(balancesMap);
                this.balances = balances;
            } catch (error) {
                console.error("Error recuperando el historial de usuario", error);
            }
        },
        calculateBalances(historial) {
            const balancesMap = new Map();

            historial.forEach(transaction => {
                const { crypto_code, action, crypto_amount, money } = transaction;
                const parsedAmount = parseFloat(crypto_amount);
                const parsedMoney = parseFloat(money);

                if (!balancesMap.has(crypto_code)) {
                    balancesMap.set(crypto_code, {
                        crypto_code,
                        disponibilidad: 0,
                        totalCompras: 0,
                        totalVentas: 0,
                        totalMoneyCompras: 0,
                        totalMoneyVentas: 0,
                        precioActual: 0,
                        importeResultante: 0
                    });
                }

                const balance = balancesMap.get(crypto_code);
                if (action === 'purchase') {
                    balance.totalCompras += parsedAmount;
                    balance.totalMoneyCompras += parsedMoney;
                } else if (action === 'sale') {
                    balance.totalVentas += parsedAmount;
                    balance.totalMoneyVentas += parsedMoney;
                }
            });

            return balancesMap;
        },
        async calculateResults(balancesMap) {
            const balances = [];
            for (const [crypto_code, balance] of balancesMap) {
                const precio = await this.getCryptoInfo(crypto_code, 'venta');
                const disponibilidad = balance.totalCompras - balance.totalVentas;
                const importeResultante = balance.totalMoneyVentas + disponibilidad * precio - balance.totalMoneyCompras;
                balances.push({
                    ...balance,
                    disponibilidad,
                    precioActual: precio * disponibilidad,
                    importeResultante
                });
            }
            return balances;
        },
        async getCryptoInfo(crypto_code, action) {
            try {
                const response = await cryptoService.getCryptoInfo(crypto_code, action);
                return parseFloat(response);
            } catch (error) {
                console.error('Error al obtener información de la criptomoneda:', error);
                throw error;
            }
        },
        formatNumber(value) {
            return new Intl.NumberFormat('es-AR').format(value);
        }
    },
};
</script>

<style scoped>

h2 {
    color: #00FF00; 
    font-size: xx-large;
}
</style>
