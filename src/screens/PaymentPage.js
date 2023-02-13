import React from 'react';

import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';

import bca from '../assets/images/logo-bca.png';
import ovo from '../assets/images/logo-ovo.png';
import bri from '../assets/images/logo-bri.png';
import dana from '../assets/images/logo-dana.png';
import gopay from '../assets/images/logo-gopay.png';
import visa from '../assets/images/logo-visa.png';

import {
  Text,
  Box,
  Image,
  Button,
  ScrollView,
  HStack,
  VStack,
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
  InputGroup,
  InputLeftAddon,
  Pressable,
} from 'native-base';

import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import http from '../helpers/http';
import {clearTransaction} from '../redux/reducers/transactionReducers';

import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

const paymentSchema = Yup.object({
  fullName: Yup.string(),
  phone: Yup.string().min(10, 'min 10 Character').max(13, 'Max 13 Character'),
  email: Yup.string().email('Invalid email address'),
});

const PaymentPage = () => {
  const token = useSelector(state => state.auth.token);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const transaction = useSelector(state => state.transaction);
  const [payment, setPayment] = React.useState(0);
  const [personal, setPersonal] = React.useState({});

  React.useEffect(() => {
    getProfil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get profile
  const getProfil = async () => {
    try {
      const {data} = await http(token).get('/users/' + transaction.idUser);
      setPersonal(data.results);
    } catch (error) {
      setPersonal({});
    }
  };

  //wantpay submit

  const submitPay = async (value, paymentMethod) => {
    try {
      const wantPay = {
        ...transaction,
        idPayment: paymentMethod,
        seat: transaction.seat.toString(),
        fullName:
          value.fullName || personal.firstName + ' ' + personal.lastName,
        email: value.email || personal?.email,
        phone: value.phone || personal?.phone,
      };
      const {data} = await http(token).post('/orders/', wantPay);
      console.log(data.results);
      dispatch(clearTransaction());
      navigation.navigate('OrderHistory');
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  };
  return (
    <Box>
      <ScrollView>
        <Navbar />
        <HStack bgColor={'black'} px={5} py={10}>
          <Text color={'yellow.500'} flex={1}>
            Total Payment
          </Text>
          <Text color={'#EAE41E'} fontSize={18} fontWeight={'bold'}>
            $ {transaction.total}
          </Text>
        </HStack>
        <Box bgColor={'#18181B'} px={5} py={10}>
          <Text color={'#EAE41E'} fontSize={18}>
            Payment Method
          </Text>
          <VStack
            bgColor={'black'}
            space={5}
            p={5}
            borderRadius={'10px'}
            my={10}>
            <HStack space={3}>
              <Pressable
                onPress={() => setPayment(1)}
                bgColor={payment === 1 ? 'yellow.500' : 'black'}
                w={'1/4'}
                h={10}
                flex={1}
                borderWidth={2}
                borderColor={'yellow.500'}
                borderRadius={'10px'}
                py={3}
                px={5}>
                <Image
                  height={'full'}
                  w={'full'}
                  source={bca}
                  alt={'logo'}
                  resizeMode={'center'}
                />
              </Pressable>
              <Pressable
                onPress={() => setPayment(2)}
                bgColor={payment === 2 ? 'yellow.500' : 'black'}
                w={'1/4'}
                h={10}
                flex={1}
                borderWidth={2}
                borderColor={'yellow.500'}
                borderRadius={'10px'}
                py={3}
                px={5}>
                <Image
                  height={'full'}
                  w={'full'}
                  source={ovo}
                  alt={'logo'}
                  resizeMode={'center'}
                />
              </Pressable>
              <Pressable
                onPress={() => setPayment(3)}
                bgColor={payment === 3 ? 'yellow.500' : 'black'}
                w={'1/4'}
                h={10}
                flex={1}
                borderWidth={2}
                borderColor={'yellow.500'}
                borderRadius={'10px'}
                py={3}
                px={5}>
                <Image
                  height={'full'}
                  w={'full'}
                  source={bri}
                  alt={'logo'}
                  resizeMode={'center'}
                />
              </Pressable>
            </HStack>
            <HStack space={3}>
              <Pressable
                onPress={() => setPayment(4)}
                bgColor={payment === 4 ? 'yellow.500' : 'black'}
                w={'1/4'}
                h={10}
                flex={1}
                borderWidth={2}
                borderColor={'yellow.500'}
                borderRadius={'10px'}
                py={3}
                px={5}>
                <Image
                  height={'full'}
                  w={'full'}
                  source={dana}
                  alt={'logo'}
                  resizeMode={'center'}
                />
              </Pressable>
              <Pressable
                onPress={() => setPayment(5)}
                bgColor={payment === 5 ? 'yellow.500' : 'black'}
                w={'1/4'}
                h={10}
                flex={1}
                borderWidth={2}
                borderColor={'yellow.500'}
                borderRadius={'10px'}
                py={3}
                px={5}>
                <Image
                  height={'full'}
                  w={'full'}
                  source={gopay}
                  alt={'logo'}
                  resizeMode={'center'}
                />
              </Pressable>
              <Pressable
                onPress={() => setPayment(6)}
                bgColor={payment === 6 ? 'yellow.500' : 'black'}
                w={'1/4'}
                h={10}
                flex={1}
                borderWidth={2}
                borderColor={'yellow.500'}
                borderRadius={'10px'}
                py={3}
                px={5}>
                <Image
                  height={'full'}
                  w={'full'}
                  source={visa}
                  alt={'logo'}
                  resizeMode={'center'}
                />
              </Pressable>
            </HStack>
            <HStack space={3}>
              <Box
                flex={1}
                borderBottomWidth={'1'}
                borderBottomColor={'yellow.500'}
              />
              <Text color={'yellow.500'}> or </Text>
              <Box
                flex={1}
                borderBottomWidth={'1'}
                borderBottomColor={'yellow.500'}
              />
            </HStack>
            <HStack justifyContent={'center'}>
              <Text color={'yellow.500'}>Pay visa cash </Text>
              <Text color={'#EAE41E'} fontWeight={'bold'}>
                See how it work
              </Text>
            </HStack>
          </VStack>
          <Text color={'#EAE41E'} fontSize={18}>
            Personal Info
          </Text>
          {/* <VStack
            bgColor={'black'}
            space={5}
            p={5}
            borderRadius={'10px'}
            my={10}> */}
          <Formik
            validationSchema={paymentSchema}
            initialValues={{
              fullName: '',
              phone: '',
              email: '',
            }}
            onSubmit={values => {
              submitPay(values, payment);
            }}>
            {({handleChange, handleBlur, handleSubmit, errors, values}) => (
              <>
                <VStack
                  bgColor={'black'}
                  space={5}
                  p={5}
                  borderRadius={'10px'}
                  my={10}>
                  <Stack space={3}>
                    <FormControl isInvalid={errors.fullName}>
                      <FormControl.Label>
                        <Text color={'#EAE41E'}>fullName</Text>
                      </FormControl.Label>
                      <Input
                        height={12}
                        color={'#EAE41E'}
                        onChangeText={handleChange('fullName')}
                        onBlur={handleBlur('fullName')}
                        defaultValue={
                          personal.firstName + ' ' + personal.lastName
                        }
                        // value={
                        //   values.fullName ||
                        //   personal.firstName + ' ' + personal.lastName
                        // }
                      />
                      {errors.fullName && (
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}>
                          {errors.fullName}
                        </FormControl.ErrorMessage>
                      )}
                    </FormControl>
                    <FormControl isInvalid={errors.phone}>
                      <FormControl.Label>
                        <Text color={'#EAE41E'}>phone</Text>
                      </FormControl.Label>
                      <InputGroup>
                        <InputLeftAddon children={'+62'} />
                        <Input
                          height={12}
                          w={'85%'}
                          color={'#EAE41E'}
                          onChangeText={handleChange('phone')}
                          onBlur={handleBlur('phone')}
                          placeholder={personal.phone}
                          defaultValue={personal.phone}
                          value={values.phone || personal.phone}
                        />
                      </InputGroup>

                      {errors.phone && (
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}>
                          {errors.phone}
                        </FormControl.ErrorMessage>
                      )}
                    </FormControl>
                    <FormControl isInvalid={errors.email}>
                      <FormControl.Label>
                        <Text color={'#EAE41E'}>email</Text>
                      </FormControl.Label>
                      <Input
                        height={12}
                        color={'#EAE41E'}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        placeholder={personal.email}
                        defaultValue={personal.email}
                        value={values.email || personal.email}
                      />
                      {errors.email && (
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}>
                          {errors.email}
                        </FormControl.ErrorMessage>
                      )}
                    </FormControl>
                  </Stack>
                </VStack>
                <Button
                  onPress={handleSubmit}
                  mt={10}
                  bgColor={'#EAE41E'}
                  _pressed={{bgColor: 'yellow.500'}}>
                  <Text color={'black'}>Pay your Order</Text>
                </Button>
              </>
            )}
          </Formik>
          {/* </VStack> */}
          {/* <Button
            onPress={() => navigation.navigate('OrderHistory')}
            mt={10}
            bgColor={'#EAE41E'}
            _pressed={{bgColor: 'yellow.500'}}>
            <Text color={'black'}>Pay your Order</Text>
          </Button> */}
        </Box>
        <Fotter />
      </ScrollView>
    </Box>
  );
};

export default PaymentPage;
