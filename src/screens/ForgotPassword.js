import React from 'react';
import {
  Text,
  Stack,
  Image,
  Box,
  FormControl,
  Input,
  ScrollView,
  Button,
  WarningOutlineIcon,
} from 'native-base';
import logo from '../assets/images/logo-L-rb.png';

import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

import {useNavigation} from '@react-navigation/native';
import http from '../helpers/http';

const forgotPasswordSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
});

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [messageError, setMessageError] = React.useState();

  const forgotPass = async value => {
    try {
      const form = {
        email: value.email,
      };
      const {data} = await http().post('/auth/forgotPassword', form);
      console.log(data);
      setMessageError(data.message);
      navigation.navigate('ResetPassword', {email: value.email});
    } catch (error) {
      console.log(error.response.data.message);
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
            FORGOT PASSWORD
          </Text>
          <Text color={'yellow.500'}>
            we'll send a link to your email shortly
          </Text>
          {messageError && <Text color={'red.500'}>{messageError}</Text>}
        </Box>
        <Formik
          validationSchema={forgotPasswordSchema}
          onSubmit={forgotPass}
          initialValues={{
            email: '',
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
              <Box>
                <Button
                  onPress={handleSubmit}
                  marginY={5}
                  bgColor={'#EAE41E'}
                  _pressed={{bg: 'yellow.500'}}>
                  <Text color={'black'}>send</Text>
                </Button>
              </Box>
            </Stack>
          )}
        </Formik>
      </ScrollView>
    </Box>
  );
};

export default ForgotPassword;
