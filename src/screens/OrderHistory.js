/* eslint-disable react-hooks/exhaustive-deps */
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
import {useSelector} from 'react-redux';
import jwtDecode from 'jwt-decode';
import http from '../helpers/http';

const OrderHistory = () => {
  const token = useSelector(state => state.auth.token);
  const idUser = jwtDecode(token).id;
  const today = new Date();
  const navigation = useNavigation();

  //get history
  const [history, setHistory] = React.useState([]);
  const getHistory = async () => {
    try {
      const {data} = await http(token).get('/orders/byUser/' + idUser);
      setHistory(data.results);
    } catch (error) {
      setHistory();
    }
  };

  React.useEffect(() => {
    getHistory();
  }, []);

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
        {history?.map((data, index) => (
          <Box key={index} bgColor={'#18181B'} px={5} py={5}>
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
                <Text color={'yellow.500'}>
                  {new Date(data?.dateAndTime).toDateString()} -{' '}
                  {data?.showtimeName}
                </Text>
                <Text color={'#EAE41E'} fontSize={20}>
                  {data.titleMovie}
                </Text>
              </VStack>
              <Box
                flex={1}
                borderBottomWidth={'1'}
                borderBottomColor={'yellow.500'}
              />
              {new Date(data?.dateAndTime) >= today ? (
                <Button
                  onPress={() =>
                    navigation.navigate('TicketResult', {
                      id: data.idOrder,
                    })
                  }
                  bgColor={'green.500'}
                  _pressed={{bgColor: 'green.800'}}>
                  <Text color={'black'}>Ticket in active</Text>
                </Button>
              ) : (
                <Button
                  onPress={() =>
                    navigation.navigate('TicketResult', {
                      id: data.idOrder,
                    })
                  }
                  bgColor={'red.500'}
                  _pressed={{bgColor: 'red.800'}}>
                  <Text color={'black'}>Ticket in Expired</Text>
                </Button>
              )}
            </VStack>
          </Box>
        ))}
        <Fotter />
      </ScrollView>
    </Box>
  );
};

export default OrderHistory;
