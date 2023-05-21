import axios from "axios";
import { useEffect, useState } from "react";
export const AXIOS_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: 'DELETE'
};
//This backend was provided to me by Zsombor Paróczi - Webuni
const BASE_URL = "https://walletproject.kissimonkadenes.workers.dev";

//  **DESCRIPTION**
// "The useApi hook allows me to easily initiate requests to the backend.

let autToken = false;
export function setApiToken(newtoken) {
  autToken = newtoken;
}
function doApiCall(method, uri, onSucces, onFailure = false, data = undefined) {
  axios({
    method,
    url: `${BASE_URL}${uri}`,
    data,
    headers: autToken !== false ? { Authorization: `Bearer ${autToken}` } : {},
  })
    .then((res) => {
      onSucces(res.data);
    })
    .catch((err) => {
      console.log(err);
      if (onFailure === false) {
        return;
      }
      onFailure(err?.response?.data?.error, err);
    });
}
export default doApiCall;

export function useApi(method, uri, postData = undefined, deps = []) {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(
    () => {
      setLoading(true);
      doApiCall(
        method,
        uri,
        (responseData) => {
          setTimeout(() => {
            setData(responseData);
            setError(false);
            setLoading(false);
          }, 2000);
        },
        (errorMessage) => {
          setData(false);
          setError(errorMessage);
          setLoading(false);
        },
        postData
      );
    },
    [uri, JSON.stringify(postData), ...deps],
    setData,
    setError,
    setLoading
  );
  return [data, loading, error];
}
