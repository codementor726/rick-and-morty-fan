import React, {useState, useEffect} from 'react';
import {ImageBackground, SafeAreaView, StatusBar, FlatList, TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Image, Text} from '@components';
import {Images} from '@config';
import {UserServices} from '../../services';
import styles from './styles';

const EpisodeItem = ({id}) => {
  const [loading, setLoading] = useState(false);
  const [episodeDetail, setEpisodeDetail] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const results = await UserServices.getEpisode(id);
        setEpisodeDetail(results);
        setLoading(false);
      } catch (error) {
        console.log('error ', error);
      }
    })();
  }, [id]);

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

const Favorites = ({navigation, actions}) => {
  const [loading, setLoading] = useState(false);
  const favorites = useSelector(state => Object.keys(state?.favorite?.favorites)) || [];

  return (
    <ImageBackground source={Images.background} style={styles.contain} imageStyle={{resizeMode: 'cover'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Spinner visible={loading} />
      <SafeAreaView style={styles.contain}>
        <Text title1 bold whiteColor style={styles.title}>{'Favorites'}</Text>
        {favorites && (
          <FlatList
            data={favorites}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContentContainer}
            columnWrapperStyle={styles.columnWrapperStyle}
            renderItem={({item}) => <EpisodeItem id={parseInt(item, 10)} />}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Favorites;
