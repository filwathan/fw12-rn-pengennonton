/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';
import Seat from '../components/Seat';
import Icon from 'react-native-vector-icons/dist/Feather';

import LogoEbuid from '../assets/images/logo-ebuid1.png';

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
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {addSeatTransaction} from '../redux/reducers/transactionReducers';
import http from '../helpers/http';

const OrderPage = () => {
  const token = useSelector(state => state.auth.token);
  const navigation = useNavigation();
  const dispacth = useDispatch();
  const transaction = useSelector(state => state.transaction);
  const [selected, setSelected] = React.useState([]);
  const [movie, setMovie] = React.useState({});
  const [premier, setPremier] = React.useState({});
  const [showtime, setShowtime] = React.useState({});
  console.log('refresh');

  const onChangeSeat = seatNum => {
    if (selected.includes(seatNum)) {
      setSelected(selected.filter(o => o !== seatNum));
    } else {
      setSelected([...selected, seatNum]);
    }
  };

  const getMovie = async () => {
    try {
      const {data} = await http(token).get('/movies/' + transaction.idMovie);
      setMovie(data.results);
    } catch (error) {
      setMovie({});
    }
  };
  const getPremiere = async () => {
    try {
      const {data} = await http(token).get(
        '/premieres/' + transaction.idPremiere,
      );
      setPremier(data.results);
    } catch (error) {
      setPremier({});
    }
  };
  const getShowtime = async () => {
    try {
      const {data} = await http(token).get(
        '/showtimes/' + transaction.idShowtime,
      );
      setShowtime(data.results);
    } catch (error) {
      setShowtime({});
    }
  };

  const goTrxAddSeat = (seatSeleceted, total) => {
    const params = {
      seat: seatSeleceted,
      total: total,
    };
    console.log(params);
    dispacth(addSeatTransaction(params));
    navigation.navigate('PaymentPage');
  };
  React.useEffect(() => {
    getMovie();
    getPremiere();
    getShowtime();
  }, []);

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
              space={2}
              p={2}>
              <Seat selected={selected} onChange={onChangeSeat} />
              <Seat selected={selected} onChange={onChangeSeat} startNum={8} />
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
              {premier.premiereName} Cinema
            </Text>
            <Text color={'yellow.500'} textAlign={'center'} fontWeight={'bold'}>
              {movie?.titleMovie}
            </Text>
            <HStack>
              <Text flex={1} color={'yellow.500'}>
                {transaction?.dateAndTime?.toDateString()}
              </Text>
              <Text color={'#EAE41E'} fontWeight={'bold'}>
                {showtime.showtimeName}
              </Text>
            </HStack>
            <HStack>
              <Text flex={1} color={'yellow.500'}>
                One ticket price
              </Text>
              <Text color={'#EAE41E'} fontWeight={'bold'}>
                $ {movie.price}
              </Text>
            </HStack>
            <HStack>
              <Text flex={1} color={'yellow.500'}>
                Seat choosed
              </Text>
              <Text color={'#EAE41E'} fontWeight={'bold'}>
                {selected.join(', ')}
              </Text>
            </HStack>
            <Box borderBottomWidth={'1'} borderBottomColor={'yellow.500'} />
            <HStack>
              <Text flex={1} color={'yellow.500'} fontSize={20}>
                Total Payment
              </Text>
              <Text color={'#EAE41E'} fontWeight={'bold'} fontSize={20}>
                $ {selected.length * movie.price}
              </Text>
            </HStack>
          </VStack>
          <Button
            onPress={() => {
              goTrxAddSeat(selected, selected.length * movie.price);
              // console.log(selected.length * movie.price);
            }}
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
