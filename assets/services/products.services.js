const baseUrl = 'https://serverapi-mu.vercel.app/api'
// const baseUrl = 'http://localhost:3000/api'


export const QLProductServices = {
    getProductList: () => {
        return axios({
            method: 'GET',
            url: `${baseUrl}/products`
        })
    },
    getProductBrand: (type) => {
        return axios({
            method: 'GET',
            url: `${baseUrl}/products/gettype/${type}`
        })
    },

}