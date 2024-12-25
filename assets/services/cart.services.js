const baseUrl = 'https://serverapi-mu.vercel.app/api'
// const baseUrl = 'http://localhost:3000/api'


export const QLCartServices = {
    getCartList: () => {
        return axios({
            method: 'GET',
            url: `${baseUrl}/cart`
        })
    },
    addCart: (payload) => {
        console.log("payload: ", payload);
        return axios({
            method: 'POST',
            url: `${baseUrl}/cart`,
            // data: payload
            data: {
                "product_id": payload,
                "quantity": 1
            }

        })

    },
    deleteCart: (cartId) => {
        return axios({
            method: 'DELETE',
            url: `${baseUrl}/cart/${cartId}`
        })
    },
    deleteAllCart: () => {
        return axios({
            method: 'DELETE',
            url: `${baseUrl}/cart/all`
        })
    }

}