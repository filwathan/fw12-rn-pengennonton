/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';

import LogoEbuid from '../assets/images/logo-ebuid1.png';
import spiderman from '../assets/images/spiderman.png';

import {useNavigation, useRoute} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

import http from '../helpers/http';
import {useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';

import {transaction} from '../redux/reducers/transactionReducers';
import {useDispatch} from 'react-redux';
import {
  Text,
  Box,
  Image,
  Button,
  ScrollView,
  HStack,
  VStack,
  Select,
  Center,
  Pressable,
} from 'native-base';

const MovieDetails = () => {
  const token = useSelector(state => state.auth.token);
  const decode = jwt_decode(token);
  const userId = decode.id;

  const route = useRoute();
  const dispacth = useDispatch();
  const navigation = useNavigation();
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [city, setCity] = React.useState('');
  const [adress, setAdress] = React.useState([]);
  const [getCity, setGetCity] = React.useState([]);
  const [detail, setDetail] = React.useState({});
  const idMovie = route.params.id;
  console.log('refresh');

  React.useEffect(() => {
    getDetail();
    getCityList();
    getPremieresAdress();
  }, []);

  const getDetail = async () => {
    try {
      const {data} = await http().get('/movies/detail/' + idMovie);
      setDetail(data.results);
    } catch (error) {
      setDetail({});
    }
  };

  const getCityList = async () => {
    try {
      const {data} = await http().get('/locations');
      setGetCity(data.results);
    } catch (error) {
      setGetCity([]);
    }
  };

  const getPremieresAdress = async () => {
    try {
      const {data} = await http().get(
        '/premieres/premiereLocationByMovie/' + idMovie,
      );
      setAdress(data.results);
    } catch (error) {
      setAdress([]);
    }
  };

  const goTrx = (idUser, idMovie, idPremier, idLocation, datetrx, idTime) => {
    const params = {
      user: parseInt(idUser),
      movie: parseInt(idMovie),
      premier: parseInt(idPremier),
      location: parseInt(idLocation),
      date: datetrx,
      time: parseInt(idTime),
    };
    console.log('hit trx');
    console.log(params);
    dispacth(transaction(params));
    navigation.navigate('OrderPage');
  };
  return (
    <Box>
      <ScrollView>
        <Navbar />
        <Box bgColor={'black'} px={5} py={10}>
          <VStack space={10}>
            <Center>
              <Box
                mb={10}
                width={'2/3'}
                borderWidth={2}
                bgColor={'black'}
                borderColor={'#18181B'}
                borderRadius={'10px'}
                p={5}>
                <Image source={spiderman} alt={'spiderman'} />
              </Box>
              <Box>
                <Text
                  color={'#EAE41E'}
                  fontWeight={'bold'}
                  fontSize={20}
                  textAlign={'center'}
                  mb={5}>
                  {detail?.titleMovie}
                </Text>
                <Text color={'yellow.500'} textAlign={'center'}>
                  {detail?.genre}
                </Text>
              </Box>
            </Center>
            <VStack space={10}>
              <HStack>
                <VStack flex={1} space={2}>
                  <Text color={'yellow.500'}>Realease date</Text>
                  <Text color={'#EAE41E'} fontSize={18}>
                    {new Date(detail?.releaseDate).toDateString()}
                  </Text>
                </VStack>
                <VStack flex={1} space={2}>
                  <Text color={'yellow.500'}>Directed By</Text>
                  <Text color={'#EAE41E'} fontSize={18}>
                    {detail?.direcredBy}
                  </Text>
                </VStack>
              </HStack>
              <HStack>
                <VStack flex={1} space={2}>
                  <Text color={'yellow.500'}>Duration</Text>
                  <Text color={'#EAE41E'} fontSize={18}>
                    {detail?.duration}
                  </Text>
                </VStack>
                <VStack flex={1} space={2}>
                  <Text color={'yellow.500'}>casts</Text>
                  <Text color={'#EAE41E'} fontSize={18}>
                    {detail?.cast}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
            <VStack space={5}>
              <Text color={'#EAE41E'} fontSize={18}>
                Synopsis
              </Text>
              <Text color={'yellow.500'}>{detail?.synopsis}</Text>
            </VStack>
          </VStack>
        </Box>
        <Box bgColor={'#18181B'} px={5} py={10}>
          <VStack space={5} px={5} mb={10}>
            <Text color={'#EAE41E'} fontSize={18} textAlign={'center'}>
              Showtimes and Tickets
            </Text>
            <Box>
              <Pressable
                onPress={() => setOpen(true)}
                w={'full'}
                h={10}
                bgColor={'black'}
                borderWidth={1}
                borderColor={'white'}
                borderRadius={'10px'}
                py={2}
                px={3}>
                <Text color={'#EAE41E'}>{new Date(date).toDateString()}</Text>
              </Pressable>
              <DatePicker
                modal
                open={open}
                date={date}
                mode={'date'}
                minimumDate={new Date(Date.now())}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </Box>
            <Select
              bgColor={'black'}
              color={'yellow.500'}
              borderRadius={'10px'}
              selectedValue={city}
              accessibilityLabel={'pilih berdasarkan'}
              placeholder={'set a city'}
              onValueChange={value => setCity(value)}>
              {getCity?.map((data, index) => (
                <Select.Item
                  key={index}
                  label={data.locationName}
                  value={data.idLocation}
                />
              ))}
              {/* <Select.Item label={'Kajarta'} value={'1'} /> */}
            </Select>
          </VStack>
          {/* card ticket */}
          {adress?.map((data, index) => (
            <VStack
              bgColor={'black'}
              key={index}
              space={5}
              p={5}
              borderRadius={'10px'}
              my={10}>
              <Box alignItems={'center'}>
                <Image source={LogoEbuid} alt={'logo'} />
              </Box>
              <Text color={'yellow.500'} textAlign={'center'}>
                {data.locationAdress}
              </Text>
              <Box borderBottomWidth={'1'} borderBottomColor={'yellow.500'} />
              <HStack>
                <Pressable
                  flex={1}
                  onPress={() => {
                    setTime(1);
                  }}>
                  <Text color={time === 1 ? '#EAE41E' : 'yellow.900'}>
                    08:30
                  </Text>
                </Pressable>
                <Pressable
                  flex={1}
                  onPress={() => {
                    setTime(2);
                  }}>
                  <Text flex={1} color={time === 2 ? '#EAE41E' : 'yellow.900'}>
                    10:30
                  </Text>
                </Pressable>
                <Pressable
                  flex={1}
                  onPress={() => {
                    setTime(3);
                  }}>
                  <Text flex={1} color={time === 3 ? '#EAE41E' : 'yellow.900'}>
                    12:00
                  </Text>
                </Pressable>
                <Pressable
                  flex={1}
                  onPress={() => {
                    setTime(4);
                  }}>
                  <Text flex={1} color={time === 4 ? '#EAE41E' : 'yellow.900'}>
                    14:00
                  </Text>
                </Pressable>
              </HStack>
              <HStack>
                <Pressable
                  flex={1}
                  onPress={() => {
                    setTime(5);
                  }}>
                  <Text flex={1} color={time === 5 ? '#EAE41E' : 'yellow.900'}>
                    16:30
                  </Text>
                </Pressable>
                <Pressable
                  flex={1}
                  onPress={() => {
                    setTime(6);
                  }}>
                  <Text flex={1} color={time === 6 ? '#EAE41E' : 'yellow.900'}>
                    18:30
                  </Text>
                </Pressable>
                <Pressable
                  flex={1}
                  onPress={() => {
                    setTime(7);
                  }}>
                  <Text flex={1} color={time === 7 ? '#EAE41E' : 'yellow.900'}>
                    20:30
                  </Text>
                </Pressable>
                <Pressable
                  flex={1}
                  onPress={() => {
                    setTime(8);
                  }}>
                  <Text flex={1} color={time === 8 ? '#EAE41E' : 'yellow.900'}>
                    22:30
                  </Text>
                </Pressable>
              </HStack>
              <HStack>
                <Text flex={1} color={'yellow.500'}>
                  Price
                </Text>
                <Text color={'#EAE41E'} fontWeight={'bold'}>
                  $ {detail.price}/seat
                </Text>
              </HStack>
              <Button
                onPress={() =>
                  goTrx(
                    userId,
                    idMovie,
                    data.idPremiere,
                    data.idLocation,
                    date,
                    time,
                  )
                }
                mt={10}
                bgColor={'#EAE41E'}
                _pressed={{bgColor: 'yellow.500'}}>
                <Text color={'black'}>Detail</Text>
              </Button>
            </VStack>
          ))}
          {/* <VStack
            bgColor={'black'}
            space={5}
            p={5}
            borderRadius={'10px'}
            my={10}>
            <Box alignItems={'center'}>
              <Image source={LogoEbuid} alt={'logo'} />
            </Box>
            <Text color={'yellow.500'} textAlign={'center'}>
              Whatever street No.12, South Purwokerto
            </Text>
            <Box borderBottomWidth={'1'} borderBottomColor={'yellow.500'} />
            <HStack>
              <Pressable
                flex={1}
                onPress={() => {
                  setTime(1);
                }}>
                <Text color={time === 1 ? '#EAE41E' : 'yellow.900'}>
                  08:30am
                </Text>
              </Pressable>
              <Pressable
                flex={1}
                onPress={() => {
                  setTime(2);
                }}>
                <Text flex={1} color={time === 2 ? '#EAE41E' : 'yellow.900'}>
                  10:30
                </Text>
              </Pressable>
              <Pressable
                flex={1}
                onPress={() => {
                  setTime(3);
                }}>
                <Text flex={1} color={time === 3 ? '#EAE41E' : 'yellow.900'}>
                  12:00
                </Text>
              </Pressable>
              <Pressable
                flex={1}
                onPress={() => {
                  setTime(4);
                }}>
                <Text flex={1} color={time === 4 ? '#EAE41E' : 'yellow.900'}>
                  14:00
                </Text>
              </Pressable>
            </HStack>
            <HStack>
              <Pressable
                flex={1}
                onPress={() => {
                  setTime(5);
                }}>
                <Text flex={1} color={time === 5 ? '#EAE41E' : 'yellow.900'}>
                  16:30
                </Text>
              </Pressable>
              <Pressable
                flex={1}
                onPress={() => {
                  setTime(6);
                }}>
                <Text flex={1} color={time === 6 ? '#EAE41E' : 'yellow.900'}>
                  18:30
                </Text>
              </Pressable>
              <Pressable
                flex={1}
                onPress={() => {
                  setTime(7);
                }}>
                <Text flex={1} color={time === 7 ? '#EAE41E' : 'yellow.900'}>
                  20:30
                </Text>
              </Pressable>
              <Pressable
                flex={1}
                onPress={() => {
                  setTime(8);
                }}>
                <Text flex={1} color={time === 8 ? '#EAE41E' : 'yellow.900'}>
                  22:30
                </Text>
              </Pressable>
            </HStack>
            <HStack>
              <Text flex={1} color={'yellow.500'}>
                Price
              </Text>
              <Text color={'#EAE41E'} fontWeight={'bold'}>
                $ {detail.price}/seat
              </Text>
            </HStack>
            <Button
              onPress={() => goTrx(userId, idMovie, 1, 1, date, time)}
              mt={10}
              bgColor={'#EAE41E'}
              _pressed={{bgColor: 'yellow.500'}}>
              <Text color={'black'}>Detail</Text>
            </Button>
          </VStack> */}
          <Text color={'#EAE41E'} textAlign={'center'}>
            view more
          </Text>
        </Box>
        <Fotter />
      </ScrollView>
    </Box>
  );
};

export default MovieDetails;
