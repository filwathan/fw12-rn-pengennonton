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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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

  const getProfile = async () => {
    try {
      const {data} = await http(token).get('/users/' + userId);
      setUser(data.results);
    } catch (error) {
      setUser({});
    }
  };

  //update profile
  const [firstName, setFirstName] = React.useState('');
  const [phone, setPhone] = React.useState(0);
  const [email, setEmail] = React.useState('');

  const updateProfile = async () => {
    try {
      const form = {
        firstName: firstName || user.firstName,
        phone: phone || user.phone,
        email: email || user.email,
      };
      console.log(form);
      const {data} = await http(token).patch('/users/' + userId, form);
      setUser(data.results);
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  };

  //reset password
  const [errorResetPassword, SetErrorResetPassword] = React.useState('');
  const resetPassword = async value => {
    console.log('hit');
    if (value.password !== value.confirmPassword) {
      SetErrorResetPassword('password must be match');
    } else {
      try {
        const {data} = await http(token).patch('/users/' + userId, value);
        SetErrorResetPassword(data.message);
      } catch (error) {
        console.log('error');
      }
    }
  };

  //open camgal
  const [camgal, setCamgal] = React.useState(false);

  //open camera
  const openCamera = async () => {
    const pic = await launchCamera();
    uploadPhoto(pic.assets[0]);
  };

  //open galery
  const openGalery = async () => {
    const pic = await launchImageLibrary();
    uploadPhoto(pic.assets[0]);
  };

  //upload photo
  const [errorUploadPhoto, setErrorUploadPhoto] = React.useState('');
  const uploadPhoto = async picture => {
    const type = ['jpeg', 'jpg', 'pgn'];
    if (type.includes(picture.type.slice(6))) {
      if (picture.fileSize <= 5000000) {
        try {
          const form = new FormData();
          form.append('picture', {
            name: picture.fileName,
            type: picture.type,
            uri: picture.uri,
          });
          const {data} = await http(token).patch('/users/' + userId, form, {
            headers: {
              'Content-type': 'multipart/form-data',
            },
          });
          setUser(data.results);
          setCamgal(!camgal);
          setErrorUploadPhoto('');
        } catch (error) {
          console.log(error);
        }
      } else {
        setCamgal(!camgal);
        setErrorUploadPhoto('file size must under 5MB');
      }
    } else {
      setCamgal(!camgal);
      setErrorUploadPhoto('file extention must jpeg, jpg, or png');
    }
  };

  React.useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, errorResetPassword]);

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
                <Pressable onPress={() => setCamgal(!camgal)}>
                  <Image
                    source={{uri: user.picture} || profil}
                    alt={'cineone'}
                    resizeMode={'contain'}
                    size={150}
                    borderRadius={100}
                  />
                </Pressable>
                {errorUploadPhoto && (
                  <Text py={2} fontSize={'20px'} color={'red.500'}>
                    {errorUploadPhoto}
                  </Text>
                )}
                {camgal && (
                  <Box>
                    <VStack>
                      <Pressable
                        onPress={openCamera}
                        _pressed={{bg: 'yellow.500'}}>
                        <Text py={2} fontSize={'20px'} color={'yellow.700'}>
                          Camera
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={openGalery}
                        _pressed={{bg: 'yellow.500'}}>
                        <Text py={2} fontSize={'20px'} color={'yellow.700'}>
                          Galery
                        </Text>
                      </Pressable>
                    </VStack>
                  </Box>
                )}
              </Box>
              <Text color={'#EAE41E'} fontSize={20} textAlign={'center'}>
                {user.firstName + ' ' + user.lastName}
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
            <Stack space={3}>
              <Box>
                <Text color={'#EAE41E'}>Details Informations</Text>
                <Box
                  flex={1}
                  borderBottomWidth={'1'}
                  borderBottomColor={'yellow.500'}
                />
              </Box>
              <Text color={'#EAE41E'}>firstName</Text>
              <Input
                height={12}
                color={'#EAE41E'}
                onChangeText={value => setFirstName(value)}
                defaultValue={user.firstName}
              />
              <Text color={'#EAE41E'}>phone</Text>
              <InputGroup>
                <InputLeftAddon children={'+62'} />
                <Input
                  height={12}
                  w={'85%'}
                  color={'#EAE41E'}
                  onChangeText={value => setPhone(value)}
                  defaultValue={user.phone}
                />
              </InputGroup>
              <Text color={'#EAE41E'}>email</Text>
              <Input
                height={12}
                color={'#EAE41E'}
                onChangeText={value => setEmail(value)}
                defaultValue={user.email}
              />
            </Stack>
          </VStack>
          <Button
            // onPress={() => navigation.navigate('Profil')}
            onPress={updateProfile}
            bgColor={'#EAE41E'}
            _pressed={{bgColor: 'yellow.500'}}>
            <Text color={'black'}>Update changes</Text>
          </Button>
          {/* resset password */}
          <Formik
            validationSchema={resetPasswordSchema}
            onSubmit={resetPassword}
            initialValues={{
              password: '',
              confirmPassword: '',
            }}>
            {({handleChange, handleBlur, handleSubmit, errors, values}) => (
              <Box>
                <VStack
                  bgColor={'black'}
                  space={5}
                  p={5}
                  borderRadius={'10px'}
                  my={10}>
                  <Stack space={3}>
                    <Box>
                      <Text color={'#EAE41E'}>Account and Privacy</Text>
                      <Box
                        flex={1}
                        borderBottomWidth={'1'}
                        borderBottomColor={'yellow.500'}
                      />
                    </Box>
                    {errorResetPassword && (
                      <Text color={'red.500'}>{errorResetPassword}</Text>
                    )}
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
                        // value={values.password}
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
                        // value={values.password}
                      />
                      {errors.confirmPassword && (
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}>
                          {errors.confirmPassword}
                        </FormControl.ErrorMessage>
                      )}
                    </FormControl>
                  </Stack>
                </VStack>
                <Button
                  onPress={handleSubmit}
                  bgColor={'#EAE41E'}
                  _pressed={{bgColor: 'yellow.500'}}>
                  <Text color={'black'}>Update changes</Text>
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
        <Fotter />
      </ScrollView>
    </Box>
  );
};

export default Profil;
