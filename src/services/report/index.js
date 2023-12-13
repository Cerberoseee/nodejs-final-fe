import Api from "../"

const getSalesResult = async (params) => {
  let url = "/report/get-sales-result";

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

const ReportApi = {
  getSalesResult
}

export default ReportApi;