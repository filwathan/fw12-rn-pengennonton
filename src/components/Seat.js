import {Box, HStack, Pressable} from 'native-base';
import React from 'react';

const Seat = () => {
  return (
    <HStack space={1}>
      <Pressable
        width={3}
        height={3}
        bgColor={'#18181B'}
        _pressed={{bgColor: 'yellow.900'}}
      />
      <Pressable
        width={3}
        height={3}
        bgColor={'#18181B'}
        _pressed={{bgColor: 'yellow.900'}}
      />
      <Pressable
        width={3}
        height={3}
        bgColor={'#18181B'}
        _pressed={{bgColor: 'yellow.900'}}
      />
      <Pressable
        width={3}
        height={3}
        bgColor={'#18181B'}
        _pressed={{bgColor: 'yellow.900'}}
      />
      <Pressable
        width={3}
        height={3}
        bgColor={'#18181B'}
        _pressed={{bgColor: 'yellow.900'}}
      />
      <Pressable
        width={3}
        height={3}
        bgColor={'#18181B'}
        _pressed={{bgColor: 'yellow.900'}}
      />
      <Pressable
        width={3}
        height={3}
        bgColor={'#18181B'}
        _pressed={{bgColor: 'yellow.900'}}
      />
      <Pressable
        width={3}
        height={3}
        bgColor={'#18181B'}
        _pressed={{bgColor: 'yellow.900'}}
      />
    </HStack>
  );
};

export default Seat;
