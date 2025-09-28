import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { MainButton } from '../../components'; // adjust path
import { RenderInput } from '../../utilities';

const InputOverlay = ({
  visible,
  onClose,
  title,
  data,
  manipulatedRow,
  buttonTitle,
  onButtonPress,
  loading = false,
  setRow,
}) => {
  if (!visible) return null; // nothing shown if not visible

  return (
    <View style={styles.overlayContainer}>
      {/* Background close */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>

      {/* Centered content */}
      <View style={styles.modalContent}>
        {title && <Text className="text-center font-tbold text-lg text-primary">{title}</Text>}

        {data && (
          <FlatList
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            removeClippedSubviews={false}
            maxToRenderPerBatch={10}
            windowSize={10}
            initialNumToRender={5}
            style={{ width: '100%', marginVertical: 10 }}
            data={data}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View className="my-3 gap-3">
                <Text className="font-tmedium text-base font-medium">{item.label}</Text>
                <KeyboardAvoidingView behavior="padding">
                  <RenderInput
                    inputkey={item.key}
                    label={item.label}
                    type={item.type}
                    value={manipulatedRow?.[item.key]}
                    onChange={item.onChange}
                    options={item.options}
                    lines={item.lines}
                    input={item.input}
                    setRowData={setRow}
                  />
                </KeyboardAvoidingView>
              </View>
            )}
          />
        )}

        {/* Button */}
        {buttonTitle && (
          <MainButton handlePress={onButtonPress} title={`${buttonTitle}${loading ? '...' : ''}`} />
        )}
      </View>
    </View>
  );
};

export default InputOverlay;

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject, // makes it sit on top of everything
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // ensure it's above other content
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
});
