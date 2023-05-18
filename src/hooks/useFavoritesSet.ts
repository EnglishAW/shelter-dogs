import { useState } from 'react';

export const useFavoritesSet = () => {
    const [favoritesSet, setFavoritesSet] = useState<Set<string>>(() => new Set())

    const handleFavoriteDog = (dogId: string) => {
        setFavoritesSet((currSet) => {
          // Dot not mutate existing state
          const newSet = new Set(currSet)
    
          if(newSet.has(dogId)){
            newSet.delete(dogId)
          } else {
            newSet.add(dogId)
          }
          
          return newSet
        })
      }

    return {favoritesSet, handleFavoriteDog}
}