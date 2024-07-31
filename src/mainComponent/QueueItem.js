import { Center, Text, Wrap, WrapItem } from '@chakra-ui/react';

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
                            bg={selectedData === item ? '#1a3c8b' : '#e1e8ed;'}
                            color={selectedData === item ? 'white' : 'black'} >
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
