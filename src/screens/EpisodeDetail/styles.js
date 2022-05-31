import {StyleSheet, Dimensions} from 'react-native';
import {shadow} from '../../utils';

const {width, height} = Dimensions.get('screen');

const imageWidth = width * 0.25;
const imageHeight = imageWidth;

export default StyleSheet.create({
  contain: {
    flex: 1,
  },
  imageBackground: {
    height: height * 0.3,
  },
  blurview: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#262626',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: -20,
    paddingTop: 20,
  },
  episodeImage: {
    width: width * 0.4,
    height: height * 0.25,
    alignSelf: 'center',
    position: 'absolute',
    top: -height * 0.2,
    borderRadius: 30,
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
  },
  episodeName: {
    textAlign: 'center',
  },
  episodeLabel: {
    color: '#AFAFAF',
    textAlign: 'center',
  },
  episodeCode: {
    color: '#E3AE00',
  },
  episodeDate: {
    textAlign: 'center',
    color: '#8B8B8B',
    marginTop: 15,
  },
  charactersLabel: {
    textAlign: 'center',
    color: '#E3AE00',
    marginTop: 15,
  },
  underline: {
    width: 70,
    height: 2,
    alignSelf: 'center',
    backgroundColor: '#E3AE00',
    marginBottom: 10,
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
