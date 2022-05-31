import {StyleSheet, Dimensions} from 'react-native';
import {shadow} from '../../utils';

const {width, height} = Dimensions.get('screen');

const imageWidth = width * 0.4;
const imageHeight = imageWidth + 30;

export default StyleSheet.create({
  contain: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  listContentContainer: {
    marginHorizontal: 10,
  },
  columnWrapperStyle: {
    justifyContent: 'space-around',
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
    ...shadow(12),
  },
  itemImage: {
    width: imageWidth,
    height: imageHeight,
    borderRadius: 20,
  },
  itemLabel: {
    textAlign: 'center',
  },
});
