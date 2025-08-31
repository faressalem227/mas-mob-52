import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const MainButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  icon,
  iconStyles,
  disabled,
  ActivityIndicatorColor,
  alternative = false,
  Rtl = false,
  width,
}) => {
  const windowWidth = Dimensions.get('window').width;

  const getResponsiveValue = (small, medium, large) => {
    if (windowWidth < 375) return small;
    if (windowWidth < 800) return medium;
    return large;
  };

  const numericWidth = width
    ? typeof width === 'number'
      ? width
      : parseFloat(width.toString().replace('px', ''))
    : undefined;

  const initialButtonWidth = width ? numericWidth * getResponsiveValue(1.1, 1.2, 1) : '100%';

  const initialFontSize = width
    ? getResponsiveValue(numericWidth * 0.07, numericWidth * 0.08, numericWidth * 0.06)
    : getResponsiveValue(wp('3.5%'), wp('5%'), wp('3%'));

  const initialIconSize = width
    ? getResponsiveValue(numericWidth * 0.08, numericWidth * 0.09, numericWidth * 0.07)
    : getResponsiveValue(wp('5.5%'), wp('7%'), wp('5%'));

  const initialMinHeight = width
    ? getResponsiveValue(numericWidth * 0.25, numericWidth * 0.3, numericWidth * 0.2)
    : getResponsiveValue('4.5%', '5%', '8%');

  const [fontSize, setFontSize] = useState(initialFontSize);
  const [buttonWidth, setButtonWidth] = useState(initialButtonWidth);
  const [iconSize, setIconSize] = useState(initialIconSize);
  const [minHeight, setMinHeight] = useState(initialMinHeight);

  useEffect(() => {
    if (width) {
      const numericWidth =
        typeof width === 'number' ? width : parseFloat(width.toString().replace('px', ''));

      const scale = getResponsiveValue(1.1, 1.2, 1);
      setButtonWidth(numericWidth * scale);

      setFontSize(
        getResponsiveValue(numericWidth * 0.07, numericWidth * 0.08, numericWidth * 0.06)
      );

      setIconSize(
        getResponsiveValue(numericWidth * 0.08, numericWidth * 0.09, numericWidth * 0.07)
      );

      setMinHeight(getResponsiveValue(numericWidth * 0.25, numericWidth * 0.3, numericWidth * 0.2));
    } else {
      setFontSize(getResponsiveValue(wp('3.5%'), wp('5%'), wp('3%')));
      setIconSize(getResponsiveValue(wp('5.5%'), wp('7%'), wp('5%')));
      setMinHeight(getResponsiveValue('4.5%', '5%', '8%'));
      setButtonWidth('100%');
    }
  }, [windowWidth, width]);

  const textColor = alternative ? { color: '#227099' } : { color: '#fff' };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={{
        paddingHorizontal: wp('10%'),
        minHeight,
        width: buttonWidth,
      }}
      className={`
        ${alternative ? 'border border-[#227099]' : 'bg-[#227099]'}
        flex flex-row items-center rounded-lg py-3 text-center
        ${isLoading ? 'opacity-50' : ''}
        ${!Rtl ? 'flex-row-reverse' : ''}
        ${containerStyles}
      `}
      disabled={isLoading || disabled}>
      {icon && (
        <Image
          source={icon}
          style={{
            width: iconSize,
            height: iconSize,
            resizeMode: 'contain',
            marginLeft: !Rtl ? 12 : 0,
            marginRight: Rtl ? 20 : 0,
          }}
          className={`${iconStyles}`}
        />
      )}
      <Text
        style={{
          ...textColor,
          fontSize,
          ...(typeof buttonWidth === 'number'
            ? {
                width: windowWidth > 800 ? buttonWidth * 0.5 : buttonWidth * 0.5,
              }
            : {
                width: windowWidth > 750 ? wp('65%') : wp('60%'),
              }),
        }}
        className={`${
          alternative ? 'text-[#227099]' : 'text-[#fff]'
        } text-center font-tmedium ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color={ActivityIndicatorColor ? ActivityIndicatorColor : alternative ? '#227099' : '#fff'}
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default MainButton;

// import { useEffect, useState } from 'react';
// import { ActivityIndicator, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// const MainButton = ({
//   title,
//   handlePress,
//   containerStyles,
//   textStyles,
//   isLoading,
//   icon,
//   iconStyles,
//   disabled,
//   ActivityIndicatorColor,
//   alternative = false,
//   Rtl = false,
//   width,
// }) => {
//   const [fontSize, setFontSize] = useState(wp('2.5%'));
//   const [buttonWidth, setButtonWidth] = useState();
//   const [iconSize, setIconSize] = useState(wp('5%'));
//   const [minHeight, setMinHeight] = useState('8%');
//   const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
//   useEffect(() => {
//     if (width) {
//       const numericWidth =
//         typeof width === 'number' ? width : parseFloat(width.toString().replace('px', ''));

//       setButtonWidth(
//         windowWidth < 375 ? numericWidth * 1.1 : windowWidth < 800 ? numericWidth * 1.2 : numericWidth
//       );
//       setFontSize(
//         windowWidth < 375
//           ? numericWidth * 0.07
//           : windowWidth < 800
//             ? numericWidth * 0.08
//             : numericWidth * 0.06
//       );
//       setIconSize(
//         windowWidth < 375
//           ? numericWidth * 0.08
//           : windowWidth < 800
//             ? numericWidth * 0.09
//             : numericWidth * 0.07
//       );
//       setMinHeight(
//         windowWidth < 375
//           ? numericWidth * 0.25
//           : windowWidth < 800
//             ? numericWidth * 0.3
//             : numericWidth * 0.2
//       );
//     } else {
//       if (windowWidth < 375) {
//         setFontSize(wp('3.5%'));
//         setIconSize(wp('5.5%'));
//         setMinHeight('4.5%');
//         setButtonWidth('100%');
//       } else if (windowWidth < 800) {
//         setFontSize(wp('5%'));
//         setIconSize(wp('7%'));
//         setMinHeight('5%');
//         setButtonWidth('100%');
//       } else {
//         setFontSize(wp('3%'));
//         setIconSize(wp('5%'));
//         setMinHeight('8%');
//         setButtonWidth('100%');
//       }
//     }
//   }, [windowWidth, width]);
//   const textColor = alternative ? { color: '#227099' } : { color: '#fff' };

//   return (
//     <TouchableOpacity
//       onPress={handlePress}
//       activeOpacity={0.7}
//       style={{
//         paddingHorizontal: wp('10%'),
//         minHeight,
//         width: buttonWidth,
//       }}
//       className={`
//         ${alternative ? 'border border-[#227099]' : 'bg-[#227099]'}
//         flex flex-row items-center rounded-lg  py-3 text-center
//         ${isLoading ? 'opacity-50' : ''}
//         ${!Rtl ? 'flex-row-reverse' : ''}
//         ${containerStyles}
//       `}
//       disabled={isLoading || disabled}>
//       {icon && (
//         <Image
//           source={icon}
//           style={{
//             width: iconSize,
//             height: iconSize,
//             resizeMode: 'contain',
//             iconStyles,
//             marginLeft:!Rtl ? "12" : "",
//             marginRight:Rtl ? "20" : "",
//           }}
//           className={`${iconStyles}`}
//         />
//       )}
//       <Text
//         style={{
//           ...textColor,
//           fontSize,
//           ...(typeof buttonWidth === 'number'
//             ? {
//                 width: windowWidth > 800 ? buttonWidth * 0.5 : buttonWidth * 0.5,
//               }
//             : {
//                 width: windowWidth > 750 ? wp('65%') : wp('60%'),
//               }),
//         }}
//         className={`${
//           alternative ? 'text-[#227099]' : 'text-[#fff]'
//         } text-center font-tmedium ${textStyles}`}>
//         {title}
//       </Text>

//       {isLoading && (
//         <ActivityIndicator
//           animating={isLoading}
//           color={ActivityIndicatorColor ? ActivityIndicatorColor : alternative ? '#227099' : '#fff'}
//           size="small"
//           className="ml-2"
//         />
//       )}
//     </TouchableOpacity>
//   );
// };

// export default MainButton;

// // import { useEffect, useState } from "react";
// // import {
// //   ActivityIndicator,
// //   Dimensions,
// //   Image,
// //   Text,
// //   TouchableOpacity,
// // } from "react-native";
// // import {
// //   widthPercentageToDP as wp,
// //   heightPercentageToDP as hp,
// // } from "react-native-responsive-screen";

// // const MainButton = ({
// //   title,
// //   handlePress,
// //   containerStyles,
// //   textStyles,
// //   isLoading,
// //   icon,
// //   iconStyles,
// //   disabled,
// //   ActivityIndicatorColor,
// //   alternative = false,
// //   Rtl = false,

// // }) => {
// //   const [fontSize, setFontSize] = useState(wp("2.5%")); // Default font size
// //   const [width, setWidth] = useState();
// //   const [windowWidth, setWindowWidth] = useState(
// //     Dimensions.get("window").width
// //   );
// //   useEffect(() => {
// //       if (windowWidth < 800) {
// //         setFontSize(wp("5%"));
// //         setWidth("w-48"); // Set width to 250 px

// //       } else {
// //         setFontSize(wp("3%"));
// //         setWidth("w-[80%]"); // Set width to 80%

// //       }
// //   }, [windowWidth]);

// //   return (
// //     <TouchableOpacity
// //       onPress={handlePress}
// //       activeOpacity={0.7}
// //       style={{
// //         paddingHorizontal: wp("15%"),
// //       }}
// //       className={`${
// //         alternative ? "border border-primary" : "bg-primary"
// //       } rounded-lg min-h-[8%] text-center flex flex-row justify-center w-full items-center ${containerStyles} ${
// //         isLoading ? "opacity-50" : ""
// //       } ${!Rtl && "flex-row-reverse"}`}
// //       disabled={isLoading || disabled}
// //     >
// //       {icon && (
// //         <Image
// //           source={icon}
// //           style={[
// //             {
// //               width:windowWidth<800?  wp("7%"):wp("5%"),
// //               height: windowWidth<800?  wp("7%"):wp("5%"), // Add some spacing between the icon and text
// //             },]}
// //           className={`
// //             ${!Rtl ? "ml-6" : "mr-6"} `}
// //         />
// //       )}
// //       <Text
// //         style={{ fontSize }}
// //         className={`${
// //           alternative ? "text-primary" : "text-white"
// //         } text-center ${width} font-tmedium ${textStyles}]`}
// //       >
// //         {title}
// //       </Text>

// //       {isLoading && (
// //         <ActivityIndicator
// //           animating={isLoading}
// //           color={
// //             ActivityIndicatorColor
// //               ? ActivityIndicatorColor
// //               : alternative
// //               ? "#227099"
// //               : "#fff"
// //           }
// //           size="small"
// //           className="ml-2"
// //         />
// //       )}
// //     </TouchableOpacity>
// //   );
// // };

// // export default MainButton;
