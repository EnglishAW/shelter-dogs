import React from 'react';
import { Flex, HStack,  Input, Stack, Text } from '@chakra-ui/react';
import { Options } from 'react-select';
import DogBreedAutocomplete, { Option } from 'components/dog-breed-autocomplete/dog-breed-autocomplete';
import { useSearchDogDispatch, useSearchDogFilter } from 'context/search-dog-context';
import DogSort from 'components/dog-sort/dog-sort';
import styled from '@emotion/styled';


function DogSearchForm() {

  const searchDogFilter = useSearchDogFilter()
  const searchDogDispatch = useSearchDogDispatch()

  const handleSelectBreeds = (options: Options<Option>) => {
    const selectedBreedStrings = options.map((option) => option.label)
    searchDogDispatch({type: "breeds", value: selectedBreedStrings})
  }

  const handleMinAgeChange = (event: any) => {
    const newAgeMin = parseInt(event.target.value)
    if(!isNaN(newAgeMin)){
      searchDogDispatch({type: "ageMin", value: newAgeMin})
    } else {
      searchDogDispatch({type: "ageMin", value: -1})
    }
  }

  const handleMaxAgeChange = (event: any) => {
    const newAgeMax = parseInt(event.target.value)
    if(!isNaN(newAgeMax)){
      searchDogDispatch({type: "ageMax", value: newAgeMax})
    } else {
      searchDogDispatch({type: "ageMax", value: -1})
    }
  }

  const handleZipCodeChange = (event: any) => {
      const newZipCode = event.target.value
      searchDogDispatch({type: "zipCode", value: newZipCode})
  }

  const {ageMin, ageMax} = searchDogFilter
  const ageMinInputValue = !!ageMin || ageMin === 0 ? ageMin : ""
  const ageMaxInputValue = !!ageMax || ageMax === 0 ? ageMax : ""

  return (
    <Stack>
      <Text align="left">Breeds:</Text>
      <DogBreedAutocomplete onChange={handleSelectBreeds}/>
      <Flex justify="space-between">
        <HStack spacing={10}>
          <AgeRange>
            <Text align="left">Age:</Text>
            <Input 
              placeholder="min"
              value={ageMinInputValue}
              onChange={handleMinAgeChange} 
              width={75} 
            />
            <Text align="left">to</Text>
            <Input 
              placeholder="max" 
              value={ageMaxInputValue} 
              width={75} 
              onChange={handleMaxAgeChange}
            />
          </AgeRange>

        

          <ZipCode>
            <Text align="left">Zip Code:</Text>
            <Input 
              placeholder="123456"
              value={searchDogFilter.zipCodes || ""}
              onChange={handleZipCodeChange} 
              width={100} 
            />
          </ZipCode>
        </HStack>

        <DogSort/>

      </Flex>
      

    </Stack>
  );
}

const AgeRange = styled(HStack)``
const ZipCode = styled(HStack)``

export default DogSearchForm;