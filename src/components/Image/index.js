import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const Image = ({style = {}, resizeMode = 'cover', ...rest}) => {
  let resize = FastImage.resizeMode.cover;
  switch (resizeMode) {
    case 'contain':
      resize = FastImage.resizeMode.contain;
      break;
    case 'stretch':
      resize = FastImage.resizeMode.stretch;
      break;
    case 'center':
      resize = FastImage.resizeMode.center;
      break;
    default:
      break;
  }
  return <FastImage style={StyleSheet.flatten([style && style])} {...rest} resizeMode={resize} />;
};

export default Image;
