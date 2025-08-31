import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import api from "../../../../utilities/api";
import {
  MassegeContainer,
  ChatBotStartUp,
  SubmitFormAiChat,
  MainLayout,
} from "../../../../components";
import Toast from "react-native-toast-message";
import { toastMessege } from "../../../../constants";
import MaintenanceHelperLang from "../../../../constants/Lang/Maintenance/WorkOrders/MaintenanceHelperLang";
import { useGlobalContext } from "../../../../context/GlobalProvider";

export default function MaintanaceHelper() {
  const [options, setOptions] = useState([]);
  const [toast, setToast] = useState({
    type: "",
    text1: "",
    text2: "",
    counter: 0,
  });
  const [loader, setloader] = useState(true);
  const [chatStartUP, setChatStartUp] = useState({
    failureDescription: "",
    AssetID: "",
    chating: false,
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [History, setHistory] = useState([]);
  const { Lang  , Rtl} = useGlobalContext(); // Get the current language from global context

  const getAssets = async () => {
    try {
      const { data } = await api.get("/departments");
      const transformedData = data.Assets.map((item) => ({
        value: item.AssetName,
        key: item.AssetID,
      }));
      setOptions(transformedData);
    } catch (error) {
      setToast({
        counter: toast.counter + 1,
        type: "error",
        text2: error.response.data.message
          ? error.response.data.message
          : false,
      });
    } finally {
      setloader(false);
    }
  };

  const startChat = async () => {
    if (!chatStartUP.AssetID || !chatStartUP.failureDescription) {
      setToast({
        counter: toast.counter + 1,
        type: "error",
        text2: MaintenanceHelperLang.Alerts.MissingFields[Lang],
      });
      return;
    }
    setloader(true);
    try {
      const start = {
        AssetID: chatStartUP.AssetID,
        history: [],
        q: chatStartUP.failureDescription,
      };
      const res = await api.post("ai", start);
      setChatStartUp({ ...chatStartUP, chating: true });
      setHistory(res.data.history);
    } catch (err) {
      setToast({
        counter: toast.counter + 1,
        type: "error",
        text2: err.response.data.message ? err.response.data.message : false,
      });
    } finally {
      setloader(false);
    }
  };

  const sendMassege = async (query) => {
    if (!query) {
      setToast({
        counter: toast.counter + 1,
        type: "error",
        text2: MaintenanceHelperLang.Alerts.MissingFields[Lang],
      });
      return false;
    } else {
      setButtonDisabled(true);
      try {
        const res = await api.post("ai", {
          history: History,
          q: query,
          AssetID: chatStartUP.AssetID,
        });

        setHistory(res.data.history);
        setButtonDisabled(false);
        return true;
      } catch (err) {
        setToast({
          counter: toast.counter + 1,
          type: "error",
          text2: err.message ? err.message : false,
        });
        setButtonDisabled(false);
        return true;
      }
    }
  };

  useEffect(() => {
    getAssets();
  }, []);

  const scrollViewRef = useRef(null);
  function scrollViewSizeChanged(height) {
    scrollViewRef.current?.scrollTo({ y: height, animated: true });
  }

  return (
    <MainLayout
      loading={loader}
      toast={toast}
      title={MaintenanceHelperLang.PageTitle[Lang]}
    >
      <>
        {!options.length ? (
          <View className="flex w-full h-full items-center mt-4">
            <Text className="text-lg text-black font-tbold">
              {MaintenanceHelperLang.NoDataMessage[Lang]}
            </Text>
          </View>
        ) : (
          <>
            {!chatStartUP.chating ? (
              <ChatBotStartUp
                startChatBot={startChat}
                setAssets={(v) => {
                  setChatStartUp({ ...chatStartUP, AssetID: v });
                }}
                setfailureDescription={(v) => {
                  setChatStartUp({ ...chatStartUP, failureDescription: v });
                }}
                failureDescription={chatStartUP.failureDescription}
                dropdownOptions={options}
                assetPlaceholder={
                  MaintenanceHelperLang.ChatBotStartUp.AssetPlaceholder[Lang]
                }
                failureDescriptionPlaceholder={
                  MaintenanceHelperLang.ChatBotStartUp.FailureDescriptionPlaceholder[Lang]
                }
                startChatButtonText={
                  MaintenanceHelperLang.ChatBotStartUp.StartChatButton[Lang]
                }
              />
            ) : (
              <>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 140}
                >
                  <ScrollView
                    onContentSizeChange={(width, height) => {
                      scrollViewRef.current?.scrollToEnd({
                        animated: true,
                      });
                    }}
                    ref={scrollViewRef}
                    className="h-[77vh] p-4"
                  >
                    {History.slice(2).map((item, index) => {
                      return <MassegeContainer {...item} key={index} />;
                    }) || (
                      <Text>
                        {MaintenanceHelperLang.ChatMessages.NoMessages[Lang]}
                      </Text>
                    )}
                  </ScrollView>

                  <SubmitFormAiChat
                    buttonDisabled={buttonDisabled}
                    sendMassege={sendMassege}
                  />
                </KeyboardAvoidingView>
              </>
            )}
          </>
        )}
      </>
    </MainLayout>
  );
}