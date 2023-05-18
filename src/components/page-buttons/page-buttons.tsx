import React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";

type PageButtonsProps = {
    onPage: (direction: "prev" | "next") => void, 
    isPrevDisabled: boolean, 
    isNextDisabled: boolean
  }

const PageButtons = ({onPage, isPrevDisabled, isNextDisabled}:PageButtonsProps) => {
    return (
      <Flex justify="space-between" padding="15px 0 15px 0">
        <Button 
            variant='link' 
            colorScheme="green" 
            onClick={() => onPage("prev")} 
            isDisabled={isPrevDisabled}
        >
            <ChevronLeftIcon/>Previous
        </Button>
        <Button 
            variant='link' 
            colorScheme="green" 
            onClick={() => onPage("next")} 
            isDisabled={isNextDisabled}
        >
            Next<ChevronRightIcon/>
        </Button>
      </Flex>
    );
  }

export default PageButtons