import React from 'react';

import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';

import LogoCineone from '../assets/images/logo-cineone21.png';

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

import {useNavigation} from '@react-navigation/native';

const OrderHistory = () => {
  const navigation = useNavigation();
  return (
    <Box>
      <ScrollView>
        <Navbar />
        <HStack bgColor={'black'} px={5} pt={10}>
          <Pressable
            flex={1}
            pb={5}
            w={'1/2'}
            onPress={() => {
              navigation.navigate('Profil');
            }}>
            <Text color={'yellow.500'} textAlign={'center'}>
              Details Account
            </Text>
          </Pressable>
          <Text
            color={'#EAE41E'}
            flex={1}
            w={'1/2'}
            pb={5}
            textAlign={'center'}
            borderBottomWidth={2}
            borderBottomColor={'#EAE41E'}>
            Order History
          </Text>
        </HStack>
        <Box bgColor={'#18181B'} px={5} py={5}>
          <VStack
            bgColor={'black'}
            space={5}
            p={5}
            borderRadius={'10px'}
            my={5}>
            <VStack space={3}>
              <Box>
                <Image
                  source={LogoCineone}
                  alt={'cineone'}
                  resizeMode={'contain'}
                />
              </Box>
              <Text color={'yellow.500'}>Tuesday, 07 July 2020 - 04:30pm</Text>
              <Text color={'#EAE41E'} fontSize={20}>
                Spider-Man: Homecoming
              </Text>
            </VStack>
            <Box
              flex={1}
              borderBottomWidth={'1'}
              borderBottomColor={'yellow.500'}
            />
            <Button
              onPress={() => navigation.navigate('TicketResult')}
              bgColor={'green.500'}
              _pressed={{bgColor: 'green.800'}}>
              <Text color={'black'}>Ticket in active</Text>
            </Button>
          </VStack>
        </Box>
        <Box bgColor={'#18181B'} px={5} py={5}>
          <VStack
            bgColor={'black'}
            space={5}
            p={5}
            borderRadius={'10px'}
            my={5}>
            <VStack space={3}>
              <Box>
                <Image
                  source={LogoCineone}
                  alt={'cineone'}
                  resizeMode={'contain'}
                />
              </Box>
              <Text color={'yellow.500'}>Monday, 14 June 2020 - 02:00pm</Text>
              <Text color={'#EAE41E'} fontSize={20}>
                Avengers: End Game
              </Text>
            </VStack>
            <Box
              flex={1}
              borderBottomWidth={'1'}
              borderBottomColor={'yellow.500'}
            />
            <Button
              onPress={() => navigation.navigate('TicketResult')}
              bgColor={'red.500'}
              _pressed={{bgColor: 'red.800'}}>
              <Text color={'black'}>Ticket in active</Text>
            </Button>
          </VStack>
        </Box>
        <Fotter />
      </ScrollView>
    </Box>
  );
};

export default OrderHistory;
