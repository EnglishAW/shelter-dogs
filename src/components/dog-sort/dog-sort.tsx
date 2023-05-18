import React, { Fragment } from 'react';
import {  Button,  HStack, Text } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { useSearchDogSort, useSetSearchSort } from 'context/search-dog-context';
import { SortDogFieldName } from 'network/dogs';



function DogSort() {
    const sort = useSearchDogSort()
    const setSort = useSetSearchSort()


    const handleSortFieldClick = (fieldName: SortDogFieldName) => {
        const newDirection = sort.direction === "asc" ? "desc" : "asc"
        setSort(fieldName, newDirection)
    }

  return (
    <HStack>
        <Text fontWeight={600}>Sort: </Text>
        <SortButton 
            label="Breed"
            isActive={sort.field === "breed"} 
            onClick={() => handleSortFieldClick("breed")} 
            isAsc={sort.direction === "asc"} 
        />
        <SortButton 
            label="Age"
            isActive={sort.field === "age"} 
            onClick={() => handleSortFieldClick("age")} 
            isAsc={sort.direction === "asc"} 
        />
        <SortButton
            label="Name"
            isActive={sort.field === "name"} 
            onClick={() => handleSortFieldClick("name")} 
            isAsc={sort.direction === "asc"} 
        />
    </HStack>
  );
}

type SortButtonProps = {
    label:string, 
    isActive: boolean, 
    isAsc: boolean, 
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

function SortButton({label, isActive, isAsc, onClick}:SortButtonProps) {

  return (
    <Button onClick={onClick} >{label}{!!isActive && <SortOrderIcon isAsc={isAsc} />}</Button>
  );
}

function SortOrderIcon({isAsc}:{isAsc: boolean}) {

  return (
    <Fragment>
        {!!isAsc ? <ArrowDownIcon /> : <ArrowUpIcon />}
    </Fragment>
  );
}

export default DogSort;