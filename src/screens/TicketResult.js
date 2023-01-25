import React from 'react';

import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';

import QR from '../assets/images/qr.png';

import {
  Text,
  Box,
  Image,
  Button,
  ScrollView,
  HStack,
  VStack,
  Pressable,
} from 'native-base';

const TicketResult = () => {
  return (
    <Box>
      <ScrollView>
        <Navbar />
        <Box bgColor={'#18181B'} px={5} py={5}>
          <VStack
            bgColor={'black'}
            space={5}
            px={5}
            py={10}
            borderRadius={'10px'}
            borderBottomWidth={1}
            borderBottomStyle={'dashed'}
            borderBottomColor={'#18181B'}>
            <Box alignItems={'center'}>
              <Image
                bgColor={'white'}
                source={QR}
                alt={'cineone'}
                resizeMode={'contain'}
              />
            </Box>
          </VStack>
          <VStack
            bgColor={'black'}
            space={5}
            py={10}
            px={12}
            borderRadius={'10px'}>
            <HStack>
              <VStack space={3} flex={1}>
                <Box>
                  <Text color={'yellow.500'} fontSize={12}>
                    Movie
                  </Text>
                  <Text color={'#EAE41E'}>Spider-Man:..</Text>
                </Box>
                <Box>
                  <Text color={'yellow.500'} fontSize={12}>
                    Date
                  </Text>
                  <Text color={'#EAE41E'}>07 Jul</Text>
                </Box>
                <Box>
                  <Text color={'yellow.500'} fontSize={12}>
                    Count
                  </Text>
                  <Text color={'#EAE41E'}>3 pcs</Text>
                </Box>
              </VStack>
              <VStack space={3}>
                <Box>
                  <Text color={'yellow.500'} fontSize={12}>
                    Category
                  </Text>
                  <Text color={'#EAE41E'}>Action</Text>
                </Box>
                <Box>
                  <Text color={'yellow.500'} fontSize={12}>
                    Time
                  </Text>
                  <Text color={'#EAE41E'}>2:00pm</Text>
                </Box>
                <Box>
                  <Text color={'yellow.500'} fontSize={12}>
                    Seats
                  </Text>
                  <Text color={'#EAE41E'}>C4, C5, C6</Text>
                </Box>
              </VStack>
            </HStack>
            <HStack borderColor={'#18181B'} borderWidth={1} py={3} px={5}>
              <Text color={'yellow.500'} flex={1}>
                Total
              </Text>
              <Text color={'#EAE41E'} fontWeight={'bold'}>
                $30.00
              </Text>
            </HStack>
          </VStack>
        </Box>
        <Fotter />
      </ScrollView>
    </Box>
  );
};

export default TicketResult;
