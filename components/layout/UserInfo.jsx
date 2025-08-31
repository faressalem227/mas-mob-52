import { View, Text, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalProvider';
import { formatDate } from '../../utilities/dateFormater';
import { icons } from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function UserInfo({ title, Rtl }) {
  const { user } = useGlobalContext();
  const lastSeen = formatDate(new Date(user?.lastActive), true);
  const [fontSize, setFontSize] = useState(wp('2.5%')); // Default font size
  const [width, setWidth] = useState();
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  useEffect(() => {
    if (windowWidth < 800) {
      setFontSize(wp('5%'));
      setWidth('w-48'); // Set width to 250 px
    } else {
      setFontSize(wp('3%'));
      setWidth('w-[80%]'); // Set width to 80%
    }
  }, [windowWidth]);

  return (
    <View
      style={{
        margin: wp('4%'),
      }}>
      <Text
        style={{ fontSize: windowWidth < 800 ? wp('5%') : wp('3%') }}
        className={`text-right font-tregular text-[#133E54] ${!Rtl && 'text-left'} `}>
        {title},&nbsp;
        <Text
          className={`mt-1  text-right font-tbold capitalize text-[#133E54] ${!Rtl && 'text-left'}`}
          style={{ fontSize: windowWidth < 800 ? wp('5%') : wp('3%') }}>
          {user ? user?.username : ''}
        </Text>
      </Text>
      <View className="mb-2 flex  flex-col">
        <View className={`mt-1 flex flex-row-reverse items-center gap-1 ${!Rtl && 'flex-row'}`}>
          {/* <Image className="h-4 w-4" source={icons.mapPin}></Image> */}
          <Text
            style={{ fontSize: windowWidth < 800 ? wp('3%') : wp('2%') }}
            className="font-tregular text-[#133E54]">
            {user?.UserDepartmentName}
          </Text>
        </View>
      </View>
    </View>
  );
}
