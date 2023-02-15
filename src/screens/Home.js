import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';

import promo from '../assets/images/3-gambar.png';
import spiderman from '../assets/images/spiderman.png';
import lionking from '../assets/images/lion-king.png';

import {
  Text,
  Box,
  Image,
  Pressable,
  Button,
  ScrollView,
  Stack,
  HStack,
  VStack,
  FormControl,
  Input,
  WarningOutlineIcon,
} from 'native-base';
import React, {useEffect} from 'react';

import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

import {useNavigation} from '@react-navigation/native';
import http from '../helpers/http';

const memberSchema = Yup.object({
  email: Yup.string().email('Invalid email address'),
});

const Home = () => {
  const navigation = useNavigation();
  const [nowShowing, setNowShowing] = React.useState([]);
  const [upcoming, setUpcoming] = React.useState([]);
  const [now, setNow] = React.useState(false);
  const [now1, setNow1] = React.useState(false);
  const [month, setMonth] = React.useState(8);
  console.log('home');

  useEffect(() => {
    getNowShowing();
    getUpcoming();
  }, []);

  const getNowShowing = async () => {
    try {
      const {data} = await http().get('/movies/nowShowingMovie');
      setNowShowing(data.results);
    } catch (error) {
      setNowShowing([]);
    }
  };

  const getUpcoming = async () => {
    try {
      const {data} = await http().get('/movies/upcomingMovie');
      setUpcoming(data.results);
    } catch (error) {
      setUpcoming([]);
    }
  };

  return (
    <Box>
      <ScrollView>
        <Navbar />
        <Box>
          {/* promo */}
          <VStack bgColor={'black'} px={5} py={10}>
            <Box>
              <Text color={'yellow.500'}>Nearest Cinema, Newest Movie,</Text>
              <Text color={'#EAE41E'} fontWeight={'bold'} fontSize={32}>
                Find out now!
              </Text>
            </Box>
            <Box>
              <Image source={promo} alt={'promo'} />
            </Box>
          </VStack>
          {/* Now Showing */}
          <VStack space={10} bgColor={'#18181B'} px={5} py={10}>
            <HStack>
              <Text flex={1} color={'#EAE41E'} fontWeight={'bold'}>
                Now Showing
              </Text>
              <Pressable onPress={() => navigation.navigate('ViewAll')}>
                <Text color={'yellow.500'}>view all</Text>
              </Pressable>
            </HStack>
            <ScrollView horizontal>
              <HStack space={5}>
                {nowShowing?.map((data, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setNow(!now);
                    }}>
                    <VStack
                      space={2}
                      borderWidth={2}
                      borderColor={'black'}
                      borderRadius={'10px'}
                      p={5}>
                      <Image
                        source={{uri: data.picture}}
                        alt="kocak"
                        width={'150px'}
                        height={'250px'}
                      />
                      {now && (
                        <VStack space={3}>
                          <Text color={'#EAE41E'} textAlign={'center'}>
                            {data.titleMovie}
                          </Text>
                          <Text color={'yellow.500'} textAlign={'center'}>
                            {data.genre}
                          </Text>
                          <Button
                            onPress={() =>
                              navigation.navigate('MovieDetails', {
                                id: data.idMovie,
                              })
                            }
                            bgColor={'#EAE41E'}
                            _pressed={{bgColor: 'yellow.500'}}>
                            <Text color={'black'}>Detail</Text>
                          </Button>
                        </VStack>
                      )}
                    </VStack>
                  </Pressable>
                ))}
              </HStack>
            </ScrollView>
          </VStack>
          {/* Upcoming */}
          <VStack space={10} bgColor={'black'} px={5} py={10}>
            <HStack>
              <Text flex={1} color={'#EAE41E'} fontWeight={'bold'}>
                Upcoming
              </Text>
              <Pressable onPress={() => navigation.navigate('ViewAll')}>
                <Text color={'yellow.500'}>view all</Text>
              </Pressable>
            </HStack>
            {/* month */}
            <ScrollView horizontal>
              <HStack space={5}>
                <Button
                  onPress={() => {
                    setMonth(9);
                  }}
                  borderWidth={2}
                  borderColor={month === 9 ? '#18181B' : '#EAE41E'}
                  bgColor={month === 9 ? '#EAE41E' : 'black'}>
                  <Text color={month === 9 ? 'black' : '#EAE41E'}>
                    September
                  </Text>
                </Button>
                <Button
                  onPress={() => {
                    setMonth(10);
                  }}
                  borderWidth={2}
                  borderColor={month === 10 ? '#18181B' : '#EAE41E'}
                  bgColor={month === 10 ? '#EAE41E' : 'black'}>
                  <Text color={month === 10 ? 'black' : '#EAE41E'}>
                    Octobers
                  </Text>
                </Button>
                <Button
                  onPress={() => {
                    setMonth(11);
                  }}
                  borderWidth={2}
                  borderColor={month === 11 ? '#18181B' : '#EAE41E'}
                  bgColor={month === 11 ? '#EAE41E' : 'black'}>
                  <Text color={month === 11 ? 'black' : '#EAE41E'}>
                    November
                  </Text>
                </Button>
                <Button
                  onPress={() => {
                    setMonth(12);
                  }}
                  borderWidth={2}
                  borderColor={month === 12 ? '#18181B' : '#EAE41E'}
                  bgColor={month === 12 ? '#EAE41E' : 'black'}>
                  <Text color={month === 12 ? 'black' : '#EAE41E'}>
                    Desember
                  </Text>
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
                  <Text color={month === 2 ? 'black' : '#EAE41E'}>
                    February
                  </Text>
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
            <ScrollView horizontal>
              <HStack space={5}>
                {upcoming?.map((data, index) => (
                  <VStack
                    key={index}
                    space={2}
                    borderWidth={2}
                    borderColor={'#18181B'}
                    borderRadius={'10px'}
                    p={5}>
                    <Image
                      source={{uri: data?.picture}}
                      alt={'spiderman'}
                      width={'150px'}
                      height={'250px'}
                    />
                    <Text color={'#EAE41E'} textAlign={'center'}>
                      {data.titleMovie}
                    </Text>
                    <Text color={'yellow.500'} textAlign={'center'}>
                      {data.genre}
                    </Text>
                    <Button
                      onPress={() =>
                        navigation.navigate('MovieDetails', {id: data.idMovie})
                      }
                      mt={10}
                      bgColor={'#EAE41E'}
                      _pressed={{bgColor: 'yellow.500'}}>
                      <Text color={'black'}>Detail</Text>
                    </Button>
                  </VStack>
                ))}
              </HStack>
            </ScrollView>
          </VStack>
          {/* members */}
          <Box space={10} bgColor={'black'} px={5} py={10}>
            <VStack
              space={10}
              borderWidth={2}
              borderColor={'#18181B'}
              borderRadius={'10px'}
              shadow={'9'}
              px={5}
              py={10}>
              <Box>
                <Text textAlign={'center'} color={'yellow.500'}>
                  Be the vanguard of the
                </Text>
                <Text
                  textAlign={'center'}
                  color={'#EAE41E'}
                  fontWeight={'bold'}
                  fontSize={30}>
                  Moviegoers
                </Text>
              </Box>
              <Box>
                <Formik
                  validationSchema={memberSchema}
                  initialValues={{
                    email: '',
                  }}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                    values,
                  }) => (
                    <Stack space={3}>
                      <FormControl isInvalid={errors.email}>
                        <Input
                          height={12}
                          color={'#EAE41E'}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          placeholder="Write your email"
                          value={values.email}
                        />
                        {errors.email && (
                          <FormControl.ErrorMessage
                            leftIcon={<WarningOutlineIcon size="xs" />}>
                            {errors.email}
                          </FormControl.ErrorMessage>
                        )}
                      </FormControl>
                      <Box>
                        <Button
                          onPress={() => {
                            console.log('kepencet');
                          }}
                          bgColor={'#EAE41E'}
                          _pressed={{bg: 'yellow.500'}}>
                          <Text color={'black'}>Join now</Text>
                        </Button>
                      </Box>
                    </Stack>
                  )}
                </Formik>
              </Box>
              <Box>
                <Text textAlign={'center'} color={'yellow.500'}>
                  By joining you as a Tickitz member,
                </Text>
                <Text textAlign={'center'} color={'yellow.500'}>
                  we will always send you the
                </Text>
                <Text textAlign={'center'} color={'yellow.500'}>
                  latest updates via email.
                </Text>
              </Box>
            </VStack>
          </Box>
        </Box>
        <Fotter />
      </ScrollView>
    </Box>
  );
};

export default Home;
