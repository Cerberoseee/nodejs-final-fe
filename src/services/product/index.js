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
  const url = `/product/list?${query}`
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

const listAdmin = async (params) => {
  const payload = {
    page: params.page || 1,
    limit: params.limit || 8,
    ...params
  }

  const query = qs.stringify(payload, {
    encodeValuesOnly: true
  })
  const url = `/product/list-admin?${query}`
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

const listByName = async (params) => {
  const payload = {
    page: params.page || 1,
    limit: params.limit || 8,
    ...params
  }

  const query = qs.stringify(payload, {
    encodeValuesOnly: true
  })
  const url = `/product/list-by-name?${query}`
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

const listByNameAdmin = async (params) => {
  const payload = {
    page: params.page || 1,
    limit: params.limit || 8,
    ...params
  }

  const query = qs.stringify(payload, {
    encodeValuesOnly: true
  })
  const url = `/product/list-by-name-admin?${query}`
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
  const url = `/product/add`
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

const deleteProduct = async (params) => {
  const url = `/product/delete/${params.id}`
  const req = await Api.delete(url, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}` 
    }
  })
  console.log(req);
  if (req.data.result == 'success') {
    return req.data;
  }

  return null;
}

const editProduct = async (params) => {
  const url = `/product/edit/${params.id}`
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

const ProductApi = {
  list,
  listAdmin,
  listByName,
  listByNameAdmin,
  add,
  deleteProduct,
  editProduct
}

export default ProductApi;