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

const geometryLessons = [
  {
    id: 1,
    title: "Basic Shapes",
    content: "Let's learn about basic geometric shapes:",
    examples: [
      "⭕ Circle - A round shape with no corners",
      "⬜ Square - Has 4 equal sides and 4 right angles",
      "△ Triangle - Has 3 sides and 3 angles",
      "⬡ Hexagon - Has 6 equal sides"
    ]
  },
  {
    id: 2,
    title: "Area Calculation",
    content: "Learn how to calculate areas:",
    examples: [
      "Square Area = side × side",
      "Rectangle Area = length × width",
      "Triangle Area = (base × height) ÷ 2",
      "Circle Area = π × radius²"
    ]
  }
];

const GeometryScreen = ({ level }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const fadeAnim = new Animated.Value(1);

  const nextLesson = () => {
    if (currentLesson < geometryLessons.length - 1) {
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

  const lesson = geometryLessons[currentLesson];

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.lessonHeader}>
        <Text style={globalStyles.lessonTitle}>Geometry</Text>
        <Text style={globalStyles.lessonSubtitle}>Lesson {currentLesson + 1}</Text>
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
            currentLesson === geometryLessons.length - 1 && globalStyles.navButtonDisabled
          ]}
          onPress={nextLesson}
          disabled={currentLesson === geometryLessons.length - 1}
        >
          <Text style={globalStyles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GeometryScreen; 