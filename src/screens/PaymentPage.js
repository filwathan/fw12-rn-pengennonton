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
} from 'native-base';

import {useNavigation} from '@react-navigation/native';

import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

const paymentSchema = Yup.object({
  fullName: Yup.string().required('Required'),
  phone: Yup.string()
    .min(10, 'min 10 Character')
    .max(13, 'Max 13 Character')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
});

const PaymentPage = () => {
  const navigation = useNavigation();
  return (
    <Box>
      <ScrollView>
        <Navbar />
        <HStack bgColor={'black'} px={5} py={10}>
          <Text color={'yellow.500'} flex={1}>
            Total Payment
          </Text>
          <Text color={'#EAE41E'} fontSize={18} fontWeight={'bold'}>
            $30.00
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
              <Box
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
              </Box>
              <Box
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
              </Box>
              <Box
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
              </Box>
            </HStack>
            <HStack space={3}>
              <Box
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
              </Box>
              <Box
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
              </Box>
              <Box
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
              </Box>
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
          <VStack
            bgColor={'black'}
            space={5}
            p={5}
            borderRadius={'10px'}
            my={10}>
            <Formik
              validationSchema={paymentSchema}
              initialValues={{
                fullName: '',
                phone: '',
                email: '',
              }}>
              {({handleChange, handleBlur, handleSubmit, errors, values}) => (
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
                      placeholder="Write your First Name"
                      value={values.fullName}
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
                        placeholder="Write your Phone"
                        value={values.phone}
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
                </Stack>
              )}
            </Formik>
          </VStack>
          <Button
            onPress={() => navigation.navigate('OrderHistory')}
            mt={10}
            bgColor={'#EAE41E'}
            _pressed={{bgColor: 'yellow.500'}}>
            <Text color={'black'}>Pay your Order</Text>
          </Button>
        </Box>
        <Fotter />
      </ScrollView>
    </Box>
  );
};

export default PaymentPage;
