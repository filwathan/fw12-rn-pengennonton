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
  VStack,
} from 'native-base';
import logo from '../assets/images/logo-L-rb.png';

import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {loginAction} from '../redux/actions/authAction';

const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .password()
    .minUppercase(1, 'min have 1 capital character')
    .minNumbers(1, 'min have 1 number')
    .minSymbols(1, 'min have 1 symbol')
    .required('Required'),
});

const Login = () => {
  const [show, setShow] = React.useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loginSubmit = value => {
    dispatch(loginAction({value}));
  };
  return (
    <Box height={'full'} paddingX={5} paddingY={10} bgColor={'black'}>
      <ScrollView>
        <Box>
          <Image source={logo} alt="logo" resizeMode="contain" />
        </Box>
        <Box mb={5}>
          <Text color={'#EAE41E'} fontWeight="bold" fontSize={20}>
            LOGIN
          </Text>
          <Text color={'yellow.500'}>
            Login with your data that you entered during your registration
          </Text>
        </Box>
        <Formik
          validationSchema={loginSchema}
          onSubmit={loginSubmit}
          initialValues={{
            email: '',
            password: '',
          }}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <Stack space={3}>
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
              <Box>
                <Button
                  onPress={handleSubmit}
                  marginY={5}
                  bgColor={'#EAE41E'}
                  _pressed={{bg: 'yellow.500'}}>
                  <Text color={'black'}>Login</Text>
                </Button>
              </Box>
            </Stack>
          )}
        </Formik>
        <VStack space={5}>
          <Box flexDirection={'row'} justifyContent={'center'}>
            <Text color={'yellow.500'}>Forgot your password? </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}>
              <Text color={'#EAE41E'} underline>
                Reset now
              </Text>
            </Pressable>
          </Box>
          <Box flexDirection={'row'} justifyContent={'center'}>
            <Text color={'yellow.500'}>Don’t have an account? </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text color={'#EAE41E'} underline>
                Register
              </Text>
            </Pressable>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Login;
