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

import {registerAction} from '../redux/actions/authAction';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

const registerSchema = Yup.object({
  firstName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  phone: Yup.string()
    .min(10, 'min 10 Character')
    .max(13, 'Max 13 Character')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .password()
    .minUppercase(1, 'min have 1 capital character')
    .minNumbers(1, 'min have 1 number')
    .minSymbols(1, 'min have 1 symbol')
    .required('Required'),
});

const Register = () => {
  const [show, setShow] = React.useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const register = value => {
    try {
      console.log('hit register');
      dispatch(registerAction({value}));
    } catch (error) {
      console.log('hit error');
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
            REGISTER
          </Text>
          <Text color={'yellow.500'}>Fill your additional details</Text>
        </Box>
        <Formik
          validationSchema={registerSchema}
          onSubmit={register}
          initialValues={{
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
          }}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <Stack space={3}>
              <FormControl isInvalid={errors.firstName}>
                <FormControl.Label>
                  <Text color={'#EAE41E'}>firstName</Text>
                </FormControl.Label>
                <Input
                  height={12}
                  color={'#EAE41E'}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  placeholder="Write your First Name"
                  value={values.firstName}
                />
                {errors.firstName && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.firstName}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.lastName}>
                <FormControl.Label>
                  <Text color={'#EAE41E'}>lastName</Text>
                </FormControl.Label>
                <Input
                  height={12}
                  color={'#EAE41E'}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  placeholder="Write your Last Name"
                  value={values.lastName}
                />
                {errors.lastName && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.lastName}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.phone}>
                <FormControl.Label>
                  <Text color={'#EAE41E'}>phone</Text>
                </FormControl.Label>
                <Input
                  height={12}
                  color={'#EAE41E'}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  placeholder="Write your Phone"
                  value={values.phone}
                />
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
                  marginY={5}
                  onPress={handleSubmit}
                  bgColor={'#EAE41E'}
                  _pressed={{bg: 'yellow.500'}}>
                  <Text color={'black'}>Register</Text>
                </Button>
              </Box>
            </Stack>
          )}
        </Formik>
        <Box flexDirection={'row'} justifyContent={'center'}>
          <Text color={'yellow.500'}>Already have account ? </Text>
          <Pressable
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text color={'#EAE41E'} underline>
              Sign In
            </Text>
          </Pressable>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Register;
