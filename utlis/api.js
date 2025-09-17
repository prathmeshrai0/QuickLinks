export async function fetchFunction(resource, payLoad = {}, method = "GET") {
  let fetchOptions = {};

  if (method !== "GET") {
    fetchOptions.method = method;
    fetchOptions.headers = { "Content-Type": "application/json" };
    fetchOptions.body = JSON.stringify(payLoad);
  }

  return fetch(resource, fetchOptions).then(res => {
    if (!res.ok) {
      return new Error(`Fetch failed with status ${res.status}`);
    }
    return res.json();
  })
  // .then(data=> {return data});
}
