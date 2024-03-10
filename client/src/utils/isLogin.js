export const isLogin = async () => {
    const { data } = await axios.get(
      "http://localhost:5050/api/whiteboard/auth/is-login",
      { withCredentials: true },
    );
    return data.data;
    // console.log(data.data);
    // setUser(data.data);
  };