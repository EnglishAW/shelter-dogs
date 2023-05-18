import { jsonPOST, API_BASE_URL } from "./requests"


export const authenticateUser = async (name: string, email: string) => {
    const endpoint = "/auth/login"
    const url = API_BASE_URL + endpoint
    const body = {name, email}

    const response = await jsonPOST(url, body)
    return response
}

export const logout = async () => {
    const endpoint = "/auth/logout"
    const url = API_BASE_URL + endpoint

    const response = await jsonPOST(url, {})
    return response
}