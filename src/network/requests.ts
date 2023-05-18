
export const API_BASE_URL = "https://frontend-take-home-service.fetch.com"

export const responseToJSON = async (response: Response) => {
  if (response.ok) {
    const data: Array<[]> | Record<any,any> = await response.json();

    return data;
  } else if(response.status === 401) {
    // Unauthorized
    window.location.replace('/login')
    return {}
  } else {
    throw new Error('Request failed with status code ' + response.status);
  }
}

export const jsonPOST = async (url: string, body: any) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      
      return response;
}

export const jsonGET = async (url: string) => {
  const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',

    });

    if (response.ok) {
      const data: Array<[]> | Record<any,any> = await response.json();

      return data;
    } else if(response.status === 401) {
      // Unauthorized
      window.location.replace('/login')
      return {}
    } else {
      throw new Error('Request failed with status code ' + response.status);
    }

}