const baseUrl = 'https://serverapi-mu.vercel.app/api'
// const baseUrl = 'http://localhost:3000/api'


export const QLCheckOutServices = {
    getCartList: () => {
        return axios({
            method: 'GET',
            url: `${baseUrl}/cart`
        })
    },
    updateCart: () => {
        return axios({
            method: 'PUT',
            url: `${baseUrl}/cart`
        })
    }

}