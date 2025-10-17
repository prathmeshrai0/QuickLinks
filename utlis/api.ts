"use client"
export async function fetchFunction(resource: string, payLoad :Record<string, any>  = {}, method : string = "GET") {
  let fetchOptions :RequestInit ={} ;

  if (method !== "GET") {
    fetchOptions.method = method;
    fetchOptions.headers = { "Content-Type": "application/json" };
    fetchOptions.body = JSON.stringify(payLoad);
  }

  return fetch(resource, fetchOptions).then(res => {
    if (!res.ok) {
      throw new Error(`Fetch failed with status ${res.status}`);
    }
    else{

      return res.json();
    }
  }) 
}
