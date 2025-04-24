import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Animated
} from 'react-native';
import { globalStyles } from '../StyleSheet/StyleSheet';
import { lessonContent } from '../data/LessonContent';

const LessonScreen = ({ topic, level }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const fadeAnim = new Animated.Value(1);

  const lessons = lessonContent[topic][level];

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
      setCurrentLesson(prev => prev + 1);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
      setCurrentLesson(prev => prev - 1);
    }
  };

  const lesson = lessons[currentLesson];

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.lessonHeader}>
        <Text style={globalStyles.lessonTitle}>{topic}</Text>
        <Text style={globalStyles.lessonSubtitle}>
          Lesson {currentLesson + 1} • {level}
        </Text>
      </View>

      <Animated.View style={[globalStyles.lessonContent, { opacity: fadeAnim }]}>
        <Text style={globalStyles.lessonTitleText}>{lesson.title}</Text>
        <Text style={globalStyles.lessonContentText}>{lesson.content}</Text>
        
        <ScrollView style={globalStyles.examplesContainer}>
          {lesson.examples.map((example, index) => (
            <Text key={index} style={globalStyles.exampleText}>
              {example}
            </Text>
          ))}
        </ScrollView>
      </Animated.View>

      <View style={globalStyles.lessonNavigation}>
        <TouchableOpacity 
          style={[
            globalStyles.navButton,
            currentLesson === 0 && globalStyles.navButtonDisabled
          ]}
          onPress={prevLesson}
          disabled={currentLesson === 0}
        >
          <Text style={globalStyles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            globalStyles.navButton,
            currentLesson === lessons.length - 1 && globalStyles.navButtonDisabled
          ]}
          onPress={nextLesson}
          disabled={currentLesson === lessons.length - 1}
        >
          <Text style={globalStyles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LessonScreen; 