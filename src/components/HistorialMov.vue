<template>
    <div>
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

        <div v-if="showEditForm" class="modal-overlay">
            <div class="modal-container">
                <div class="modal-header">
                    <h2>Editar transacción</h2>
                    <button class="close-button" @click="closeEditForm">X</button>
                </div>
                <form @submit.prevent="saveChanges">
                    <div class="modal-body">
                        <div class="mb-3 row align-items-center justify-content-center">
                            <label for="cryptoCode" class="col-md-4 col-form-label">Cryptomoneda:</label>
                            <div class="col-md-6">
                                <input type="text" id="cryptoCode" v-model="editForm.crypto_code" disabled>
                            </div>
                        </div>
                        <div class="mb-3 row align-items-center justify-content-center">
                            <label for="action" class="col-md-4 col-form-label">Acción:</label>
                            <div class="col-md-6">
                                <input type="text" id="action" v-model="editForm.action" disabled>
                            </div>
                        </div>
                        <div class="mb-3 row align-items-center justify-content-center">
                            <label for="cryptoAmount" class="col-md-4 col-form-label">Cantidad:</label>
                            <div class="col-md-6">
                                <input type="number" id="cryptoAmount" v-model="editForm.crypto_amount">
                            </div>
                        </div>
                        <div class="mb-3 row align-items-center justify-content-center">
                            <label for="money" class="col-md-4 col-form-label">Precio:</label>
                            <div class="col-md-6">
                                <input type="number" id="money" v-model="editForm.money" step="any">
                            </div>
                        </div>
                        <div class="mb-3 row align-items-center justify-content-center">
                            <label for="datetime" class="col-md-4 col-form-label">Fecha:</label>
                            <div class="col-md-6">
                                <input type="text" id="datetime" :value="getDateArgentina(editForm.datetime)">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer text-center">
                        <button type="submit">Guardar cambios</button>
                    </div>
                </form>
            </div>
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
                this.selectionTransaction = transaccion;
                this.editForm = { ...transaccion };
                this.showEditForm = true;
            } catch (error) {
                console.error('Error al editar la transacción', error);
            }
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
        closeEditForm() {
            this.showEditForm = false;
        },
        formatNumber(value) {
            return value.toLocaleString('es-AR');
        }
    }
};
</script>

<style scoped>
 h2 {
    color: #00FF00; 
    font-size: xx-large;    
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-container {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 500px;
    max-width: 90%;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.modal-header h2 {
    margin: 0;
}

.close-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.modal-body {
    margin-bottom: 20px;
}

.modal-footer {
    text-align: center;
}
</style>