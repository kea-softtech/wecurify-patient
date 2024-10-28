import { Center, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { Theme_Color } from '../config';
const QueueItem = ({ item, selectedData }) => (
    <>
        <Text fontSize='x-large' fontWeight="bold">
            <Center>
                &#8594;
            </Center>
        </Text>
        {/* <Flex
            direction='row'
            borderRadius="full"
            shadow="lg"
            justify="center"
            alignItems="center"
           
            w="100px"
            h="100px"
        > */}
        <div>
            <Wrap justify='center'>
                <Text align='center' fontSize="medium" fontWeight="bold">
                    <WrapItem>
                        <Center
                            className='step-number'
                            bg={selectedData === item ? {Theme_Color} : '#e1e8ed;'}
                            color={selectedData === item ? '#fff' : 'black'} >
                            {item}
                        </Center>
                    </WrapItem >
                </Text>
            </Wrap>
        </div>
        {/* </Flex > */}

    </>
);
export default QueueItem;
