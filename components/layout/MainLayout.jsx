import Header from './header';
import { View, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import Loader from '../UI/Loader';
import Toast from 'react-native-toast-message';
import { toastMessege } from '../../constants';
import CustomMenu from './CustomMenu';

const MainLayout = ({
  children,
  title,
  loading = false,
  hasLeftComponent = false,
  toast,
  onNavClick,
}) => {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (toast?.type && !toast?.modal) {
      Toast.show({
        type: toast?.type,
        text1: !toast.text1
          ? toast.type === 'error'
            ? toastMessege.failure
            : toastMessege.success
          : toast.text1,
        text2: !toast.text2
          ? toast.type === 'error'
            ? toastMessege.serverError
            : toastMessege.serverSuccess
          : toast.text2,
        autoHide: true,

        visibilityTime: 1500,
        text1Style: {
          textAlign: 'right',
          fontFamily: 'Tajawal-Bold',
          fontSize: 16,
        },
        text2Style: {
          textAlign: 'right',
          fontFamily: 'Tajawal-Regular',
          fontSize: 14,
        },
      });
    }
  }, [toast]);

  const onDrawerPress = () => {
    setMenu(true);
  };

  return (
    <SafeAreaView className={`flex-1`}>
      <CustomMenu
        modalVisible={menu}
        setModalVisible={() => {
          setMenu(false);
        }}
      />

      <Header
        onDrawerPress={() => onDrawerPress()}
        hasLeftComponent={hasLeftComponent}
        title={title}
        onNavClick={onNavClick}
      />

      <View style={{ flex: 1 }}>
        {loading ? (
          <Loader minus={140} isLoading={loading} />
        ) : (
          <View className="flex-1">{children}</View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default MainLayout;
