const baseUrl = 'https://serverapi-mu.vercel.app/api'

export const QLNVServices = {
    getEmpList: () => {
        return axios({
            method: 'GET',
            url: `${baseUrl}/products`
        })
    },

}