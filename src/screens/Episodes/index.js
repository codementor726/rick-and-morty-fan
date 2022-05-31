import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, ImageBackground, FlatList, TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Image, Text} from '@components';
import {Images} from '@config';
import styles from './styles';
import {UserServices} from '../../services';

const Episodes = ({navigation, actions}) => {
  const [loading, setLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [next, setNext] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const {info, results} = await UserServices.getEpisode();
        setNext(info.next);
        setEpisodes([...episodes, ...results]);
        setLoading(false);
      } catch (error) {
        console.log('error ', error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressItem = data => {
    navigation.navigate('EpisodeDetail', {data});
  };

  const updateEpisodeList = async () => {
    if (!next) {
      return;
    }

    try {
      setLoading(true);
      const {info, results} = await UserServices.getEndpoint(next);
      setNext(info.next);
      setEpisodes([...episodes, ...results]);
      setLoading(false);
    } catch (error) {
      console.log('error ', error);
    }
  };

  const onEndReached = ({distanceFromEnd}) => {
    const endReached = distanceFromEnd > 100 && !loading && next;
    if (endReached) {
      updateEpisodeList();
    }
  };

  const renderEpisodes = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => onPressItem(item)}>
        <Image source={Images.episode} style={styles.itemImage} resizeMode={'cover'} />
        <Text caption2 bold whiteColor style={styles.itemLabel}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={Images.background} style={styles.contain} imageStyle={{resizeMode: 'cover'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Spinner visible={loading} />
      <SafeAreaView style={styles.contain}>
        <FlatList
          data={episodes}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContentContainer}
          columnWrapperStyle={styles.columnWrapperStyle}
          renderItem={renderEpisodes}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.8}
          refreshing={loading}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Episodes;
