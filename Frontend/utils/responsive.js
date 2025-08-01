// utils/responsive.js

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base guideline dimensions for iPhone 11
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = size => (width / guidelineBaseWidth) * size;

export const verticalScale = size => (height / guidelineBaseHeight) * size;

export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
