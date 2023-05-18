import { getQueryParams } from "utils/query-parameters"
import { API_BASE_URL, jsonGET, jsonPOST, responseToJSON } from "./requests"

export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

interface Location {
    zip_code: string
    latitude: number
    longitude: number
    city: string
    state: string
    county: string
}

export interface SearchDogResults {
    next?: string
    prev?: string
    resultIds: string[]
    total: number
}

export interface DogFilter {
    breeds?: string[]
    zipCodes?: string[]
    ageMin?: number
    ageMax?: number
    sort?: string
}

export type SortDogFieldName = "breed" | "age" | "name"

interface Match {
    match: string
}

export const getDogBreeds = async () => {
    const endpoint = "/dogs/breeds"
    const url = API_BASE_URL + endpoint

    const breeds = await jsonGET(url) as string[]
    return breeds
}

export const searchDogs = async (filter: DogFilter) => {
    const queryParams = getQueryParams(filter)
    const endpoint = "/dogs/search?" + queryParams
    const url = API_BASE_URL + endpoint

    const dogs = await jsonGET(url) as SearchDogResults
    return dogs
}

export const searchDogsNextPage = async (querySting: string) => {
    const endpoint = "/dogs/search?" + querySting
    const url = API_BASE_URL + endpoint

    const dogs = await jsonGET(url) as SearchDogResults
    return dogs
}

export const getDogsByIds = async (ids: string[]) => {
    const endpoint = "/dogs"
    const url = API_BASE_URL + endpoint

    const response = await jsonPOST(url, ids)
    const dogs = await responseToJSON(response) as Dog[]

    return dogs
}

export const getDogById = async (id: string) => {
    const dogs = await getDogsByIds([id])

    return dogs[0]
}

export const getMatchedDodId = async (ids: string[]) => {
    const endpoint = "/dogs/match"
    const url = API_BASE_URL + endpoint

    const response = await jsonPOST(url, ids)
    const matchJSON = await responseToJSON(response) as Match

    return matchJSON.match
}

export const getMatchedDog = async (ids: string[]) => {
    const matchedDogId = await getMatchedDodId(ids)
    const matchedDog = await getDogById(matchedDogId)

    return matchedDog
}
