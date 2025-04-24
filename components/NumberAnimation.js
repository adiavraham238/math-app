import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { globalStyles } from '../StyleSheet/StyleSheet';

const NumberAnimation = () => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, []);

  const animatedNumber = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0', '100'],
  });

  return (
    <View style={globalStyles.container}>
      <Animated.Text style={[globalStyles.animatedNumber]}>
        {animatedNumber}
      </Animated.Text>
    </View>
  );
};

export default NumberAnimation; 