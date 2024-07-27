import store from "@/store";
import axios from "axios";


const BASE_URL = 'https://criptoya.com/api/buenbit/';
const URL_base = 'https://laboratorio3-5459.restdb.io/rest/transactions';
const apiKey = '64a57c2b86d8c50fe6ed8fa5';
export default {
    async getCryptoInfo(crypto, action) {
        try {
            const response = await axios.get(`${BASE_URL}${crypto.toLowerCase()}/ars/0.1`);
            return action === 'compra' ? response.data.totalAsk : response.data.totalBid;
        } catch (error) {
            console.error('Error al traer la info de crypto :', error);
            throw error;
        }
    },
    async makePurchase(body) {
        try {
            const response = await axios.post(
                URL_base,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-apikey': apiKey,
                    },
                }
            );
            console.log('Response', response.data)
            return response.data;
        } catch (error) {
            console.error('Error al realizar compra', error);
            throw error;
        }
    },
    async makeSale(body) {
        try {
            const response = await axios.post(
                URL_base,
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-apikey': apiKey,
                    },
                }
            );
            console.log('Response', response.data)
            return response.data;
        } catch (error) {
            console.error('Error al realizar venta', error);
            throw error;
        }
    },
    

    async readTransaction(id) {
        try {
            const response = await axios.get(`${URL_base}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': apiKey,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al leer transacción', error);
            throw error;
        }
    },
    async editTransaction(id, newData) {
        try {
            const response = await axios.patch(`${URL_base}/${id}`, newData, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': apiKey,
                },
            });
            console.log('Response', response.data)
            return response.data;
        } catch (error) {
            console.error('Error al editar transacción', error);
            throw error;
        }
    },

    async deleteTransaction(id) {
        try {
            const response = await axios.delete(`${URL_base}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': apiKey,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al borrar transacción', error);
            throw error;
        }
    },
    async getTransactionsUser() {
        console.log("userName", store.state.userName)
        const userId = store.state.userName;
        try {
            const response = await axios.get(`${URL_base}?q={"user_id": "${userId}"}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': apiKey,
                },
            });
            console.log('transactions del usuario:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener transactions del usuario', error);
            throw error;
        }
    },
}