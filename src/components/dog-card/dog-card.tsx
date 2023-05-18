import React, { FC, useState } from 'react';

import styled from '@emotion/styled';
import { Flex, HStack, Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons'
import { Dog } from 'network/dogs';

type DogCardProps = {
    dogData: Dog,
    hideFavorite?: boolean,
    isFavorite?: boolean, 
    onFavoriteDog?: (dogId: string) => void, 
}

const FAV_ICON_COLORS = {
    default: "gray.300",
    favorite: "red.300",
    hover: "pink.200"
}
const FAV_BG_COLORS = {
    default: "white",
    favorite: "pink.100",
    hover: "pink.50"
}


function DogCard({dogData, isFavorite, onFavoriteDog, hideFavorite}:DogCardProps) {
    const [isFavHover, setIsFavHover] = useState(false)

    const getFavIconColor = () => {
        if(isFavorite){
            return FAV_ICON_COLORS["favorite"]
        }
        if(isFavHover){
            return FAV_ICON_COLORS["hover"]
        }

        return FAV_ICON_COLORS["default"]
    }

    const getFavBGColor = () => {
        if(isFavorite){
            return FAV_BG_COLORS["favorite"]
        }
        if(isFavHover){
            return FAV_BG_COLORS["hover"]
        }

        return FAV_BG_COLORS["default"]
    }


    const favIconColor = getFavIconColor()
    const favBGColor = getFavBGColor()

    return (
        <Card>
            {!hideFavorite &&
                <FavButton
                    bg={favBGColor}
                    onMouseEnter={() => setIsFavHover(true)}
                    onMouseLeave={() => setIsFavHover(false)}
                    onClick={() => !!onFavoriteDog && onFavoriteDog(dogData.id)}
                ><StarIcon boxSize={9} color={favIconColor} /></FavButton>
            }
            <Image src={dogData.img} />

            <Flex direction="column">
                <Text as="b" fontSize="4xl" align="left">{dogData.name}</Text>
                <Flex direction="column" height="100%" justifyContent="center">
                    <Descriptor label="Breed">{dogData.breed}</Descriptor>
                    <Descriptor label="Age">{dogData.age}</Descriptor>
                    <Descriptor label="Zip Code">{dogData.zip_code}</Descriptor>
                </Flex>

            </Flex>
        </Card>
    );
}

const Card = styled("div")`
    display: flex;
    height: 250px;
    flex-shrink: 0;
    box-shadow: 2px 2px 5px #AAAAAA;
    margin: 5px;
    padding-right: 20px;
    border-radius: 10px 0 0 10px;
`
const FavButton = styled(Flex)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    border-radius: 10px 0 0 10px;

    &:hover {
        cursor: pointer;
    }
`

const Image = styled("img")`
    object-fit: cover;
    height: 100%;
    margin-right: 24px;
    width: 250px;
`

const Descriptor: FC<{label:string, children: React.ReactNode}> = ({label, children}) => (
    <HStack align="left"><Text as="b" fontSize="xl">{`${label}: `}</Text><Text fontSize="xl">{children}</Text></HStack>
)

export default DogCard;