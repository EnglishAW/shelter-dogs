import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Text, Flex, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';

const SITE_DESCRIPTION_TEXT = "Welcome to Pawsitive Placement, your ultimate destination for finding your next doggie companion! Browse through our wide selection of available shelter dogs, pick your favorites, and get ready to discover your perfect match. Get ready for a tail-wagging adventure filled with love and joy!"

function WelcomePage() {
    const navigate = useNavigate()

  return (
    <Flex  align="center" direction="column">
        <Title>Welcome</Title>
        <ContentArea>
            <Text>{SITE_DESCRIPTION_TEXT}</Text>
        </ContentArea>
        
        <Button colorScheme="green" onClick={() => navigate("/search")}> Search Dogs</Button>
    </Flex>
  );
}

const Title = styled(Heading)`
    margin: 36px 0;
`
const ContentArea = styled(Flex)`
    margin: 36px 0;
    width: 70%;
    min-width: 200px;
    max-width: 1000px;
`

export default WelcomePage;