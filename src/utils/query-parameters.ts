export const arryToQueryParams = (key:string, array: any[]) => {
    return array.map((item) => `${key}[]=${item}`)
}

// Implemented custom query parameter constructor to handle arrays
export const getQueryParams = (filter: Record<any, any>) => {
    const filterKeys = Object.keys(filter)
    const paramsArray = filterKeys.reduce<string[]>((acc, key) => {
        const value = filter[key]
        if(Array.isArray(value)){
            const arrayParams = arryToQueryParams(key, value)
            return [...acc, ...arrayParams]
        }

        return [...acc, `${key}=${value}`]
    }, [])

    return paramsArray.join("&")
}