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
  const url = `/invoice/list?${query}`
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
  const url = `/invoice/list/${params.id}`
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

const deleteInvoice = async (params) => {
  const url = `/invoice/delete/${params.id}`
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

const addInvoice = async (params) => {
  const url = `/invoice/add/`
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

const listInvoiceByCustomer = async (params) => {
  const payload = {
    page: params.page || 1,
    limit: params.limit || 8,
    ...params
  }

  payload.id = undefined;
  
  const query = qs.stringify(payload, {
    encodeValuesOnly: true
  })
  const url = `/invoice/list-by-customer/${params.id}?${query}`
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

const InvoiceApi = {
  listInvoiceByCustomer,
  list,
  listById,
  deleteInvoice,
  addInvoice
}

export default InvoiceApi;