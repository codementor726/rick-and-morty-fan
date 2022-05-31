import {StyleSheet, Dimensions} from 'react-native';
import {shadow} from '../../utils';

const {width, height} = Dimensions.get('screen');

const imageWidth = width * 0.6;
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
    paddingTop: 80,
  },
  characterImage: {
    width: imageWidth,
    height: imageWidth,
    alignSelf: 'center',
    position: 'absolute',
    top: -height * 0.2,
    borderRadius: imageWidth / 2,
  },
  characterName: {
    textAlign: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  alive: {
    backgroundColor: 'green',
  },
  dead: {
    backgroundColor: 'red',
  },
  status: {
    marginLeft: 10,
  },
  infoPanel: {
    marginHorizontal: 15,
    marginVertical: 5,
  },
  episodesLabel: {
    textAlign: 'center',
    color: '#E3AE00',
  },
  underline: {
    width: 60,
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
    width: width * 0.3,
    height: width * 0.3 + 30,
    borderRadius: 20,
  },
  itemLabel: {
    textAlign: 'center',
  },
});
