/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';

import spiderman from '../assets/images/spiderman.png';
import lionking from '../assets/images/lion-king.png';

import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import http from '../helpers/http';

import {
  Text,
  Box,
  Image,
  Pressable,
  Button,
  ScrollView,
  HStack,
  VStack,
  Input,
  Select,
  Center,
} from 'native-base';

const ViewAll = () => {
  const token = useSelector(state => state.auth.token);
  const navigation = useNavigation();
  const [movie, setMovie] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [limit, setLimit] = React.useState(4);
  const [search, setSearch] = React.useState('');
  const [sortBy, setSortBy] = React.useState('');
  const [sort, setSort] = React.useState('ASC');
  const [month, setMonth] = React.useState(8);
  console.log(search);

  //get all movie
  const getAllMovie = async () => {
    try {
      const {data} = await http(token).get(
        `/movies/semua?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sort=${sort}`,
      );
      setTotalPage(data.pageInfo.totalPage);
      setMovie(data.results);
    } catch (error) {
      setMovie({});
    }
  };

  //add
  const add = () => {
    if (page < totalPage) {
      setPage(page + 1);
    } else {
      setPage(page);
    }
  };

  //minus
  const minus = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(page);
    }
  };

  React.useEffect(() => {
    getAllMovie();
    console.log(search);
  }, [page, limit, search, sortBy, sort, totalPage]);

  return (
    <Box>
      <ScrollView>
        <Navbar />
        <Box bgColor={'#18181B'} px={5} py={10}>
          <Text color={'#EAE41E'} fontWeight={'bold'} mb={5}>
            List Movie
          </Text>
          <HStack space={5}>
            <Select
              bgColor={'black'}
              color={'yellow.500'}
              borderRadius={'20px'}
              selectedValue={sort}
              width={100}
              accessibilityLabel={'pilih berdasarkan'}
              placeholder={'Sort'}
              onValueChange={value => setSort(value)}>
              <Select.Item label={'A~Z a~z'} value={'ASC'} />
              <Select.Item label={'z~a Z~A'} value={'DESC'} />
            </Select>
            <Input
              onChangeText={value => setSearch(value)}
              flex={1}
              placeholder={'Search Movie Name..'}
              bgColor={'black'}
              color={'yellow.500'}
              borderRadius={'20px'}
            />
          </HStack>
          {/* month */}
          <ScrollView horizontal my={5}>
            <HStack space={5}>
              <Button
                onPress={() => {
                  setMonth(9);
                }}
                borderWidth={2}
                borderColor={month === 9 ? '#18181B' : '#EAE41E'}
                bgColor={month === 9 ? '#EAE41E' : 'black'}>
                <Text color={month === 9 ? 'black' : '#EAE41E'}>September</Text>
              </Button>
              <Button
                onPress={() => {
                  setMonth(10);
                }}
                borderWidth={2}
                borderColor={month === 10 ? '#18181B' : '#EAE41E'}
                bgColor={month === 10 ? '#EAE41E' : 'black'}>
                <Text color={month === 10 ? 'black' : '#EAE41E'}>Octobers</Text>
              </Button>
              <Button
                onPress={() => {
                  setMonth(11);
                }}
                borderWidth={2}
                borderColor={month === 11 ? '#18181B' : '#EAE41E'}
                bgColor={month === 11 ? '#EAE41E' : 'black'}>
                <Text color={month === 11 ? 'black' : '#EAE41E'}>November</Text>
              </Button>
              <Button
                onPress={() => {
                  setMonth(12);
                }}
                borderWidth={2}
                borderColor={month === 12 ? '#18181B' : '#EAE41E'}
                bgColor={month === 12 ? '#EAE41E' : 'black'}>
                <Text color={month === 12 ? 'black' : '#EAE41E'}>Desember</Text>
              </Button>
              <Button
                onPress={() => {
                  setMonth(1);
                }}
                borderWidth={2}
                borderColor={month === 1 ? '#18181B' : '#EAE41E'}
                bgColor={month === 1 ? '#EAE41E' : 'black'}>
                <Text color={month === 1 ? 'black' : '#EAE41E'}>January</Text>
              </Button>
              <Button
                onPress={() => {
                  setMonth(2);
                }}
                borderWidth={2}
                borderColor={month === 2 ? '#18181B' : '#EAE41E'}
                bgColor={month === 2 ? '#EAE41E' : 'black'}>
                <Text color={month === 2 ? 'black' : '#EAE41E'}>February</Text>
              </Button>
              <Button
                onPress={() => {
                  setMonth(3);
                }}
                borderWidth={2}
                borderColor={month === 3 ? '#18181B' : '#EAE41E'}
                bgColor={month === 3 ? '#EAE41E' : 'black'}>
                <Text color={month === 3 ? 'black' : '#EAE41E'}>March</Text>
              </Button>
              <Button
                onPress={() => {
                  setMonth(4);
                }}
                borderWidth={2}
                borderColor={month === 4 ? '#18181B' : '#EAE41E'}
                bgColor={month === 4 ? '#EAE41E' : 'black'}>
                <Text color={month === 4 ? 'black' : '#EAE41E'}>April</Text>
              </Button>
              <Button
                onPress={() => {
                  setMonth(5);
                }}
                borderWidth={2}
                borderColor={month === 5 ? '#18181B' : '#EAE41E'}
                bgColor={month === 5 ? '#EAE41E' : 'black'}>
                <Text color={month === 5 ? 'black' : '#EAE41E'}>Mey</Text>
              </Button>
              <Button
                onPress={() => {
                  setMonth(6);
                }}
                borderWidth={2}
                borderColor={month === 6 ? '#18181B' : '#EAE41E'}
                bgColor={month === 6 ? '#EAE41E' : 'black'}>
                <Text color={month === 6 ? 'black' : '#EAE41E'}>June</Text>
              </Button>
              <Button
                onPress={() => {
                  setMonth(7);
                }}
                borderWidth={2}
                borderColor={month === 7 ? '#18181B' : '#EAE41E'}
                bgColor={month === 7 ? '#EAE41E' : 'black'}>
                <Text color={month === 7 ? 'black' : '#EAE41E'}>July</Text>
              </Button>
              <Button
                onPress={() => {
                  setMonth(8);
                }}
                borderWidth={2}
                borderColor={month === 8 ? '#18181B' : '#EAE41E'}
                bgColor={month === 8 ? '#EAE41E' : 'black'}>
                <Text color={month === 8 ? 'black' : '#EAE41E'}>August</Text>
              </Button>
            </HStack>
          </ScrollView>
          {/* film */}
          <VStack space={1}>
            <HStack space={1} flexWrap={'wrap'}>
              {movie ? (
                movie?.map((data, index) => (
                  <VStack
                    key={index}
                    space={2}
                    width={'180px'}
                    borderWidth={2}
                    bgColor={'black'}
                    borderColor={'#101012'}
                    borderRadius={'10px'}
                    p={3}>
                    <Image
                      source={{uri: data.picture} || spiderman}
                      alt={'spiderman'}
                      width={'full'}
                      height={'250px'}
                    />
                    <Text color={'#EAE41E'} textAlign={'center'}>
                      {data?.titleMovie}
                    </Text>
                    <Text color={'yellow.500'} textAlign={'center'} height={16}>
                      {data?.genre}
                    </Text>
                    <Button
                      onPress={() =>
                        // navigation.navigate('MovieDetails', {id: movie[0]?.idMovie})
                        navigation.navigate('MovieDetails')
                      }
                      mt={10}
                      bgColor={'#EAE41E'}
                      _pressed={{bgColor: 'yellow.500'}}>
                      <Text color={'black'}>Detail</Text>
                    </Button>
                  </VStack>
                ))
              ) : (
                <Text color={'#EAE41E'} textAlign={'center'}>
                  Data not found
                </Text>
              )}
              {/* <VStack
                space={2}
                width={'1/2'}
                borderWidth={2}
                bgColor={'black'}
                borderColor={'#101012'}
                borderRadius={'10px'}
                p={3}>
                <Image source={spiderman} alt={'spiderman'} />

                <Text color={'#EAE41E'} textAlign={'center'}>
                  {'movie[0]?.titleMovie'}
                </Text>
                <Text color={'yellow.500'} textAlign={'center'} height={16}>
                  {'movie[0]?.genre'}
                </Text>
                <Button
                  onPress={() =>
                    // navigation.navigate('MovieDetails', {id: movie[0]?.idMovie})
                    navigation.navigate('MovieDetails')
                  }
                  mt={10}
                  bgColor={'#EAE41E'}
                  _pressed={{bgColor: 'yellow.500'}}>
                  <Text color={'black'}>Detail</Text>
                </Button>
              </VStack> */}
              {/* <VStack
                space={2}
                width={'1/2'}
                borderWidth={2}
                bgColor={'black'}
                borderColor={'#101012'}
                borderRadius={'10px'}
                p={3}>
                <Image source={lionking} alt={'lionking'} />

                <Text color={'#EAE41E'} textAlign={'center'}>
                  {'movie[1].titleMovie'}
                </Text>
                <Text color={'yellow.500'} textAlign={'center'} height={16}>
                  {'movie[1].genre'}
                </Text>
                <Button
                  onPress={() =>
                    navigation.navigate('MovieDetails', {id: movie[1].idMovie})
                  }
                  mt={10}
                  bgColor={'#EAE41E'}
                  _pressed={{bgColor: 'yellow.500'}}>
                  <Text color={'black'}>Detail</Text>
                </Button>
              </VStack> */}
            </HStack>
          </VStack>
          {/* page navigation */}
          <Center mt={5}>
            <HStack space={3}>
              <Pressable
                onPress={minus}
                justifyContent={'center'}
                alignItems={'center'}
                width={10}
                height={10}
                borderRadius={'10px'}
                _pressed={{bgColor: 'yellow.700'}}
                bgColor={'black'}>
                <Text color={'#EAE41E'}>-</Text>
              </Pressable>
              <Box
                justifyContent={'center'}
                alignItems={'center'}
                width={10}
                height={10}
                borderRadius={'10px'}
                bgColor={'#EAE41E'}>
                <Text color={'black'}>{page}</Text>
              </Box>
              <Pressable
                onPress={add}
                justifyContent={'center'}
                alignItems={'center'}
                width={10}
                height={10}
                borderRadius={'10px'}
                _pressed={{bgColor: 'yellow.700'}}
                bgColor={'black'}>
                <Text color={'#EAE41E'}>+</Text>
              </Pressable>
            </HStack>
          </Center>
        </Box>
        <Fotter />
      </ScrollView>
    </Box>
  );
};

export default ViewAll;
