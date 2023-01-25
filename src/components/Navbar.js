import React from 'react';
import logoLrb from '../assets/images/logo-L-rb.png';

import Icon from 'react-native-vector-icons/dist/Feather';
import {Text, Box, Image, Pressable, HStack, VStack} from 'native-base';

import {useNavigation} from '@react-navigation/native';

import {useDispatch} from 'react-redux';
import {logoutAction} from '../redux/reducers/authReducers';

const Navbar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [toggle, setToggle] = React.useState(false);
  return (
    <Box bgColor={'black'} px={5}>
      <HStack alignItems={'center'}>
        <Box flex={1}>
          <Image
            source={logoLrb}
            alt={'logo-navbar'}
            width={100}
            height={10}
            resizeMode={'contain'}
          />
        </Box>
        <Box>
          <Pressable
            onPress={() => {
              setToggle(!toggle);
            }}>
            <Icon name="align-right" size={20} color={'#EAE41E'} />
          </Pressable>
        </Box>
      </HStack>
      {toggle && (
        <VStack>
          <Pressable
            onPress={() => navigation.navigate('Home')}
            _pressed={{bgColor: 'yellow.500'}}
            bgColor={'black'}
            py={2}>
            <Text color={'#EAE41E'} textAlign={'center'} fontSize={15}>
              Home
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('ViewAll')}
            _pressed={{bgColor: 'yellow.500'}}
            bgColor={'black'}
            py={2}>
            <Text color={'#EAE41E'} textAlign={'center'} fontSize={15}>
              List Movie
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Profil')}
            _pressed={{bgColor: 'yellow.500'}}
            bgColor={'black'}
            py={2}>
            <Text color={'#EAE41E'} textAlign={'center'} fontSize={15}>
              Profile
            </Text>
          </Pressable>
          <Pressable
            onPress={() => dispatch(logoutAction())}
            _pressed={{bgColor: 'yellow.500'}}
            bgColor={'black'}
            py={2}>
            <Text color={'#EAE41E'} textAlign={'center'} fontSize={15}>
              Logout
            </Text>
          </Pressable>
        </VStack>
      )}
    </Box>
  );
};

export default Navbar;
