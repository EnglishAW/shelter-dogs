import React, { useEffect, useState } from 'react';
import { Dog, getDogById } from 'network/dogs';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, HStack, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useMatchId, useMatchIdDispatch } from 'context/match-context';
import DogCard from 'components/dog-card/dog-card';
import { useLogoutUser } from 'hooks/useLogoutUser';

function MatchedPage() {
    const navigate = useNavigate()
    const logoutUser = useLogoutUser()
    const matchId = useMatchId()
    const matchIdDispatcher = useMatchIdDispatch()
    const [matchedDog, setMatchedDog] = useState<Dog | null>(null)

    useEffect(()=>{
        if(matchId === ""){
            navigate("/")
        }
        const fetchMatchedDog = async (id: string) => {
        const matchedDog = await getDogById(id)
        setMatchedDog(matchedDog)
        }

        fetchMatchedDog(matchId)
    },[matchId, navigate])

    const handleClickStartOver = () => {
        matchIdDispatcher({type: "clear", value: ""})
        navigate("/")
    }

    const handleClickLogout = () => {
        logoutUser()
    }

    return (
        <Flex  align="center" direction="column">
            <Title>You have been matched!</Title>
            {!!matchedDog && <DogCard dogData={matchedDog} hideFavorite/>}

            <HStack margin={"20px 0"} spacing={6}>
                <Button colorScheme="green" onClick={handleClickStartOver}>Start Over</Button>
                <Button colorScheme="green" onClick={handleClickLogout}>Log Out</Button>
            </HStack>
            
        </Flex>
    );
}

const Title = styled(Heading)`
    margin: 36px 0;
`

export default MatchedPage;