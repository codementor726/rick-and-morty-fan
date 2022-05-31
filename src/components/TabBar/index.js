import React from 'react';
import {SafeAreaView, View, TouchableOpacity, StyleSheet, Animated, Dimensions} from 'react-native';
import Text from '../Text';
import {BaseColor} from '../../config';
import PCMonitor from '../../assets/images/pc-monitor.svg';
import PersonalTrainer from '../../assets/images/personal-trainer.svg';
import Favorite from '../../assets/images/favorite.svg';

const {width: screenWidth} = Dimensions.get('window');
const height = 62;

class TabBar extends React.Component {
  state = {
    previousIndex: null,
  };

  constructor(props) {
    super(props);

    const {state} = props;
    const {routes} = state;

    this.currentIndexAnimatedValue = new Animated.Value(state.index);
    this.tabWidth = screenWidth / routes.length;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.state.index !== this.props.state.index || this.state.previousIndex !== nextState.previousIndex;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.state.index !== this.props.state.index) {
      this.setState({
        previousIndex: prevProps.state.index,
      });
      this.navigateAnimation(prevProps.state.index);
    }
  }

  navigateAnimation = prevItemIndex => {
    const {state} = this.props;

    Animated.parallel([
      Animated.spring(this.currentIndexAnimatedValue, {
        toValue: state.index,
        useNativeDriver: true,
      }),
    ]).start();
  };

  renderAnimatedBackground = () => {
    const {state} = this.props;
    const {routes} = state;

    const translateX = this.currentIndexAnimatedValue.interpolate({
      inputRange: routes.map((_route, index) => index),
      outputRange: routes.map((_route, index) => index * this.tabWidth),
      extrapolate: 'extend',
    });

    return (
      <Animated.View
        style={[
          styles.animTabBarContainer,
          {
            width: this.tabWidth,
            transform: [{translateX}],
          },
        ]}>
        <View style={[styles.tabBarIndicator, {width: this.tabWidth - 60}]} />
      </Animated.View>
    );
  };

  onTabPress = (route, index) => {
    const {navigation, state} = this.props;

    const isFocused = state.index === index;
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  renderTabbarIcon = (routeName, focused) => {
    if (routeName === 'EpisodeNav') {
      return <PCMonitor style={styles.itemIcon} fill={focused ? '#e3ae00' : 'white'} />;
    } else if (routeName === 'CharacterNav') {
      return <PersonalTrainer style={styles.itemIcon} fill={focused ? '#e3ae00' : 'white'} />;
    } else {
      return <Favorite style={styles.itemIcon} fill={focused ? '#e3ae00' : 'white'} />;
    }
  };

  render() {
    const {style, state, descriptors} = this.props;
    const {routes} = state;

    return (
      <SafeAreaView style={[styles.container, style]}>
        {this.renderAnimatedBackground()}
        {routes.map((route, index) => {
          const focused = state.index === index;
          const {options} = descriptors[route.key];
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

          return (
            <TouchableOpacity onPress={() => this.onTabPress(route, index)} key={index.toString()} style={styles.item}>
              {this.renderTabbarIcon(route.name, focused)}
              <Text caption1 bold style={{color: '#CBCBCB'}}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    borderTopWidth: 1,
    borderTopColor: '#97979733',
    backgroundColor: 'black',
  },
  item: {
    flex: 1,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemIcon: {
    margin: 10,
  },
  animTabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -3,
    bottom: 0,
    alignItems: 'center',
  },
  tabBarIndicator: {
    height: 5,
    minWidth: 40,
    backgroundColor: BaseColor.primaryColor,
  },
});

export default TabBar;
