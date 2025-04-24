import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Animated, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions 
} from 'react-native';
import { globalStyles } from '@/styles/StyleSheet';
import { questions } from '@/data/Questions';

const { width } = Dimensions.get('window');

const HomeScreen = ({ user, onSignOut }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const [number, setNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showTopicSelection, setShowTopicSelection] = useState(false);
  const [showLesson, setShowLesson] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentTopicTitle, setCurrentTopicTitle] = useState(null);

  useEffect(() => {
    startAnimations();
  }, []);

  const startAnimations = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();

    let count = 0;
    const interval = setInterval(() => {
      count++;
      setNumber(count);
      if (count >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setShowWelcome(false);
          setShowQuestions(true);
        }, 500);
      }
    }, 20);

    return () => clearInterval(interval);
  };

  const handleOptionSelect = (option) => {
    if (currentQuestion === 0) {
      setSelectedTopic(option);
      setCurrentQuestion(1);
    } else {
      setSelectedLevel(option);
      setShowQuestions(false);
      setShowTopicSelection(true);
    }
  };

  const handleTopicSelect = (topic) => {
    setCurrentTopicTitle(topic.title);
    setShowTopicSelection(false);
    setShowLesson(true);
  };

  if (showLesson && currentTopicTitle && selectedLevel) {
    return (
      <LessonScreen 
        topic={currentTopicTitle} 
        level={selectedLevel}
      />
    );
  }

  if (showTopicSelection) {
    return <TopicSelectionScreen onSelectTopic={handleTopicSelect} />;
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Animated.View
        style={[
          globalStyles.animationContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Animated.Text
          style={[
            globalStyles.character,
            {
              transform: [{ translateY: bounceAnim }],
            },
          ]}
        >
          🤖
        </Animated.Text>

        {showWelcome ? (
          <>
            <Text style={globalStyles.numberText}>{number}</Text>
            <Text style={globalStyles.welcomeText}>Welcome {user.email}!</Text>
          </>
        ) : showQuestions ? (
          <>
            <Text style={globalStyles.questionText}>
              {questions[currentQuestion].text}
            </Text>
            <View style={globalStyles.optionsContainer}>
              {questions[currentQuestion].options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    globalStyles.optionButton,
                    { width: width * 0.8 }
                  ]}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text style={globalStyles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : null}

        <TouchableOpacity 
          style={globalStyles.signOutButton}
          onPress={onSignOut}
        >
          <Text style={globalStyles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default HomeScreen; 