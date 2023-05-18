import React from 'react';

import styled from '@emotion/styled';
import { Box, Heading } from '@chakra-ui/react';

function Header() {

  return (
    <StyledBox bg="green.600">
      <Heading as="h1" size="lg" color="white">Pawsitive Placement</Heading>
    </StyledBox>
  );
}

const StyledBox = styled(Box)`
    display: flex;
    width: 100%;
    height: 64px;
    align-items: center;
    padding: 0 24px;
`

export default Header;