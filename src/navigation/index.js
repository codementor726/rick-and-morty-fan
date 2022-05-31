import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Loading from '@screens/Loading';
import EpisodesScreen from '@screens/Episodes';
import EpisodeDetailScreen from '@screens/EpisodeDetail';
import CharactersScreen from '@screens/Characters';
import CharacterDetailScreen from '@screens/CharacterDetail';
import FavoritesScreen from '@screens/Favorites';
import TabBar from '../components/TabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const EpisodeNav = () => {
  return (
    <Stack.Navigator initialRouteName={'Episodes'}>
      <Stack.Screen name="Episodes" component={EpisodesScreen} options={{headerShown: false, gestureEnabled: false}} />
      <Stack.Screen name="EpisodeDetail" component={EpisodeDetailScreen} options={{headerShown: false, gestureEnabled: false}} />
    </Stack.Navigator>
  );
};

const CharacterNav = () => {
  return (
    <Stack.Navigator initialRouteName={'Characters'}>
      <Stack.Screen name="Characters" component={CharactersScreen} options={{headerShown: false, gestureEnabled: false}} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} options={{headerShown: false, gestureEnabled: false}} />
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />} backBehavior={'initialRoute'} lazy={false}>
      <Tab.Screen name="EpisodeNav" component={EpisodeNav} options={{tabBarLabel: 'Episodes'}} />
      <Tab.Screen name="CharacterNav" component={CharacterNav} options={{tabBarLabel: 'Characters'}} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{tabBarLabel: 'Favorites'}} />
    </Tab.Navigator>
  );
};

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={Loading} options={{headerShown: false, gestureEnabled: false}} />
        <Stack.Screen name="Main" component={TabNavigation} options={{headerShown: false, gestureEnabled: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
