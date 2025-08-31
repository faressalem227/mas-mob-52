import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';

import { useGlobalContext } from '../../context/GlobalProvider';

const InfoDetailes = ({ details = [], containerStyle = '' }) => {
  const { Rtl } = useGlobalContext();

  return (
    <View className={`m-2 mb-4 flex flex-col rounded-lg bg-[#F6F6F6] px-4 py-2 ${containerStyle}`}>
      {details.map((item, index) => (
        <View
          key={index}
          className={`${Rtl ? 'flex-row-reverse' : 'flex-row'} gap-2 py-2`}
          style={{
            borderBottomWidth: index === details.length - 1 ? 0 : 1,
            borderColor: '#E4E7EC',
          }}>
          <Text
            className={`font-tmedium ${Rtl ? 'text-right' : 'text-left'}`}>{`${item.label} :`}</Text>
          <Text className={`flex-1 font-tmedium ${Rtl ? 'text-right' : 'text-left'} font-tmedium`}>
            {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default InfoDetailes;
