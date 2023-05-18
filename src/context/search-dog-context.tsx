import React, { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react';
import { DogFilter, SortDogFieldName } from 'network/dogs';

export const SearchDogContext = createContext({} as DogFilter);
export const SearchDogDispatchContext = createContext({} as Dispatch<{type: string, value: number | string | string[]}>);

export const searchDogReducer = (filter: DogFilter, action: {type: string, value: any}) => {
    switch (action.type) {
      case 'breeds': {
        filter.breeds = action.value;
        return {...filter};
      }
      case 'ageMin': {
        const newAgeMin = action.value
        if(newAgeMin >= 0){
          filter.ageMin = action.value
        } else {
          delete filter.ageMin
        }
        
        return {...filter};
      }
      case 'ageMax': {
        const newAgeMax = action.value
        if(newAgeMax >= 0){
          filter.ageMax = action.value
        } else {
          delete filter.ageMax
        }
        
        return {...filter};
      }
      case 'zipCode': {
        const newZipCode = action.value
        if(!!newZipCode){
          filter.zipCodes = [newZipCode]
          return {...filter};
        }

        return {...filter, zipCodes: []}
        
      }
      case 'zipCodes': {
        const newZipCodes = action.value.filter((zip:string) => zip !== "")

        return {...filter, zipCodes: newZipCodes}
        
      }
      case 'sort': {
        return {...filter, sort: action.value}
        
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
}

export function SearchDogProvider({children}:{ children: ReactNode }) {
    const INIT_FILTER = {
      breeds: [],
      zipCodes: [],
      sort: "breed:asc"
    } as DogFilter

    const [searchFilter, dispatch] = useReducer(searchDogReducer, INIT_FILTER);

    return (
      <SearchDogContext.Provider value={searchFilter}>
        <SearchDogDispatchContext.Provider value={dispatch}>
          {children}
        </SearchDogDispatchContext.Provider>
      </SearchDogContext.Provider>
    );
  }

export function useSearchDogFilter() {
  return useContext(SearchDogContext);
}

export function useSearchDogDispatch() {
  return useContext(SearchDogDispatchContext);
}

export function useSearchDogSort() {
  const filter = useContext(SearchDogContext);
  const sortString = filter.sort
  const sortArray = sortString?.split(":") || ["breed", "asc"]

  return {field: sortArray[0], direction: sortArray[1]}
}
  
export function useSetSearchSort() {
  const dispatch = useContext(SearchDogDispatchContext);
  
  return (field: SortDogFieldName, direction: "asc" | "desc") => {
    dispatch({type: "sort", value:`${field}:${direction}`})
  }
}
  