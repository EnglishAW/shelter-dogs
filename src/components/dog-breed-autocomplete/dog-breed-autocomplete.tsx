import React, { useEffect, useState } from 'react';
import Select, { ActionMeta, MultiValue, Options } from 'react-select';
import { getDogBreeds } from 'network/dogs';

export type Option = {label: string, value: string}
type DogSearchFormProps = {
  onChange?: ((newValue: MultiValue<Option>, actionMeta: ActionMeta<Option>) => void) | undefined
}
function DogBreedAutocomplete({onChange}:DogSearchFormProps) {
    const [dogBreedOptions, setDogBreedOptions] = useState<Options<Option>>([])

    useEffect(() => {
        const fetchDogBreeds = async () => {
            const breedStrings = await getDogBreeds()
            const dogBreedOptions = breedStrings.map((breed) => {return {label: breed, value: breed.toLowerCase()}})
            setDogBreedOptions(dogBreedOptions)
        }

        fetchDogBreeds()
    }, [])

    return (

        <Select 
            isMulti
            placeholder="Type or click to filter by multiple breeds"
            name="breeds"
            options={dogBreedOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            closeMenuOnSelect={false}
            onChange={onChange}
        />

    );
}


export default DogBreedAutocomplete;