import React from 'react';
import { View } from 'react-native';
import { Pagination } from 'react-native-snap-carousel';

import styles from '../utils/styles';

/**
 * DotsIndicator Component.
 * Displays pagination dots based on the active index and the total number of items.
 *
 * @param {Object} props - The component properties.
 * @param {number} props.activeIndex - The index of the currently active item.
 * @param {number} props.length - The total number of items that require pagination.
 *
 * @returns {JSX.Element} A View component containing the Pagination from 'react-native-snap-carousel'.
 *
 * @example
 * // Example usage in a parent component
 *
 * import DotsIndicator from './DotsIndicator';
 *
 * const ParentComponent = () => {
 *   const [activeIndex, setActiveIndex] = useState(0);
 *   const totalItems = 5;
 *
 *   return (
 *     <View>
 *       // Render your carousel component here and update activeIndex
 *       <DotsIndicator activeIndex={activeIndex} length={totalItems} />
 *       // other components
 *     </View>
 *   );
 * };
 */
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
