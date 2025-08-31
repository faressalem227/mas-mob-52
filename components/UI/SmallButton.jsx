import { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
}) => {
  const windowWidth = Dimensions.get('window').width;

  // Pre-calculated initial values based on screen width
  const initialButtonWidth = windowWidth < 800 ? wp('45%') : wp('44%');
  const initialButtonHeight = windowWidth < 800 ? hp('13%') : hp('12%');
  const initialFontSize = windowWidth < 800 ? hp('2.2%') : hp('1.8%');
  const initialIconSize = windowWidth < 800 ? hp('4.5%') : hp('4%');
  const initialGapSize = windowWidth < 800 ? hp('0.6%') : hp('0.4%');
  const initialPaddingSize = windowWidth < 800 ? hp('0.4%') : hp('0.2%');

  const [buttonWidth, setButtonWidth] = useState(initialButtonWidth);
  const [buttonHeight, setButtonHeight] = useState(initialButtonHeight);
  const [fontSize, setFontSize] = useState(initialFontSize);
  const [iconSize, setIconSize] = useState(initialIconSize);
  const [gapSize, setGapSize] = useState(initialGapSize);
  const [paddingSize, setPaddingSize] = useState(initialPaddingSize);

  // Optional: Recalculate on screen resize or orientation change
  useEffect(() => {
    const updateLayout = () => {
      const updatedWidth = Dimensions.get('window').width;

      setButtonWidth(updatedWidth < 800 ? wp('45%') : wp('44%'));
      setButtonHeight(updatedWidth < 800 ? hp('13%') : hp('12%'));
      setFontSize(updatedWidth < 800 ? hp('2.2%') : hp('1.8%'));
      setIconSize(updatedWidth < 800 ? hp('4.5%') : hp('4%'));
      setGapSize(updatedWidth < 800 ? hp('0.6%') : hp('0.4%'));
      setPaddingSize(updatedWidth < 800 ? hp('0.4%') : hp('0.2%'));
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => subscription?.remove?.();
  }, []);

  const textColor = alternative ? { color: '#227099' } : { color: '#fff' };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={{
        width: buttonWidth,
        height: buttonHeight,
        padding: paddingSize,
        gap: gapSize,
      }}
      className={`
        ${alternative ? 'border border-[#227099]' : 'bg-[#227099]'}
        items-center justify-center rounded-lg 
        ${containerStyles || ''} ${isLoading ? 'opacity-50' : ''}
      `}
      disabled={isLoading || disabled}>
      {icon && (
        <Image
          source={icon}
          style={{
            width: iconSize,
            height: iconSize,
            resizeMode: 'contain',
          }}
          className={`${iconStyles || ''}`}
        />
      )}

      <Text
        style={{
          ...textColor,
          fontSize,
        }}
        className={`${
          alternative ? 'text-primary' : 'text-[#fafafa]'
        } text-center font-tmedium ${textStyles || ''}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color={ActivityIndicatorColor || (alternative ? '#227099' : '#fff')}
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default MainButton;

// import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// const MainButton = ({
//     title,
//     handlePress,
//     containerStyles,
//     textStyles,
//     isLoading,
//     icon,
//     iconStyles,
//     disabled,
//     ActivityIndicatorColor,
//     alternative = false,
// }) => {
//     return (
//         <TouchableOpacity
//             onPress={handlePress}
//             activeOpacity={0.7}
//             style={{
//                 width: wp("44%"),
//                 height: hp("12%"),
//                 padding:hp("0.2%"),
//                 gap:hp("0.4%"),
//             }}
//             className={`${
//                 alternative ? " border border-primary " : "bg-[#227099]"
//             }  rounded-lg justify-center items-center ${containerStyles} ${
//                 isLoading ? "opacity-50" : ""
//             }`}
//             disabled={isLoading || disabled ? true : false}>
//             {icon ? (
//                 <Image
//                     source={icon}
//                     style={{
//                         width: hp("4%"),
//                         height: hp("4%"),
//                         resizeMode: "contain",
//                     }}
//                     className={`  ${iconStyles}`}
//                 />
//             ) : (
//                 ""
//             )}
//             <Text
//                 style={{
//                   fontSize: hp("2.1%"),
//                 }}
//                 className={`${
//                     alternative ? "text-primary" : "text-[#fafafa]"
//                 }  font-tmedium text-center ${textStyles} `}>
//                 {title}
//             </Text>

//             {isLoading && (
//                 <ActivityIndicator
//                     animating={isLoading}
//                     color={
//                         ActivityIndicatorColor
//                             ? ActivityIndicatorColor
//                             : alternative
//                             ? "#227099"
//                             : "#fff"
//                     }
//                     size="small"
//                     className="ml-2"
//                 />
//             )}
//         </TouchableOpacity>
//     );
// };

// export default MainButton;
