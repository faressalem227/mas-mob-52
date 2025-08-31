import { View } from "react-native";
import { MainLayout } from "../../../components";
import SmallButton from "../../../components/UI/SmallButton"
import { useRouter } from "expo-router";
import MainDataLang from "../../../constants/Lang/Invintory/MainDataLang";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { useGlobalContext } from "../../../context/GlobalProvider";
function MainData(){
    const router = useRouter();
    const {Lang}=useGlobalContext();
    return (
        <>
            <MainLayout title={MainDataLang.PageTitle[Lang]}>
                <View className="flex flex-wrap flex-row-reverse justify-center items-center m-auto" style={{ gap: hp("1.5%") }}>
                    {/* <SmallButton
                        title={MainDataLang.SupplierData[Lang]}
                        handlePress={() => router.navigate("/SupplierData")}
                    />
                    <SmallButton
                        title={MainDataLang.Projects[Lang]}
                        handlePress={() => router.navigate("/Projects")}
                    />
               
                    <SmallButton
                        title={MainDataLang.Entities[Lang]}
                        handlePress={() => router.navigate("/Entities")}
                    />
                    <SmallButton
                        title={MainDataLang.Customers[Lang]}
                        handlePress={() => router.navigate("/Clients")}
                    /> */}
              
                    <SmallButton
                        title={MainDataLang.Employees[Lang]}
                        handlePress={() => router.navigate("/Employees")}
                    />
                    <SmallButton
                        title={MainDataLang.InventoryItemData[Lang]}
                        handlePress={() => router.navigate("/StockItems")}
                    />
                </View>
            </MainLayout>
        </>
    );
}

export default MainData;
