import Api from "../"
import qs from "qs"

const list = async (params) => {
  const payload = {
    page: params.page || 1,
    limit: params.limit || 8,
    ...params
  }

  const query = qs.stringify(payload, {
    encodeValuesOnly: true
  })
  const url = `/customer/list?${query}`
  const req = await Api.get(url, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}` 
    }
  })

  if (req.data.result == 'success') {
    return req.data;
  }

  return null;
}

const listById = async (params) => {
  const url = `/customer/list/${params.id}`
  const req = await Api.get(url, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}` 
    }
  })

  if (req.data.result == 'success') {
    return req.data;
  }

  return null;
}

const search = async (params) => {
  const payload = {
    page: params.page || 1,
    limit: params.limit || 8,
    ...params
  }

  const query = qs.stringify(payload, {
    encodeValuesOnly: true
  })
  const url = `/customer/search?${query}`
  const req = await Api.get(url, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}` 
    }
  })

  if (req.data.result == 'success') {
    return req.data;
  }

  return null;
}

const add = async (params) => {
  const url = `/customer/add`
  const req = await Api.post(url, params, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}` 
    }
  })

  if (req.data.result == 'success') {
    return req.data;
  }

  return null;
}

const deleteCustomer = async (params) => {
  const url = `/customer/delete/${params.id}`
  const req = await Api.delete(url, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}` 
    }
  })

  if (req.data.result == 'success') {
    return req.data;
  }

  return null;
}

const editCustomer = async (params) => {
  const url = `/customer/edit/${params.id}`
  const req = await Api.patch(url, params, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}` 
    }
  })

  if (req.data.result == 'success') {
    return req.data;
  }

  return null;
}

const CustomerApi = {
  list,
  listById,
  search,
  add,
  deleteCustomer,
  editCustomer
}

export default CustomerApi;

