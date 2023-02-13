import {Box, HStack, Pressable, FlatList, ScrollView} from 'native-base';
import React from 'react';

const seatAlphabeth = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const Seat = ({max = 7, startNum = 1, onChange, selected}) => {
  return (
    <ScrollView horizontal={true}>
      <FlatList
        ItemSeparatorComponent={() => <Box h={2} />}
        data={seatAlphabeth}
        renderItem={({item}) => (
          <HStack space={1}>
            {[...Array(max)].map((_v, index) => {
              return (
                <Pressable
                  width={'14px'}
                  key={startNum + index}
                  height={'14px'}
                  onPress={() => onChange(item.concat(startNum + index))}
                  bgColor={
                    selected.includes(item.concat(startNum + index))
                      ? 'yellow.500'
                      : '#18181B'
                  }
                  _pressed={{bgColor: 'yellow.900'}}
                />
              );
            })}
          </HStack>
        )}
      />
    </ScrollView>
  );
};

export default Seat;
