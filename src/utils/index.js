import {Platform, Animated, Easing, UIManager, LayoutAnimation, PixelRatio, Dimensions} from 'react-native';

const scaleValue = PixelRatio.get() / 2;

export const enableExperimental = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export const scaleWithPixel = (size, limitScale = 1.2) => {
  /* setting default upto 20% when resolution device upto 20% with defalt iPhone 7 */
  const value = scaleValue > limitScale ? limitScale : scaleValue;
  return size * value;
};

export const heightHeader = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const landscape = width > height;

  if (Platform.OS === 'android') {
    return 45;
  }
  if (Platform.isPad) {
    return 65;
  }
  switch (height) {
    case 375:
    case 414:
    case 812:
    case 896:
      return landscape ? 45 : 88;
    default:
      return landscape ? 45 : 65;
  }
};

export const heightTabView = () => {
  const height = Dimensions.get('window').height;
  // const width = Dimensions.get('window').width;
  let size = height - heightHeader();
  switch (height) {
    case 375:
    case 414:
    case 812:
    case 896:
      size -= 30;
      break;
    default:
      break;
  }

  return size;
};

export const getWidthDevice = () => {
  return Dimensions.get('window').width;
};

export const getHeightDevice = () => {
  return Dimensions.get('window').height;
};

export const scrollEnabled = (contentWidth, contentHeight) => {
  return contentHeight + 60 > Dimensions.get('window').height - heightHeader();
};

// Animation navigation between screen react-navigation
export function fromLeft(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({layout, position, scene}) => {
      const {index} = scene;
      const {initWidth} = layout;

      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [-initWidth, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return {opacity, transform: [{translateX}]};
    },
  };
}

/**
 * @description Transition animation screen expand from on the top of screen
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @export
 * @param {number} [duration=300]
 * @returns
 */
export function fromTop(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({layout, position, scene}) => {
      const {index} = scene;
      const {initHeight} = layout;

      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [-initHeight, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return {opacity, transform: [{translateY}]};
    },
  };
}

/**
 * @description Transition animation screen expand from on the right to left
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @export
 * @param {number} [duration=300]
 * @returns
 */
export function fromRight(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({layout, position, scene}) => {
      const {index} = scene;
      const {initWidth} = layout;

      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [initWidth, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return {opacity, transform: [{translateX}]};
    },
  };
}

/**
 * @description Transition animation screen expand from on the bottom to top
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @export
 * @param {number} [duration=300]
 * @returns
 */
export function fromBottom(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({layout, position, scene}) => {
      const {index} = scene;
      const {initHeight} = layout;

      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [initHeight, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return {opacity, transform: [{translateY}]};
    },
  };
}

/**
 * @description Transition animation fadeIn
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @export
 * @param {number} [duration=300]
 * @returns
 */
export function fadeIn(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({position, scene}) => {
      const {index} = scene;

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1],
      });

      return {opacity};
    },
  };
}

/**
 * @description Transition animation zoomIn
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @export
 * @param {number} [duration=300]
 * @returns
 */
export function zoomIn(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({position, scene}) => {
      const {index} = scene;
      let start = 0;

      if (Platform.OS !== 'ios') {
        start = 0.005;
      }

      const scale = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [start, 1],
      });

      return {transform: [{scale}]};
    },
  };
}

/**
 * @description Transition animation zoomOut
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @export
 * @param {number} [duration=300]
 * @returns
 */
export function zoomOut(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({position, scene}) => {
      const {index} = scene;

      const scale = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [10, 1],
      });

      return {transform: [{scale}]};
    },
  };
}

/**
 * @description Animation effect flip with vertical
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @export
 * @param {number} [duration=300]
 * @returns
 */
export function flipY(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({position, scene}) => {
      const {index} = scene;

      const rotateY = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: ['180deg', '0deg'],
      });

      return {transform: [{rotateY}], backfaceVisibility: 'hidden'};
    },
  };
}

/**
 * @description Animation effect flip with horizontal
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @export
 * @param {number} [duration=300]
 * @returns
 */
export function flipX(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({position, scene}) => {
      const {index} = scene;

      const rotateX = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: ['180deg', '0deg'],
      });

      return {transform: [{rotateX}], backfaceVisibility: 'hidden'};
    },
  };
}

export function shadow(x, color = '#000') {
  const shadowHeights = [1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12];
  const shadowOpacities = [
    0.18,
    0.2,
    0.22,
    0.23,
    0.25,
    0.27,
    0.29,
    0.3,
    0.32,
    0.34,
    0.36,
    0.37,
    0.39,
    0.41,
    0.43,
    0.44,
    0.46,
    0.48,
    0.5,
    0.51,
    0.53,
    0.55,
    0.57,
    0.58,
  ];
  const shadowRadiuses = [
    1.0,
    1.41,
    2.22,
    2.62,
    3.84,
    4.65,
    4.65,
    4.65,
    5.46,
    6.27,
    6.68,
    7.49,
    8.3,
    9.11,
    9.51,
    10.32,
    11.14,
    11.95,
    12.35,
    13.16,
    13.97,
    14.78,
    15.19,
    16.0,
  ];
  return {
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: shadowHeights[x - 1],
    },
    shadowOpacity: shadowOpacities[x - 1],
    shadowRadius: shadowRadiuses[x - 1],
    elevation: x,
  };
}
