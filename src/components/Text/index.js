import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import {Typography, FontWeight, BaseColor} from '../../config';

const Text = props => {
  const {
    //props style
    header = false,
    title1 = false,
    title2 = false,
    title3 = false,
    headline = false,
    body1 = false,
    body2 = false,
    callout = false,
    subhead = false,
    footnote = false,
    caption1 = false,
    caption2 = false,
    overline = false,
    // props font
    thin = false,
    ultraLight = false,
    light = false,
    regular = false,
    medium = false,
    semibold = false,
    bold = false,
    heavy = false,
    black = false,
    //custom color
    primaryColor = false,
    darkPrimaryColor = false,
    lightPrimaryColor = false,
    accentColor = false,
    textSecondaryColor = false,
    grayColor = false,
    darkBlueColor = false,
    dividerColor = false,
    whiteColor = false,
    fieldColor = false,
    //numberOfLines
    numberOfLines = 10,
    //center
    center = false,
    //custom
    style = {},
  } = props;
  return (
    <RNText
      style={StyleSheet.flatten([
        header && Typography.header,
        title1 && Typography.title1,
        title2 && Typography.title2,
        title3 && Typography.title3,
        headline && Typography.headline,
        body1 && Typography.body1,
        body2 && Typography.body2,
        callout && Typography.callout,
        subhead && Typography.subhead,
        footnote && Typography.footnote,
        caption1 && Typography.caption1,
        caption2 && Typography.caption2,
        overline && Typography.overline,
        //custom for font
        thin && StyleSheet.flatten({fontWeight: FontWeight.thin}),
        ultraLight &&
          StyleSheet.flatten({
            fontWeight: FontWeight.ultraLight,
          }),
        light && StyleSheet.flatten({fontWeight: FontWeight.light}),
        regular && StyleSheet.flatten({fontWeight: FontWeight.regular}),
        medium && StyleSheet.flatten({fontWeight: FontWeight.medium}),
        semibold && StyleSheet.flatten({fontWeight: FontWeight.semibold}),
        bold && StyleSheet.flatten({fontWeight: FontWeight.bold}),
        heavy && StyleSheet.flatten({fontWeight: FontWeight.heavy}),
        black && StyleSheet.flatten({fontWeight: FontWeight.black}),
        // default color
        StyleSheet.flatten({
          color: BaseColor.textPrimaryColor,
        }),
        //custom for color
        primaryColor && StyleSheet.flatten({color: BaseColor.primaryColor}),
        darkPrimaryColor &&
          StyleSheet.flatten({
            color: BaseColor.darkPrimaryColor,
          }),
        lightPrimaryColor &&
          StyleSheet.flatten({
            color: BaseColor.lightPrimaryColor,
          }),
        accentColor && StyleSheet.flatten({color: BaseColor.accentColor}),
        textSecondaryColor &&
          StyleSheet.flatten({
            color: BaseColor.textSecondaryColor,
          }),
        grayColor && StyleSheet.flatten({color: BaseColor.grayColor}),
        darkBlueColor && StyleSheet.flatten({color: BaseColor.darkBlueColor}),
        dividerColor && StyleSheet.flatten({color: BaseColor.dividerColor}),
        whiteColor && StyleSheet.flatten({color: BaseColor.whiteColor}),
        fieldColor && StyleSheet.flatten({color: BaseColor.fieldColor}),
        center && StyleSheet.flatten({textAlign: 'center'}),
        style && style,
      ])}
      numberOfLines={numberOfLines}>
      {props.children}
    </RNText>
  );
};

export default Text;
