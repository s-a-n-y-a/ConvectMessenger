import Axios from 'axios'


const axios = Axios.create({
    baseURL: 'http://localhost:5000',
})

export default class API {
    static async getColor(id) {
        const resp = await axios.get(`/color/${id}`)
            // console.log(resp.data)
        return resp.data
    }
    static async sendColor(id) {
            const resp = await axios.post(`/sendColor`, {
                color: id
            })
            return resp.data
        }
        // Получает сообщение по id
    static async getMessage(id) {
        const resp = await axios.get(`/mes/${id}`)
        return resp.data
    }

    // Отправка сообщения
    static async sendMessage(UserName, MessageText) {
        await axios.post(`/mes`, {
            MessageText, // text: text
            UserName,
        })
    }

}