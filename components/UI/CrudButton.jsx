import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CrudButton = ({
  title,
  onPress,
  width,
  Icon,
  Loading,
  backgroundColor,
  textColor,
  Rtl,
  close,
  disabled,
}) => {
  const windowWidth = Dimensions.get('window').width;

  const [buttonStyles, setButtonStyles] = useState({
    buttonHeight: hp('6%'),
    fontSize: hp('1.8%'),
    iconSize: hp('2%'),
    gap: wp('1%'),
    padding: wp('2%'),
  });

  useEffect(() => {
    if (windowWidth < 750) {
      setButtonStyles({
        buttonHeight: hp('5%'),
        fontSize: hp('1.8%'),
        iconSize: hp('2.2%'),
        gap: wp('1%'),
        padding: wp('3%'),
      });
    } else {
      setButtonStyles({
        buttonHeight: hp('4.5%'),
        fontSize: hp('1.4%'),
        iconSize: hp('2%'),
        gap: wp('.5%'),
        padding: wp('2%'),
      });
    }
  }, [windowWidth]);

  // Set default colors based on title
  let buttonBackgroundColor = backgroundColor;
  let buttonTextColor = textColor;

  if (!backgroundColor || !textColor) {
    switch (title) {
      case 'إضافه':
        buttonBackgroundColor = '#E8F0EE';
        buttonTextColor = '#428C71';
        break;
      case 'تعديل':
        buttonBackgroundColor = '#E8F0EE';
        buttonTextColor = '#227099';
        break;
      case 'حذف':
        buttonBackgroundColor = '#F9EAEB';
        buttonTextColor = '#F15555';
        break;
      case 'جدول زمني':
        buttonBackgroundColor = '#E4EDF2';
        buttonTextColor = '#227099';
        break;
      default:
        buttonBackgroundColor = '#E4EDF2';
        buttonTextColor = '#428C71';
    }
  }
  if (close) {
    buttonBackgroundColor = '#F9EAEB';
    buttonTextColor = '#F15555';
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: buttonBackgroundColor,
        width: width || 'auto',
        height: buttonStyles.buttonHeight,
        borderRadius: 8,
        paddingHorizontal: buttonStyles.padding,
        marginHorizontal: wp('1%'),
        flexDirection: Rtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: buttonStyles.gap,
      }}>
      {Loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <>
          <Text
            style={{
              fontFamily: 'Tajawal-Regular',
              fontSize: buttonStyles.fontSize,
              color: buttonTextColor,
            }}>
            {title}
          </Text>
          {Icon && (
            <Image
              source={Icon}
              style={{
                width: buttonStyles.iconSize,
                height: buttonStyles.iconSize,
                resizeMode: 'contain',
                marginLeft: Rtl ? 0 : wp('1%'),
                marginRight: Rtl ? wp('1%') : 0,
              }}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default CrudButton;

// import React from "react";
// import { View } from "react-native";
// import {
// 	TouchableOpacity,
// 	Text,
// 	Image,
// 	StyleSheet,
// 	ActivityIndicator,
// } from "react-native";

// const CrudButton = ({
// 	title,
// 	onPress,
// 	width,
// 	Icon,
// 	Loading,
// 	backgroundColor,
// 	textColor,
// 	Rtl
// }) => {
// 	// Define styles based on the title prop if custom colors are not provided
// 	let buttonBackgroundColor = backgroundColor;
// 	let buttonTextColor = textColor;

// 	if (!backgroundColor || !textColor) {
// 		switch (title) {
// 			case "إضافه":
// 				buttonBackgroundColor = "#E8F0EE";
// 				buttonTextColor = "#428C71";
// 				break;
// 			case "تعديل":
// 				buttonBackgroundColor = "#E8F0EE";
// 				buttonTextColor = "#227099";
// 				break;
// 			case "حذف":
// 				buttonBackgroundColor = "#F9EAEB";
// 				buttonTextColor = "#F15555";
// 				break;
// 			case "جدول زمني":
// 				buttonBackgroundColor = "#E4EDF2";
// 				buttonTextColor = "#227099";
// 				break;
// 			default:
// 				buttonBackgroundColor = "#E4EDF2"; // Default background
// 				buttonTextColor = "#428C71"; // Default text color
// 		}
// 	}

// 	return (
// 		<TouchableOpacity
// 			style={[
// 				styles.button,
// 				{ backgroundColor: buttonBackgroundColor, width: width || "auto" },
// 				!Rtl && {flexDirection:"row"}
// 			]}
// 			onPress={onPress}>
// 			{Loading ? (
// 				<ActivityIndicator
// 					size="small"
// 					color="#0000ff"
// 				/>
// 			) : (
// 				<>
// 					<Text style={[styles.text, { color: buttonTextColor }]}>{title}</Text>
// 					{Icon && (
// 						<Image
// 							source={Icon}
// 							style={styles.icon}
// 						/>
// 					)}
// 				</>
// 			)}
// 		</TouchableOpacity>
// 	);
// };

// const styles = StyleSheet.create({
// 	button: {
// 		padding: 10,
// 		borderRadius: 8,
// 		marginHorizontal: 5,
// 		flexDirection: "row-reverse",
// 		alignItems: "center",
// 		justifyContent: "center",
// 		gap: 4,
// 	},
// 	text: {
// 		fontFamily: "Tajawal-Regular",
// 		fontSize: 14, // Adjust font size as needed
// 	},
// 	icon: {
// 		width: 15,
// 		height: 15,
// 		marginLeft: 5,
// 	},
// });

// export default CrudButton;

// import React from "react";
// import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
// import { ActivityIndicator } from "react-native";
// const CrudButton = ({ title, onPress, width, Icon, Loading }) => {
// 	// Define styles based on the title prop
// 	let backgroundColor;
// 	let textColor;

// 	switch (title) {
// 		case "إضافه":
// 			backgroundColor = "#E8F0EE";
// 			textColor = "#428C71";
// 			break;
// 		case "تعديل":
// 			backgroundColor = "#E8F0EE";
// 			textColor = "#227099";
// 			break;
// 		case "حذف":
// 			backgroundColor = "#F9EAEB";
// 			textColor = "#F15555";
// 			break;
// 		case "جدول زمني":
// 			backgroundColor= "#E4EDF2";
// 			textColor = "#227099";
// 			break;
// 		default:
// 			backgroundColor = backgroundColor? backgroundColor: "#E4EDF2" ; // Default style
// 			textColor = textColor?textColor:"#428C71";
// 	}

// 	return (
// 		<TouchableOpacity
// 			style={[styles.button, { backgroundColor, width: width || "auto" }]}
// 			onPress={onPress}>
// 			{Loading ? (
// 				<ActivityIndicator
// 					size="small"
// 					color="#0000ff"
// 				/>
// 			) : (
// 				<>
// 					<Text
// 						className="font-tmedium text-sm font-medium"
// 						style={[{ color: textColor }]}>
// 						{title}
// 					</Text>
// 					{Icon && (
// 						<Image
// 							source={Icon}
// 							style={[styles.icon]}
// 						/>
// 					)}
// 				</>
// 			)}
// 		</TouchableOpacity>
// 	);
// };

// const styles = StyleSheet.create({
// 	button: {
// 		padding: 10,
// 		borderRadius: 8,
// 		marginHorizontal: 5,
// 		flexDirection: "row",
// 		alignItems: "center",
// 		fontFamily: "Tajawal-Regular",
// 	},

// 	icon: {
// 		width: 15,
// 		height: 15,
// 		margin: 5,
// 	},
// });

// export default CrudButton;
