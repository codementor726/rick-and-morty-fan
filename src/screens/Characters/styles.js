import {StyleSheet, Dimensions} from 'react-native';
import {shadow} from '../../utils';

const {width, height} = Dimensions.get('screen');

const imageWidth = width * 0.25;
const imageHeight = imageWidth;

export default StyleSheet.create({
  contain: {
    flex: 1,
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
    borderRadius: imageWidth / 2,
  },
  itemLabel: {
    textAlign: 'center',
  },
});
