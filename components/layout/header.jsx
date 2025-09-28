import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Get screen width once
const windowWidth = Dimensions.get('window').width;
const initialFontSize = windowWidth < 800 ? wp('4.3%') : wp('2.5%');

const Header = ({ title, hasLeftComponent = false, onDrawerPress, onNavClick }) => {
  const router = useRouter();
  const { Rtl } = useGlobalContext();

  return (
    <View>
      <View style={[styles.header, { height: hp('6%') }]}>
        <Text style={[styles.title, { fontSize: initialFontSize }]} className="font-tbold">
          {title}
        </Text>

        {!hasLeftComponent ? (
          <TouchableOpacity
            className="flex items-center justify-center"
            style={{
              backgroundColor: '#fff',
              padding: 8,
              borderRadius: 25,
              width: 30,
              height: 30,
            }}
            onPress={onNavClick ? onNavClick : () => router.back()}>
            <Image
              source={Rtl ? icons.ArrowRight : icons.leftArrow}
              style={{
                width: initialFontSize,
                height: initialFontSize,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="items-center justify-center rounded-full bg-white"
            style={{
              backgroundColor: '#fff',
              padding: 8,
              borderRadius: 25,
              width: 30,
              height: 30,
            }}
            onPress={onDrawerPress}></TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    marginRight: 16,
  },
});

export default Header;

// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Image,
//   Dimensions,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { colors, roles } from "../../constants";
// import { icons } from "../../constants";
// import { useGlobalContext } from "../../context/GlobalProvider";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";

// import Icon from "react-native-vector-icons/MaterialIcons"; // Import the Icon component

// const Header = ({ title, hasLeftComponent = false, onDrawerPress }) => {
//   const router = useRouter();
//   const { user, Rtl } = useGlobalContext();
//   const [fontSize, setFontSize] = useState(wp("2.5%")); // Default font size
//   const [width, setWidth] = useState();
//   const [windowWidth, setWindowWidth] = useState(
//     Dimensions.get("window").width
//   );
//   useEffect(() => {
//     if (windowWidth < 800) {
//       setFontSize(wp("4%"));
//       setWidth("w-48"); // Set width to 250 px
//     } else {
//       setFontSize(wp("2.5%"));
//       setWidth("w-[80%]"); // Set width to 80%
//     }
//   }, [windowWidth]);

//   return (
//     <View style={styles.containerAll}>
//       <View style={[styles.header, { height: hp("6%") }]}>
//         <Text
//           style={[styles.title, { fontSize }]} // Combine styles correctly
//           className="font-tbold"
//         >
//           {title}
//         </Text>
//         {!hasLeftComponent ? (
//           <TouchableOpacity
//           className="flex justify-center items-center"
//             style={[
//               {
//                 backgroundColor: "#fff",
//                 padding: 8,
//                 borderRadius: 25,
//                 width: hp("4%"),
//                 height: hp("4%"), // Add some spacing between the icon and text
//               },
//             ]}
//             onPress={() => {
//               console.log(router, "router from the report");
//               router.back();
//             }}
//           >
//             <Image
//               source={Rtl ? icons.ArrowRight : icons.leftArrow}
//               style={[
//                 {
//                   borderRadius: 10,
//                   width: fontSize,
//                   height:fontSize, // Add some spacing between the icon and text
//                 },
//               ]}
//               className="flex justify-center items-center"
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity
//             style={[
//               {
//                 backgroundColor: "#fff",
//                 padding: 8,
//                 borderRadius: 25,
//                 width: hp("4%"),
//                 height: hp("4%"), // Add some spacing between the icon and text
//               },
//             ]}
//             className=" justify-center items-center bg-white rounded-full"
//             onPress={onDrawerPress}
//           >
//             <Icon
//               name="menu"
//               size={fontSize}
//               resizeMode="contain"
//               color="#227099"
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   containerAll: {
//     zIndex:0,
//     flexDirection: "column",
//   },
//   topRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   logobar: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: "#ffffff",
//     elevation: -2,
//     height: 58,
//   },
//   headerLeftContainer: {
//     flex: 1,
//     alignItems: "flex-start",
//   },
//   headerRightContainer: {
//     flex: 1,
//     alignItems: "flex-end",
//   },
//   LeftImage: {
//     width: 60,
//     height: 60,
//   },
//   RightImage: {
//     width: 48,
//     height: 48,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     backgroundColor: colors.primary,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//   },
//   leftComponent: {
//     backgroundColor: "white",
//     justifyContent: "center",
//     alignContent: "center",
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//   },
//   leftComponentIcon: {
//     marginRight: 8, // Add some spacing between the icon and text
//   },
//   rightComponent: {
//     backgroundColor: "#fff",
//     padding: 8,
//     borderRadius: 25,
//     marginRight: 8,
//   },
//   rightComponentIcon: {
//     borderRadius: 10,
//     width: 16,
//     height: 16, // Add some spacing between the icon and text
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 14,
//   },
//   title: {
//     fontSize: 14,

//     color: "#fff",
//     marginRight: 16,
//   },
// });

// export default Header;
