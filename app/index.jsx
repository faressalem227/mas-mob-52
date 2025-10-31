import '@react-native-firebase/app';

import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, I18nManager } from 'react-native';
import Toast from 'react-native-toast-message';
import { icons } from '../constants';
import { MainButton, FormField, Loader } from '../components';
import { useGlobalContext } from '../context/GlobalProvider';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import '../global.css';

const Welcome = () => {
  const { isLogged, user, loading, checkAuth, login, Rtl, Lang } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  I18nManager.forceRTL(false);
  I18nManager.allowRTL(false);

  const [form, setForm] = useState({
    UserName: '',
    password: '',
  });
  const router = useRouter();

  const submit = async () => {
    if (form.UserName === '' || form.password === '') {
      Toast.show({
        type: 'error',
        text1: Lang === 1 ? 'خطأ' : 'Error',
        text2: Lang === 1 ? 'من فضلك ادخل البيانات المطلوبه' : 'Please enter the required data',
        autoHide: true,
        visibilityTime: 3000,
        text1Style: {
          textAlign: Rtl ? 'right' : 'left',
        },
        text2Style: {
          textAlign: Rtl ? 'right' : 'left',
        },
      });
      return;
    }

    try {
      setSubmitting(true);

      const result = await login(form.UserName, form.password); //fcmToken

      Toast.show({
        type: 'success',
        text1: Lang === 1 ? 'عملية ناجحه' : 'Success',
        text2: Lang === 1 ? 'تم تسجيل الدخول بنجاح' : 'Login successfully',
        autoHide: true,
        visibilityTime: 3000,
        text1Style: {
          textAlign: Rtl ? 'right' : 'left',
        },
        text2Style: {
          textAlign: Rtl ? 'right' : 'left',
        },
      });
    } catch (error) {
      //console.log("error", error);
      Toast.show({
        type: 'error',
        text1: Lang == 1 ? 'فشلت العملية' : 'Error',
        text2: error?.response.data.message,
        autoHide: true,
        visibilityTime: 3000,
        text1Style: {
          textAlign: Rtl ? 'right' : 'left',
        },
        text2Style: {
          textAlign: Rtl ? 'right' : 'left',
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLogged && user) {
      router.replace('/Home');
    }
  }, [isLogged, user]);

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        {loading ? (
          <Loader isLoading={loading} />
        ) : (
          <>
            {/* <LogoBar /> */}
            <View className="my-6 mt-20 px-4" style={{ height: hp('70%') }}>
              <Text className="mb-10 text-center font-tbold text-2xl text-dark">
                {Lang == 1 ? 'تسجيل الدخول' : 'Login to your account'}
              </Text>
              <FormField
                inputStyle={'p-4'}
                title={Lang == 1 ? 'اسم المستخدم' : 'User Name'}
                value={form.UserName}
                handleChangeText={(e) => setForm({ ...form, UserName: e })}
                otherStyles="mt-7"
                keyboardType="email-address"
                icon={icons.User}
                placeholder={Lang == 1 ? 'اسم المستخدم' : 'User Name'}
                inputIconUser={form.UserName && icons.deleteIcon}
                handlePress={() => setForm({ ...form, UserName: '', password: '' })}
              />
              <FormField
                inputStyle={'p-4'}
                title={Lang == 1 ? 'كلمة المرور' : 'Password'}
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="mt-7"
                icon={icons.lock}
                placeholder={Lang == 1 ? 'ادخل كلمة المرور' : 'Enter Your Password'}
              />
              <MainButton
                title={Lang == 1 ? 'تسجيل الدخول' : 'Login'}
                handlePress={submit}
                containerStyles="mt-14"
                isLoading={isSubmitting}
                icon={icons.Signin}
              />
              <MainButton
                title="FOR BEST DEV EXPERIENCE"
                handlePress={() => {
                  setForm({ ...form, UserName: 'host', password: 'Sayed?!Amr' });
                }}
                containerStyles="mt-14"
                isLoading={isSubmitting}
                icon={icons.Signin}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
