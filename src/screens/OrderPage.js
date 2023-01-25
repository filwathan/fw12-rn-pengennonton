import React from 'react';
import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';
import Seat from '../components/Seat';
import Icon from 'react-native-vector-icons/dist/Feather';

import LogoEbuid from '../assets/images/logo-cineone21.png';

import {
  Text,
  Box,
  Image,
  Button,
  ScrollView,
  HStack,
  VStack,
} from 'native-base';

import {useNavigation} from '@react-navigation/native';

const OrderPage = () => {
  const navigation = useNavigation();
  return (
    <Box>
      <ScrollView>
        <Navbar />
        <Box bgColor={'#18181B'} px={5} py={10}>
          <Text color={'#EAE41E'} fontSize={18}>
            Choose Your Seat
          </Text>
          <VStack
            bgColor={'black'}
            space={5}
            p={5}
            borderRadius={'10px'}
            my={10}>
            <Box borderBottomWidth={'4'} borderBottomColor={'yellow.500'} />
            <HStack
              borderLeftWidth={'2'}
              borderLeftColor={'green.500'}
              borderBottomWidth={'2'}
              borderBottomColor={'red.500'}
              p={2}>
              <VStack space={1} flex={1}>
                <Seat />
                <Seat />
                <Seat />
                <Seat />
                <Seat />
                <Seat />
                <Seat />
              </VStack>
              <VStack space={1}>
                <Seat />
                <Seat />
                <Seat />
                <Seat />
                <Seat />
                <Seat />
                <Seat />
              </VStack>
            </HStack>
            <Text flex={1} color={'#EAE41E'}>
              Seating key
            </Text>
            <Box>
              <HStack space={20}>
                <VStack space={3}>
                  <HStack space={3} lignItems={'center'}>
                    <Icon name={'arrow-down'} color={'#3EB469'} size={20} />
                    <Text color={'yellow.500'}>A - G</Text>
                  </HStack>
                  <HStack space={3} alignItems={'center'}>
                    <Box width={3} height={3} bgColor={'#18181B'} />
                    <Text color={'yellow.500'}>Available</Text>
                  </HStack>
                  <HStack space={3} lignItems={'center'}>
                    <Box width={3} height={3} bgColor={'#B2B2B3'} />
                    <Text color={'yellow.500'}>Sold</Text>
                  </HStack>
                </VStack>
                <VStack space={3}>
                  <HStack space={3} lignItems={'center'}>
                    <Icon name={'arrow-right'} color={'#ED4543'} size={20} />
                    <Text color={'yellow.500'}>1 - 14</Text>
                  </HStack>
                  <HStack space={3} alignItems={'center'}>
                    <Box width={3} height={3} bgColor={'yellow.500'} />
                    <Text color={'yellow.500'}>Selected</Text>
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          </VStack>
          <Text color={'#EAE41E'} fontSize={18}>
            Order Info
          </Text>
          <VStack
            bgColor={'black'}
            space={5}
            p={5}
            borderRadius={'10px'}
            my={10}>
            <Box alignItems={'center'}>
              <Image source={LogoEbuid} alt={'logo'} />
            </Box>
            <Text
              color={'#EAE41E'}
              textAlign={'center'}
              fontWeight={'bold'}
              fontSize={32}>
              CineOne21 Cinema
            </Text>
            <Text color={'yellow.500'} textAlign={'center'} fontWeight={'bold'}>
              Spider-Man: Homecoming
            </Text>
            <HStack>
              <Text flex={1} color={'yellow.500'}>
                Tuesday, 07 July 2020
              </Text>
              <Text color={'#EAE41E'} fontWeight={'bold'}>
                02:00
              </Text>
            </HStack>
            <HStack>
              <Text flex={1} color={'yellow.500'}>
                One ticket price
              </Text>
              <Text color={'#EAE41E'} fontWeight={'bold'}>
                $10
              </Text>
            </HStack>
            <HStack>
              <Text flex={1} color={'yellow.500'}>
                Seat choosed
              </Text>
              <Text color={'#EAE41E'} fontWeight={'bold'}>
                C4, C5, C6
              </Text>
            </HStack>
            <Box borderBottomWidth={'1'} borderBottomColor={'yellow.500'} />
            <HStack>
              <Text flex={1} color={'yellow.500'} fontSize={20}>
                Total Payment
              </Text>
              <Text color={'#EAE41E'} fontWeight={'bold'} fontSize={20}>
                $30
              </Text>
            </HStack>
          </VStack>
          <Button
            onPress={() => navigation.navigate('PaymentPage')}
            mt={10}
            bgColor={'#EAE41E'}
            _pressed={{bgColor: 'yellow.500'}}>
            <Text color={'black'}>Checkout now</Text>
          </Button>
        </Box>
        <Fotter />
      </ScrollView>
    </Box>
  );
};

export default OrderPage;
