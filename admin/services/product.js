const baseUrl = "https://serverapi-mu.vercel.app/api";

export const product = {
  getProductList: () => {
    return axios({
      method: "GET",
      url: `${baseUrl}/products`,
    });
  },

  deleteProduct: (productId) => {
    return axios({
      method: "DELETE",
      url: `${baseUrl}/products/${productId}`,
    });
  },

  addProduct: (payload) => {
    return axios({
      method: "POST",
      url: `${baseUrl}/products`,
      data: payload, // dl gửi lên server
    });
  },

  getProductById: (productId) => {
    // lấy thông tin sp thông qua id
    return axios({
      method: "GET",
      url: `${baseUrl}/products/${productId}`,
    });
  },

  editProduct: (payload, productId) => {
    return axios({
      method: "PUT",
      url: `${baseUrl}/products/${productId}`,
      data: payload, // thông tin sp cập nhập
    });
  },
};
