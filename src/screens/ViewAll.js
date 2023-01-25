import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';

import spiderman from '../assets/images/spiderman.png';
import lionking from '../assets/images/lion-king.png';

import React from 'react';

import {useNavigation} from '@react-navigation/native';

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
  const navigation = useNavigation();
  const [movie, setMovie] = React.useState([]);
  const [sort, setSort] = React.useState('');
  const [month, setMonth] = React.useState(8);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [sortBy, setSortBy] = React.useState('');

  React.useEffect(() => {
    getAllMovie();
  }, []);

  const getAllMovie = async () => {
    try {
      const {data} = await http().get('/movies/semua');
      // const {data} = await http().get(
      //   `/movies?page=${1}&limit=${2}&search=${3}&sortBy=${4}&sort=${5}`,
      //   page,
      //   limit,
      //   search,
      //   sortBy,
      //   sort,
      // );
      setMovie(data.results);
    } catch (error) {
      setMovie([]);
    }
  };

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
              <Select.Item label={'title'} value={'title'} />
              <Select.Item label={'genre'} value={'genre'} />
            </Select>
            <Input
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
            <HStack space={1}>
              <VStack
                space={2}
                width={'1/2'}
                borderWidth={2}
                bgColor={'black'}
                borderColor={'#101012'}
                borderRadius={'10px'}
                p={3}>
                <Image source={spiderman} alt={'spiderman'} />

                <Text color={'#EAE41E'} textAlign={'center'}>
                  {movie[0]?.titleMovie}
                </Text>
                <Text color={'yellow.500'} textAlign={'center'} height={16}>
                  {movie[0]?.genre}
                </Text>
                <Button
                  onPress={() =>
                    navigation.navigate('MovieDetails', {id: movie[0]?.idMovie})
                  }
                  mt={10}
                  bgColor={'#EAE41E'}
                  _pressed={{bgColor: 'yellow.500'}}>
                  <Text color={'black'}>Detail</Text>
                </Button>
              </VStack>
              <VStack
                space={2}
                width={'1/2'}
                borderWidth={2}
                bgColor={'black'}
                borderColor={'#101012'}
                borderRadius={'10px'}
                p={3}>
                <Image source={lionking} alt={'lionking'} />

                <Text color={'#EAE41E'} textAlign={'center'}>
                  {movie[1].titleMovie}
                </Text>
                <Text color={'yellow.500'} textAlign={'center'} height={16}>
                  {movie[1].genre}
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
              </VStack>
            </HStack>
            <HStack space={1}>
              <VStack
                space={2}
                width={'1/2'}
                borderWidth={2}
                bgColor={'black'}
                borderColor={'#101012'}
                borderRadius={'10px'}
                p={3}>
                <Image source={spiderman} alt={'spiderman'} />

                <Text color={'#EAE41E'} textAlign={'center'}>
                  {movie[2].titleMovie}
                </Text>
                <Text color={'yellow.500'} textAlign={'center'} height={16}>
                  {movie[2].genre}
                </Text>
                <Button
                  onPress={() =>
                    navigation.navigate('MovieDetails', {id: movie[2].idMovie})
                  }
                  mt={10}
                  bgColor={'#EAE41E'}
                  _pressed={{bgColor: 'yellow.500'}}>
                  <Text color={'black'}>Detail</Text>
                </Button>
              </VStack>
              <VStack
                space={2}
                width={'1/2'}
                borderWidth={2}
                bgColor={'black'}
                borderColor={'#101012'}
                borderRadius={'10px'}
                p={3}>
                <Image source={lionking} alt={'lionking'} />

                <Text color={'#EAE41E'} textAlign={'center'}>
                  {movie[3].titleMovie}
                </Text>
                <Text color={'yellow.500'} textAlign={'center'} height={16}>
                  {movie[3].genre}
                </Text>
                <Button
                  onPress={() =>
                    navigation.navigate('MovieDetails', {id: movie[3].idMovie})
                  }
                  mt={10}
                  bgColor={'#EAE41E'}
                  _pressed={{bgColor: 'yellow.500'}}>
                  <Text color={'black'}>Detail</Text>
                </Button>
              </VStack>
            </HStack>
          </VStack>
          {/* page navigation */}
          <Center mt={5}>
            <HStack space={3}>
              <Pressable
                onPress={() => {
                  setPage(1);
                }}
                justifyContent={'center'}
                alignItems={'center'}
                width={10}
                height={10}
                borderRadius={'10px'}
                bgColor={page === 1 ? '#EAE41E' : 'black'}>
                <Text color={page === 1 ? 'black' : '#EAE41E'}>1</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setPage(2);
                }}
                justifyContent={'center'}
                alignItems={'center'}
                width={10}
                height={10}
                borderRadius={'10px'}
                bgColor={page === 2 ? '#EAE41E' : 'black'}>
                <Text color={page === 2 ? 'black' : '#EAE41E'}>2</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setPage(3);
                }}
                justifyContent={'center'}
                alignItems={'center'}
                width={10}
                height={10}
                borderRadius={'10px'}
                bgColor={page === 3 ? '#EAE41E' : 'black'}>
                <Text color={page === 3 ? 'black' : '#EAE41E'}>3</Text>
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
