import Api from "../"
const qs = require("qs");

const list = async (params) => {
  let payload = {
    page: params.page || 1,
    limit: params.limit || 8,
    ...params
  };
  const query = qs.stringify(payload, {
    encodeValuesOnly: true,
  });
  const url = `/account/list?${query}`;

  let req = await Api.get(url, 
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` 
      }
    }
  );
  if (req.data) {
    return req.data;
  }
  return null;
}

const listByName = async (params) => {
  let payload = {
    page: params.page || 1,
    limit: params.limit || 8,
    ...params
  };
  const query = qs.stringify(payload, {
    encodeValuesOnly: true,
  });
  const url = `/account/list-by-name?${query}`;

  let req = await Api.get(url, 
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` 
      }
    }
  );
  if (req.data) {
    return req.data;
  }
  return null;
}

const add = async (params) => {
  let payload = {
    fullName: params.fullName,
    email: params.email,
    ...params
  };
  const url = `/account/register-staff`;

  let req = await Api.post(url, payload,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` 
      }
    }
  );
  if (req.data) {
    return req.data;
  }
  return null;
}

const sendVerifyEmail = async (params) => {
  let payload = {
    email: params.email,
    ...params
  };
  const url = `/account/resend-email`;

  let req = await Api.post(url, payload,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` 
      }
    }
  );
  if (req.data) {
    return req.data;
  }

  return null;
}

const deleteAccount = async (params) => {
  const url = `/account/delete/${params.id}`;

  let req = await Api.delete(url,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` 
      }
    }
  );
  if (req.data) {
    return req.data;
  }
  return null;
}

const lockAccount = async (params) => {
  let payload = params;
  const url = `/account/lock`;

  let req = await Api.patch(url, payload,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` 
      }
    }
  );
  if (req.data) {
    return req.data;
  }
  return null;
}

const unlockAccount = async (params) => {
  let payload = params;
  const url = `/account/unlock`;

  let req = await Api.patch(url, payload,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` 
      }
    }
  );
  if (req.data) {
    return req.data;
  }
  return null;
}

const AccountApi = {
  list,
  add,
  sendVerifyEmail,
  deleteAccount,
  listByName,
  lockAccount,
  unlockAccount
}

export default AccountApi;