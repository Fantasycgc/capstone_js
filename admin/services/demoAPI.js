const BASE_URL = "https://jsonplaceholder.typicode.com/users";

class UserService {
  getUser = () => {
    return axios({
      url: `${BASE_URL}`,
      method: "GET",
    });
  };
}
