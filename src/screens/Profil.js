import React from 'react';

import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';
import Icon from 'react-native-vector-icons/dist/Feather';

import profil from '../assets/images/profil.png';

import http from '../helpers/http';
import {useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';

import {useDispatch} from 'react-redux';
import {logoutAction} from '../redux/reducers/authReducers';

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

import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

const prpfilSchema = Yup.object({
  fullName: Yup.string().required('Required'),
  phone: Yup.string()
    .min(10, 'min 10 Character')
    .max(13, 'Max 13 Character')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
});

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
});

const Profil = () => {
  const token = useSelector(state => state.auth.token);
  const decode = jwt_decode(token);
  const userId = decode.id;
  const [user, setUser] = React.useState({});

  const dispatch = useDispatch();

  const [show, setShow] = React.useState(true);
  const [confirmShow, setConfirmShow] = React.useState(true);
  const navigation = useNavigation();

  React.useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfile = async () => {
    try {
      const {data} = await http().get('/users/' + userId);
      setUser(data.results);
    } catch (error) {
      setUser({});
    }
  };
  return (
    <Box>
      <ScrollView>
        <Navbar />
        <HStack bgColor={'black'} px={5} pt={10}>
          <Text
            color={'#EAE41E'}
            flex={1}
            w={'1/2'}
            pb={5}
            textAlign={'center'}
            borderBottomWidth={2}
            borderBottomColor={'#EAE41E'}>
            Details Account
          </Text>
          <Pressable
            flex={1}
            pb={5}
            w={'1/2'}
            onPress={() => {
              navigation.navigate('OrderHistory');
            }}>
            <Text color={'yellow.500'} textAlign={'center'}>
              Order History
            </Text>
          </Pressable>
        </HStack>
        <Box bgColor={'#18181B'} px={5} py={5}>
          <VStack
            bgColor={'black'}
            space={5}
            p={5}
            borderRadius={'10px'}
            my={5}>
            <VStack space={3}>
              <Text color={'yellow.500'}>INFO</Text>
              <Box alignItems={'center'}>
                <Image source={profil} alt={'cineone'} resizeMode={'contain'} />
              </Box>
              <Text color={'#EAE41E'} fontSize={20} textAlign={'center'}>
                {user.fullName + ' ' + user.lastName}
              </Text>
              <Text color={'yellow.500'} textAlign={'center'}>
                Moviegoers
              </Text>
            </VStack>
            <Box
              flex={1}
              borderBottomWidth={'1'}
              borderBottomColor={'yellow.500'}
            />
            <Button
              onPress={() => navigation.navigate('Home')}
              bgColor={'#EAE41E'}
              _pressed={{bgColor: 'yellow.500'}}>
              <Text color={'black'}>Logout</Text>
            </Button>
          </VStack>
          {/* Account Settings */}
          <Text color={'#EAE41E'} fontSize={18}>
            Account Settings
          </Text>
          {/* form profil */}
          <VStack
            bgColor={'black'}
            space={5}
            p={5}
            borderRadius={'10px'}
            my={10}>
            <Formik
              validationSchema={prpfilSchema}
              initialValues={{
                fullName: '',
                phone: '',
                email: '',
              }}>
              {({handleChange, handleBlur, handleSubmit, errors, values}) => (
                <Stack space={3}>
                  <Box>
                    <Text color={'#EAE41E'}>Details Informations</Text>
                    <Box
                      flex={1}
                      borderBottomWidth={'1'}
                      borderBottomColor={'yellow.500'}
                    />
                  </Box>
                  <FormControl isInvalid={errors.fullName}>
                    <FormControl.Label>
                      <Text color={'#EAE41E'}>fullName</Text>
                    </FormControl.Label>
                    <Input
                      height={12}
                      color={'#EAE41E'}
                      onChangeText={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}
                      placeholder={user.fullName + ' ' + user.lastName}
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
                        placeholder={user.phone}
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
                      placeholder={user.email}
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
            onPress={() => navigation.navigate('Profil')}
            bgColor={'#EAE41E'}
            _pressed={{bgColor: 'yellow.500'}}>
            <Text color={'black'}>Update changes</Text>
          </Button>
          {/* resset password */}
          <VStack
            bgColor={'black'}
            space={5}
            p={5}
            borderRadius={'10px'}
            my={10}>
            <Formik
              validationSchema={prpfilSchema}
              initialValues={{
                password: '',
                confirmPassword: '',
              }}>
              {({handleChange, handleBlur, handleSubmit, errors, values}) => (
                <Stack space={3}>
                  <Box>
                    <Text color={'#EAE41E'}>Account and Privacy</Text>
                    <Box
                      flex={1}
                      borderBottomWidth={'1'}
                      borderBottomColor={'yellow.500'}
                    />
                  </Box>
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
                          <Icon
                            name={show ? 'eye-off' : 'eye'}
                            color={'gold'}
                          />
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
                      value={values.password}
                    />
                    {errors.confirmPassword && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.confirmPassword}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                </Stack>
              )}
            </Formik>
          </VStack>
          <Button
            onPress={() => dispatch(logoutAction())}
            bgColor={'#EAE41E'}
            _pressed={{bgColor: 'yellow.500'}}>
            <Text color={'black'}>Update changes</Text>
          </Button>
        </Box>
        <Fotter />
      </ScrollView>
    </Box>
  );
};

export default Profil;
