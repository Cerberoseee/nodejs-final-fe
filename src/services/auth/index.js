import Api from "../";

const login = async (params) => {
  localStorage.removeItem("user");
  let data = {
    username: params.username,
    password: params.password
  };
  const url = `/auth/login`;
  let req = await Api.post(url, data);
  if (req.data) {
    if (req.data) {
      let {
        token
      } = req.data;
      if (token) localStorage.setItem("token", token);
    }
    return req.data;
  }
  return null;
};

const verifyLogin =  async () => {
  const url = `/auth/me`;
  const req = await Api.get(url, 
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` 
      }
    }
  );
  console.log(req);
  if (req.data.result == 'success') {
    return true;
  }
  return false;
};

const getMe = async () => {
  const url = `/auth/me`;
  const req = await Api.get(url, 
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` 
      }
    }
  );
  if (req.data.result == 'success') {
    localStorage.setItem("user", JSON.stringify(req.data.data));
    return req.data;
  }
  return null;
};

const update = async (params) => {
  let data = {
    avatar: params.avatar,
    fullName: params.fullName,
    email: params.email
  };
  const url = `/auth/update`;
  let req = await Api.post(url, 
    data,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  if (req.data.result == "success") {
    return req.data;
  }
  return null;
}

const changePassword = async (params) => {
  let data = {
    username: params.username,
    password: params.password,
    new_password: params.new_password
  }
  const url = `/auth/change-password`;
  let req = await Api.post(url, 
    data,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    }
  );
  if (req.data.result == "success") {
    return req.data;
  }
  return null;
}

const AuthApi = {
  login,
  getMe,
  update,
  verifyLogin,
  changePassword
}

export default AuthApi;