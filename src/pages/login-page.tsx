import React, { useState } from 'react';
import { authenticateUser } from 'network/authentication';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftAddon, Stack } from '@chakra-ui/react';

function LoginPage() {
  const navigate = useNavigate();
  const [nameState, setNameState] = useState("");
  const [emailState, setEmailState] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameState(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(event.target.value);
  };
  
  const handleLogin = async () => {
      authenticateUser(nameState, emailState).then((res) => {

      if(res.ok){
        navigate("/search")
      }
    })

  }

  return (
    <Flex  align="center" direction="column">
      <Box height="20vh"></Box>
      <Stack spacing={6}>
        <Heading as="h2" size="xl">Login</Heading>
        <InputGroup width="400px">
          <InputLeftAddon children='Name' />
          <Input name="user" type="text" value={nameState} onChange={handleNameChange} />
        </InputGroup>

        <InputGroup width="400px">
          <InputLeftAddon children='Email' />
          <Input name="email" type="text" value={emailState} onChange={handleEmailChange} />
        </InputGroup>
        <Button onClick={()=>handleLogin()} >Login</Button>
      </Stack>
    </Flex>
  );
}

export default LoginPage;