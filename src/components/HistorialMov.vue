<template>
    <div>
        <h1 class="h1">Historial de Movimientos</h1>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Cryptomoneda</th>
                        <th>Acción</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(transaccion, index) in historial" :key="index">
                        <td>{{ transaccion.crypto_code }}</td>
                        <td>{{ transaccion.action === "purchase" ? "Compra" : "Venta" }}</td>
                        <td>{{ transaccion.crypto_amount }}</td>
                        <td>$ {{ formatNumber(transaccion.money) }}</td>
                        <td>{{ getDateArgentina(transaccion.datetime) }}</td>
                        <td>
                            <div class="btn-group">
                                <button @click="readTransaction(transaccion._id)">Leer</button>
                                <button @click="editTransaction(transaccion._id)">Editar</button>
                                <button @click="deleteTransaction(transaccion._id)">Borrar</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="selectionTransaction">
            <h2>Detalle de la transacción seleccionada</h2>
            <p><strong>Id:</strong> {{ selectionTransaction._id }}</p>
            <p><strong>Cryptomoneda:</strong> {{ selectionTransaction.crypto_code }}</p>
            <p><strong>Accion:</strong> {{ selectionTransaction.action === "purchase" ? "Compra" : "Venta" }}</p>
            <p><strong>Cantidad:</strong> {{ selectionTransaction.crypto_amount }}</p>
            <p><strong>Precio:</strong> $ {{ formatNumber(selectionTransaction.money) }}</p>
            <p><strong>Fecha:</strong> {{ getDateArgentina(selectionTransaction.datetime) }}</p>
        </div>
        <div v-if="selectionTransaction && showEditForm" class="container mt-4">
            <h2>Editar transacción</h2>
            <form @submit.prevent="saveChanges">
                <div class="mb-3 row align-items-center justify-content-center">
                    <label for="cryptoCode" class="col-md-2 col-form-label">Cryptomoneda:</label>
                    <div class="col-md-2">
                        <input type="text" id="cryptoCode" v-model="editForm.crypto_code" disabled>
                    </div>
                </div>
                <div class="mb-3 row align-items-center justify-content-center">
                    <label for="action" class="col-md-2 col-form-label">Acción:</label>
                    <div class="col-md-2">
                        <input type="text" id="action" v-model="editForm.action" disabled>
                    </div>
                </div>
                <div class="mb-3 row align-items-center justify-content-center">
                    <label for="cryptoAmount" class="col-md-2 col-form-label">Cantidad:</label>
                    <div class="col-md-2">
                        <input type="number" id="cryptoAmount" v-model="editForm.crypto_amount">
                    </div>
                </div>
                <div class="mb-3 row align-items-center justify-content-center">
                    <label for="money" class="col-md-2 col-form-label">Precio:</label>
                    <div class="col-md-2">
                        <input type="number" id="money" v-model="editForm.money" step="any">
                    </div>
                </div>
                <div class="mb-3 row align-items-center justify-content-center">
                    <label for="datetime" class="col-md-2 col-form-label">Fecha:</label>
                    <div class="col-md-2">
                        <input type="text" id="datetime" :value="getDateArgentina(editForm.datetime)">
                    </div>
                </div>
                <div class="text-center">
                    <button type="submit">Guardar cambios</button>
                </div>
            </form>
        </div>
        
    </div>
</template>

<script>
import cryptoService from '@/services/cryptoService';

export default {
    name: "HistorialMov",
    data() {
        return {
            userId: this.$store.state.userName,
            historial: [],
            selectionTransaction: null,
            showEditForm: false,
            editForm: {
                _id: "",
                crypto_code: "",
                action: "",
                crypto_amount: 0,
                money: 0,
                datetime: ""
            }
        };
    },
    created() {
        this.getHistorial();
    },
    methods: {
        async getHistorial() {
            try {
                let transactions = await cryptoService.getTransactionsUser();
                transactions = transactions.sort((a, b) => new Date(b.datetime) - new Date(a.datetime)); // Ordenar por fecha descendente
                this.historial = transactions;
            } catch (err) {
                console.error("Error recuperando el historial de usuario", err);
            }
        },
        getDateArgentina(datetime) {
            const dateUTC = new Date(datetime);
            return dateUTC.toLocaleString('es-AR', {
                timeZone: 'America/Argentina/Buenos_Aires',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        },
        async readTransaction(id) {
            try {
                this.selectionTransaction = await cryptoService.readTransaction(id);
            } catch (error) {
                console.error('Error al leer la transaccion seleccionada', error);
            }
        },
        async editTransaction(id) {
            try {
                const transaccion = await cryptoService.readTransaction(id);
                this.showEditForm(transaccion);
            } catch (error) {
                console.error('Error al editar la transacción', error);
            }
        },
        showEditForm(transaccion) {
            this.selectionTransaction = transaccion;
            this.editForm = { ...transaccion };
            this.showEditForm = true;
        },
        async saveChanges() {
            try {
                await cryptoService.editTransaction(this.editForm._id, this.editForm);
                this.getHistorial();
                this.showEditForm = false;
            } catch (error) {
                console.error('Error al editar la transacción', error);
            }
        },
        async deleteTransaction(id) {
            try {
                await cryptoService.deleteTransaction(id);
                alert('Transaccion borrada con exito');
                this.getHistorial();
            } catch (error) {
                console.error('Error al borrar la transacción', error);
            }
        },
        currentState() {
            this.$router.push({ name: 'EstadoActual' });
        },
        formatNumber(value) {
            return value.toLocaleString('es-AR');
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

</style>
