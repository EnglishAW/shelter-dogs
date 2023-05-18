import React, { useEffect, useState } from 'react';
import { Dog, getDogsByIds, getMatchedDodId,  searchDogs, searchDogsNextPage } from 'network/dogs';

import { Button, Flex, HStack, Heading, Stack, Text } from '@chakra-ui/react'
import DogSearchForm from 'components/dog-search-form/dog-search-form';
import DogCard from 'components/dog-card/dog-card';
import styled from '@emotion/styled';
import { useSearchDogFilter } from 'context/search-dog-context';
import { useFavoritesSet } from 'hooks/useFavoritesSet';
import { useMatchIdDispatch } from 'context/match-context';
import { useNavigate } from 'react-router-dom';
import PageButtons from 'components/page-buttons/page-buttons';

function SearchPage() {
  const navigate = useNavigate()

  const searchDogFilter = useSearchDogFilter()

  const matchIdDispatch = useMatchIdDispatch()

  const [dogIds, setDogIds] = useState<string[]>([])
  const [dogs, setDogs] = useState<Dog[]>([])

  const [pageQueryParams, setPageQueryParams] = useState({prev:"", next:""})

  const {favoritesSet, handleFavoriteDog} = useFavoritesSet()

  useEffect(() => {

    const fetchDogIds = async () => {
        const dogsResult = await searchDogs(searchDogFilter)
        const next = parseParams(dogsResult.next)
        const prev = parseParams(dogsResult.prev)
        setPageQueryParams({prev, next})
        setDogIds(dogsResult.resultIds || [])
    }

    fetchDogIds()
  }, [searchDogFilter])

  useEffect(() => {
    const fetchDogs = async () => {
        const dogs = await getDogsByIds(dogIds)

        setDogs(dogs || [])
    }

    fetchDogs()
  }, [dogIds])

  const handleMatchWithDog = async () => {
    const favoriteDogsArray = Array.from(favoritesSet);
    const matchedDogId = await getMatchedDodId(favoriteDogsArray)
    matchIdDispatch({type: "match", value: matchedDogId})
    navigate("/match")
  }

  const handlePage = async (direction: "prev" | "next") => {
    const pageParams = direction === "next" ? pageQueryParams.next : pageQueryParams.prev
    if(!!pageParams){
      const dogsResult = await searchDogsNextPage(pageParams)
      const next = parseParams(dogsResult.next)
      const prev = parseParams(dogsResult.prev)
      setPageQueryParams({prev, next})
      setDogIds(dogsResult.resultIds || [])
    }

  }

  return (

        <div>
          <Heading as="h1" size="xl" >Search for your new furry friend</Heading>
          <SearchArea>
            <DogSearchForm />

            <Flex align="center" justify="center">
              <HStack>
                <Button 
                  colorScheme="green" 
                  size="lg" 
                  isDisabled={favoritesSet.size === 0}
                  onClick={handleMatchWithDog}
                >Find Your Match</Button>
                <Text>out of {favoritesSet.size}</Text>
              </HStack>
            </Flex>
            <Flex justify="end">
              
            </Flex>
            
          </SearchArea>
          
          <Results>
            <PageButtons 
              onPage={handlePage} 
              isPrevDisabled={!pageQueryParams.prev} 
              isNextDisabled={!pageQueryParams.next} 
            />
            {dogs.map((dog) => {
              const isFavorite = favoritesSet.has(dog.id)
              return <Result key={dog.id}><DogCard dogData={dog} isFavorite={isFavorite} onFavoriteDog={handleFavoriteDog} /></Result>
            })}
            <PageButtons 
              onPage={handlePage} 
              isPrevDisabled={!pageQueryParams.prev} 
              isNextDisabled={!pageQueryParams.next} 
            />
          </Results>

        </div>

  );
}

const parseParams = (link: string | undefined) => {
  if(!link){
    return ""
  }
  const exploded = link.split("?")
  if(exploded.length > 1){
    return exploded[1]
  }
  return ""
}

const SearchArea = styled(Stack)`
  margin: 50px 50px 0px 50px;
`
const Results = styled("div")`
  margin: 0 10px;
`
const Result = styled("div")`
  margin-bottom: 10px;
`

export default SearchPage;