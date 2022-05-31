import React, {useEffect} from 'react';
import {StatusBar, View, ActivityIndicator} from 'react-native';
import {BaseColor} from '@config';
import styles from './styles';

const Loading = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Main');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={BaseColor.primaryColor} barStyle={'light-content'} />
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default Loading;
