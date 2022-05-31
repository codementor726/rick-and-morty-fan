import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <BlurView blurAmount={1} blurType={'chromeMaterialDark'} style={styles.button}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicon name={'ios-chevron-back'} size={24} color={'white'} />
      </TouchableOpacity>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 48,
    left: 26,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BackButton;
