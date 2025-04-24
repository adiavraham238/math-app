import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing, TouchableOpacity } from 'react-native';
import { globalStyles } from '../StyleSheet/StyleSheet';

const MathAnimation = () => {
  const bounceValue = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const questions = [
    {
      text: "Which math topic would you like to learn?",
      options: ["Geometry", "Functions", "Equations"]
    },
    {
      text: "What is your level of knowledge?",
      options: ["Elementary", "High School"]
    }
  ];

  useEffect(() => {
    startBounceAnimation();
    fadeInText();
  }, [currentQuestion]);

  const startBounceAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -20,
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.bounce,
          useNativeDriver: true,
        })
      ])
    ).start();
  };

  const fadeInText = () => {
    textOpacity.setValue(0);
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleOptionSelect = (option) => {
    if (currentQuestion === 0) {
      setSelectedTopic(option);
      setCurrentQuestion(1);
    } else {
      // Handle final selection
      console.log('Topic:', selectedTopic, 'Level:', option);
    }
  };

  return (
    <View style={globalStyles.animationContainer}>
      {/* Bouncing Robot */}
      <Animated.Text 
        style={[
          globalStyles.character,
          {
            transform: [{ translateY: bounceValue }]
          }
        ]}
      >
        🤖
      </Animated.Text>

      {/* Question */}
      <Animated.Text 
        style={[
          globalStyles.questionText,
          { opacity: textOpacity }
        ]}
      >
        {questions[currentQuestion].text}
      </Animated.Text>

      {/* Options */}
      <View style={globalStyles.optionsContainer}>
        {questions[currentQuestion].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={globalStyles.optionButton}
            onPress={() => handleOptionSelect(option)}
          >
            <Text style={globalStyles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MathAnimation; 