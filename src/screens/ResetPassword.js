import React from 'react';
import Icon from 'react-native-vector-icons/dist/Feather';
import {
  Text,
  Stack,
  Image,
  Box,
  FormControl,
  Input,
  Pressable,
  ScrollView,
  Button,
  WarningOutlineIcon,
} from 'native-base';
import logo from '../assets/images/logo-L-rb.png';

import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

import {useNavigation, useRoute} from '@react-navigation/native';
import http from '../helpers/http';

const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .password()
    .minUppercase(1, 'min have 1 capital character')
    .minNumbers(1, 'min have 1 number')
    .minSymbols(1, 'min have 1 symbol')
    .required('Required'),
  confirmPassword: Yup.string()
    .password()
    .minUppercase(1, 'min have 1 capital character')
    .minNumbers(1, 'min have 1 number')
    .minSymbols(1, 'min have 1 symbol')
    .required('Required'),
  code: Yup.string().required('Required'),
});

const ResetPassword = () => {
  const route = useRoute();
  const [show, setShow] = React.useState(true);
  const [confirmShow, setConfirmShow] = React.useState(true);
  const navigation = useNavigation();
  const [messageError, setMessageError] = React.useState();

  const ressetPass = async value => {
    try {
      const form = {
        email: route.params.email,
        password: value.password,
        confirmPassword: value.confirmPassword,
        code: value.code,
      };
      const {data} = await http().post('/auth/resetPassword', form);
      navigation.navigate('Login');
    } catch (error) {
      if (error.response.data.message.includes('expired code')) {
        navigation.navigate('ForgotPassword');
      }
      setMessageError(error.response.data.message);
    }
  };
  return (
    <Box height={'full'} paddingX={5} paddingY={10} bgColor={'black'}>
      <ScrollView>
        <Box>
          <Image source={logo} alt="logo" resizeMode="contain" />
        </Box>
        <Box mb={5}>
          <Text color={'#EAE41E'} fontWeight="bold" fontSize={20}>
            ResetPassword
          </Text>
          <Text color={'yellow.500'}>
            ResetPassword with your data that you entered during your
            registration
          </Text>
          {messageError && <Text color={'red.500'}>{messageError}</Text>}
        </Box>
        <Formik
          validationSchema={resetPasswordSchema}
          onSubmit={ressetPass}
          initialValues={{
            password: '',
            confirmPassword: '',
            code: '',
          }}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <Stack space={3}>
              <FormControl isInvalid={errors.password}>
                <FormControl.Label>
                  <Text color={'#EAE41E'}>password</Text>
                </FormControl.Label>
                <Input
                  type={show ? 'password' : 'text'}
                  InputRightElement={
                    <Pressable
                      height={'full'}
                      width={10}
                      justifyContent={'center'}
                      alignItems={'center'}
                      mr={2}
                      color={'#EAE41E'}
                      onPress={() => {
                        setShow(!show);
                      }}>
                      <Icon name={show ? 'eye-off' : 'eye'} color={'gold'} />
                    </Pressable>
                  }
                  height={12}
                  color={'#EAE41E'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Write your password"
                  value={values.password}
                />
                {errors.password && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.password}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.confirmPassword}>
                <FormControl.Label>
                  <Text color={'#EAE41E'}>confirmPassword</Text>
                </FormControl.Label>
                <Input
                  type={confirmShow ? 'password' : 'text'}
                  InputRightElement={
                    <Pressable
                      height={'full'}
                      width={10}
                      justifyContent={'center'}
                      alignItems={'center'}
                      mr={2}
                      color={'#EAE41E'}
                      onPress={() => {
                        setConfirmShow(!confirmShow);
                      }}>
                      <Icon
                        name={confirmShow ? 'eye-off' : 'eye'}
                        color={'gold'}
                      />
                    </Pressable>
                  }
                  height={12}
                  color={'#EAE41E'}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder="Write your confirmPassword"
                  value={values.confirmPassword}
                />
                {errors.confirmPassword && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.confirmPassword}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.code}>
                <FormControl.Label>
                  <Text color={'#EAE41E'}>code</Text>
                </FormControl.Label>
                <Input
                  height={12}
                  color={'#EAE41E'}
                  onChangeText={handleChange('code')}
                  onBlur={handleBlur('code')}
                  placeholder="Write your code"
                  value={values.code}
                />
                {errors.code && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.code}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <Box>
                <Button
                  onPress={handleSubmit}
                  marginY={5}
                  bgColor={'#EAE41E'}
                  _pressed={{bg: 'yellow.500'}}>
                  <Text color={'black'}>Send</Text>
                </Button>
              </Box>
            </Stack>
          )}
        </Formik>
      </ScrollView>
    </Box>
  );
};

export default ResetPassword;
