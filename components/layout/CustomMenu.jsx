import { View, Text, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import MainButton from '../UI/MainButton';
import { useGlobalContext } from '../../context/GlobalProvider';
import CustomMenuText, { lang } from '../../constants/Lang/components/CustomMenu';
import { icons } from '../../constants';
import { TouchableNativeFeedback } from 'react-native';
import DropdownComponent from '../UI/DropDown';
import CustomMenuLang from '../../constants/Lang/CustomMenuLang';
const CustomMenu = ({ modalVisible, setModalVisible }) => {
  const { logOut, user, Rtl, Lang, setLang, setRtl } = useGlobalContext();
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (e) {
      //console.log(e);
    }
  };
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {/* <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
          }}> */}
          {/* <View className={`z-10  h-full w-[100%] items-end bg-[#2b2b2b70]`}> */}
            {/* <TouchableWithoutFeedback onPress={() => {}}> */}
              <View className={`z-40 h-full w-[80%] bg-white pt-[80px]`}>
                <View className="border-b border-b-[#E4E7EC]  p-4 " style={styles.itemContainer}>
                  <View
                    className={`flex-row-reverse items-center justify-between ${!Rtl && 'flex-row'}`}>
                    <View className={`flex-row-reverse items-center gap-2  ${!Rtl && 'flex-row'}`}>
                      <Image 
                      style={{
              width: 30,
              height: 30,
            }}
                      
                      resizeMode="contain" source={icons.User} />
                      <Text className="font-tregular" style={styles.paragraph}>
                        {user ? user.username : ''}
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  className="border-b border-b-[#E4E7EC]  p-4 "
                  style={styles.itemContainer}>
                  <View
                    className={`flex-row-reverse items-center justify-between ${!Rtl && 'flex-row'}`}>
                    <View className={`flex-row-reverse items-center gap-2 ${!Rtl && 'flex-row'}`}>
                      <Image style={{
              width: 30,
              height: 30,
            }} resizeMode="contain" source={icons.House} />
                      <Text className="font-tregular" style={styles.paragraph}>
                        {CustomMenuLang.HomePage[Lang]}
                      </Text>
                    </View>
                    <Image source={icons.CaretLeft} style={{
              width: 30,
              height: 30,
            }} />
                  </View>
                </TouchableOpacity>
                <View className="border-b border-b-[#E4E7EC]  p-4 " style={styles.itemContainer}>
                  <View
                    className={`flex-row-reverse items-center justify-between ${!Rtl && 'flex-row'}`}>
                    <View className={`flex-row-reverse items-center gap-2 ${!Rtl && 'flex-row'}`}>
                      <Image style={{
              width: 30,
              height: 30,
            }} resizeMode="contain" source={icons.Globe} />
                      <Text className="font-tregular" style={styles.paragraph}>
                        {CustomMenuLang.Country[Lang]}
                      </Text>
                    </View>
                    <Image source={icons.egyptFlag} style={{
              width: 30,
              height: 30,
            }} />
                  </View>
                </View>
                <View className="border-b border-b-[#E4E7EC]  p-4 " style={styles.itemContainer}>
                  <View
                    className={`flex-row-reverse items-center justify-between ${!Rtl && 'flex-row'}`}>
                    <View className={`flex-row-reverse items-center gap-2 ${!Rtl && 'flex-row'}`}>
                      <Image
                        style={{
              width: 30,
              height: 30,
            }}
                        resizeMode="contain"
                        source={icons.notifcationBell}
                      />
                      <Text className="font-tregular" style={styles.paragraph}>
                        {CustomMenuLang.Alerts[Lang]}
                      </Text>
                    </View>
                    <Image source={icons.CaretLeft} style={{
              width: 30,
              height: 30,
            }} />
                  </View>
                </View>

                <View
                  className="border-b border-b-[#E4E7EC]  p-4 "
                  // style={styles.itemContainer}
                >
                  <DropdownComponent
                    data={lang}
                    value={Lang}
                    onChange={(v) => {
                      console.log(v, '4444444444444444444');

                      if (v == 1) {
                        setRtl(true);
                      } else {
                        setRtl(false);
                      }
                      setLang(v);
                    }}
                    initailOption={Lang}
                    flag={true}
                    placeholder={CustomMenuText.langDropDown[Lang]}
                    label={CustomMenuText.langDropDown[Lang]}
                  />
                </View>

                <View className="mx-4 mt-[40px]">
                  <MainButton
                    icon={icons.SignOut}
                    iconStyles={''}
                    containerStyles={'flex'}
                    handlePress={handleLogOut}
                    title={CustomMenuLang.SignOut[Lang]}></MainButton>
                </View>
              </View>
            {/* </TouchableWithoutFeedback> */}
          {/* </View> */}
        {/* </TouchableWithoutFeedback> */}
      </Modal>
    </View>
  );
};

export default CustomMenu;

const styles = {
  paragraph: { fontFamily: 'Tajawal-Regular', fontSize: 16 },
};
