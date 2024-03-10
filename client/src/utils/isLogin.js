export const isLogin = async () => {
    const { data } = await axios.get(
      "https://whiteboard-production.onrender.com/api/whiteboard/auth/is-login",
      { withCredentials: true },
    );
    return data.data;
    // console.log(data.data);
    // setUser(data.data);
  };