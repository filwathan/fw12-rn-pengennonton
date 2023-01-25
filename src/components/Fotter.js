import LogoFotter from '../assets/images/pengennonton.png';
import LogoCineone from '../assets/images/logo-cineone21.png';
import LogoEbuid from '../assets/images/logo-ebuid1.png';
import LogoHiflix from '../assets/images/logo-hiflix.png';
import Icon from 'react-native-vector-icons/dist/Feather';

import {Text, Box, Image, Pressable, HStack, VStack} from 'native-base';

import React from 'react';

const Fotter = () => {
  return (
    <Box bgColor={'black'} px={5} py={10}>
      <VStack space={8}>
        <VStack space={4}>
          <Box>
            <Image
              source={LogoFotter}
              alt={'logo-navbar'}
              width={120}
              height={'24'}
              resizeMode={'center'}
            />
          </Box>
          <Box>
            <Text color={'yellow.500'}>Stop waiting in line. Buy tickets</Text>
            <Text color={'yellow.500'}>
              conveniently, watch movies quietly.
            </Text>
          </Box>
        </VStack>
        <VStack space={4}>
          <Box>
            <Text color={'#EAE41E'} fontWeight={'bold'}>
              Explore
            </Text>
          </Box>
          <HStack space={20}>
            <Pressable>
              <Text color={'yellow.500'}>Home</Text>
            </Pressable>
            <Pressable>
              <Text color={'yellow.500'}>List Movie</Text>
            </Pressable>
          </HStack>
        </VStack>
        <VStack space={4}>
          <Box>
            <Text color={'#EAE41E'} fontWeight={'bold'}>
              Our Sponsor
            </Text>
          </Box>
          <HStack space={5}>
            <Box>
              <Image
                width={20}
                height={20}
                resizeMode={'center'}
                source={LogoEbuid}
                alt="sponsor1"
              />
            </Box>
            <Box>
              <Image
                width={20}
                height={20}
                resizeMode={'center'}
                source={LogoCineone}
                alt="sponsor1"
              />
            </Box>
            <Box>
              <Image
                width={20}
                height={20}
                resizeMode={'center'}
                source={LogoHiflix}
                alt="sponsor1"
              />
            </Box>
          </HStack>
        </VStack>
        <VStack space={8}>
          <Box>
            <Text color={'#EAE41E'} fontWeight={'bold'}>
              Follow us
            </Text>
          </Box>
          <HStack space={10}>
            <Box>
              <Icon name={'facebook'} color={'#EAE41E'} size={20} />
            </Box>
            <Box>
              <Icon name={'instagram'} color={'#EAE41E'} size={20} />
            </Box>
            <Box>
              <Icon name={'twitter'} color={'#EAE41E'} size={20} />
            </Box>
            <Box>
              <Icon name={'youtube'} color={'#EAE41E'} size={20} />
            </Box>
          </HStack>
        </VStack>
        <Box mt={8}>
          <Text color={'yellow.500'}>© 2020 Tickitz. All Rights Reserved.</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Fotter;
