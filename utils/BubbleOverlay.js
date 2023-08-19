import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const BubbleOverlay = ({ bubbleCount = 100, minRadius = 10, maxRadius = 100, bubbleColor = 'rgba(255, 255, 255, 0.3)' }) => {
  const [bubbles] = useState(Array.from({ length: bubbleCount }));

  // Generate random values for bubbles' motion
  const generateRandomValue = () => {
    return Math.random() * 200 - 100; // Random value between -100 and 100
  };

  // Generate random bubble size within limits
  const generateRandomSize = () => {
    return Math.random() * (maxRadius - minRadius) + minRadius;
  };

  useEffect(() => {
    // Create a timer to update the bubbles' positions periodically
    const bubbleTimer = setInterval(() => {
      // No need to set bubbles, just trigger re-render
    }, 100); // You can adjust the interval as needed

    return () => {
      clearInterval(bubbleTimer); // Clear the timer on component unmount
    };
  }, []);

  return (
    <View style={styles.overlay}>
      {bubbles.map((_, index) => {
        const bubbleSize = generateRandomSize(); // Random size for each bubble

        return (
          <Animatable.View
            key={index}
            animation={{
              from: {
                top: `${generateRandomValue()}%`,
                left: `${generateRandomValue()}%`,
              },
              to: {
                top: `${generateRandomValue()}%`,
                left: `${generateRandomValue()}%`,
              },
            }}
            iterationCount="infinite"
            // Adjust the speed of the motion in random
            duration={Math.random() * 10000 + 5000}
            easing="linear"
            style={[
              styles.bubble,
              {
                width: bubbleSize,
                height: bubbleSize,
                backgroundColor: bubbleColor,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    borderRadius: 50, // Ensure round shape
    position: 'absolute',
    transform: [{ scale: 0.4 }], // Scale to create a reflection-like effect
  },
});

export default BubbleOverlay;
