import React from 'react';
import { View } from 'react-native';
import { Pagination } from 'react-native-snap-carousel';

import styles from '../utils/styles';

const DotsIndicator = ({ activeIndex, length }) => {
  return (
    <View style={styles.dotContainer}>
      <Pagination
        dotsLength={length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default DotsIndicator;
