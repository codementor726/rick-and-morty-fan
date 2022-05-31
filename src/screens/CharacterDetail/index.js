import React, {useState, useEffect} from 'react';
import {View, StatusBar, ImageBackground, TouchableOpacity, FlatList} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Image, Text, BackButton} from '@components';
import styles from './styles';
import {UserServices} from '../../services';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import {Images} from '@config';

const EpisodeItem = ({url}) => {
  const [loading, setLoading] = useState(false);
  const [episodeDetail, setEpisodeDetail] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const results = await UserServices.getEndpoint(url);
        setEpisodeDetail(results);
        setLoading(false);
      } catch (error) {
        console.log('error ', error);
      }
    })();
  }, [url]);

  const onPressItem = () => {
    navigation.navigate('EpisodeNav', {screen: 'EpisodeDetail', params: {data: episodeDetail}});
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPressItem}>
      <Image source={Images.episode} style={styles.itemImage} resizeMode={'cover'} />
      <Text caption2 bold whiteColor style={styles.itemLabel}>
        {episodeDetail.name}
      </Text>
    </TouchableOpacity>
  );
};

const CharacterDetail = ({navigation, route, actions}) => {
  const {data} = route.params;
  const [loading, setLoading] = useState(false);
  const [characterDetail, setCharacterDetail] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const results = await UserServices.getCharacter(data.id);
        setCharacterDetail(results);
        setLoading(false);
      } catch (error) {
        console.log('error ', error);
      }
    })();
  }, [data.id]);

  return (
    <View style={styles.contain}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Spinner visible={loading} />
      <ImageBackground source={{uri: characterDetail.image}} style={styles.imageBackground} imageStyle={{resizeMode: 'cover'}}>
        <BlurView blurAmount={1} blurType={'light'} style={styles.blurview} reducedTransparencyFallbackColor="white" />
        <BackButton />
      </ImageBackground>
      <View style={styles.mainContent}>
        <Image source={{uri: characterDetail.image}} style={styles.characterImage} resizeMode={'cover'} />
        <Text bold title1 whiteColor style={styles.characterName}>
          {characterDetail.name || ''}
        </Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, characterDetail.status === 'Alive' ? styles.alive : styles.dead]} />
          <Text bold callout style={styles.status}>{`${characterDetail.status || ''} - ${characterDetail.species || ''}`}</Text>
        </View>
        <View style={styles.infoPanel}>
          <Text callout>
            {'Gender: '}
            <Text>{characterDetail.gender || ''}</Text>
          </Text>
          <Text callout>
            {'Origin: '}
            <Text>{characterDetail.origin?.name || ''}</Text>
          </Text>
          <Text callout>
            {'Location: '}
            <Text>{characterDetail.location?.name || ''}</Text>
          </Text>
        </View>
        <Text title3 bold style={styles.episodesLabel}>
          {'Episodes'}
        </Text>
        <View style={styles.underline} />
        {characterDetail.episode && (
          <FlatList
            data={characterDetail.episode}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            renderItem={({item}) => <EpisodeItem url={item} />}
          />
        )}
      </View>
    </View>
  );
};

export default CharacterDetail;
