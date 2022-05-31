import React, {useState, useEffect} from 'react';
import {View, StatusBar, ImageBackground, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Image, Text, BackButton} from '@components';
import {Images} from '@config';
import styles from './styles';
import {UserServices} from '../../services';
import Favorite from '../../assets/images/favorite-1.svg';
import FavoriteFilled from '../../assets/images/favorite-filled.svg';
import {BlurView} from '@react-native-community/blur';

const CharacterItem = ({url}) => {
  const [loading, setLoading] = useState(false);
  const [characerDetail, setCharacterDetail] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const results = await UserServices.getEndpoint(url);
        setCharacterDetail(results);
        setLoading(false);
      } catch (error) {
        console.log('error ', error);
      }
    })();
  }, [url]);

  const onPressItem = () => {
    navigation.navigate('CharacterNav', {screen: 'CharacterDetail', params: {data: characerDetail}});
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPressItem}>
      <Image source={{uri: characerDetail.image}} style={styles.itemImage} resizeMode={'contain'} />
      <Text caption2 bold whiteColor style={styles.itemLabel}>
        {characerDetail.name}
      </Text>
    </TouchableOpacity>
  );
};

const EpisodeDetail = ({navigation, route, actions}) => {
  const {data} = route.params;
  const [loading, setLoading] = useState(false);
  const [episodeDetail, setEpisodeDetail] = useState({});
  const favorites = useSelector(state => state?.favorite?.favorites) || {};
  const dispatch = useDispatch();
  const isFavorite = data.id ? favorites[data.id] : false;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const results = await UserServices.getEpisode(data.id);
        setEpisodeDetail(results);
        setLoading(false);
      } catch (error) {
        console.log('error ', error);
      }
    })();
  }, [data.id]);

  const onPressFavorite = () => {
    dispatch({type: isFavorite ? 'REMOVE' : 'ADD', id: data.id});
  };

  return (
    <View style={styles.contain}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Spinner visible={loading} />
      <ImageBackground source={Images.episode} style={styles.imageBackground}>
        <BlurView blurAmount={1} blurType={'light'} style={styles.blurview} reducedTransparencyFallbackColor="white" />
        <BackButton />
      </ImageBackground>
      <View style={styles.mainContent}>
        <Image source={Images.episode} style={styles.episodeImage} resizeMode={'cover'} />
        <TouchableOpacity style={styles.favoriteButton} onPress={onPressFavorite}>
          {isFavorite ? <FavoriteFilled width={25} height={25} /> : <Favorite width={25} height={25} />}
        </TouchableOpacity>
        <Text bold title1 whiteColor style={styles.episodeName}>
          {episodeDetail.name}
        </Text>
        <Text callout bold style={styles.episodeLabel}>
          {'Episode '}
          <Text style={styles.episodeCode}>{episodeDetail.episode}</Text>
        </Text>
        <Text body2 style={styles.episodeDate}>
          {episodeDetail.air_date}
        </Text>
        <Text title3 bold style={styles.charactersLabel}>
          {'Characters'}
        </Text>
        <View style={styles.underline} />
        {episodeDetail.characters && (
          <FlatList
            data={episodeDetail.characters}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            renderItem={({item}) => <CharacterItem url={item} />}
          />
        )}
      </View>
    </View>
  );
};

export default EpisodeDetail;
