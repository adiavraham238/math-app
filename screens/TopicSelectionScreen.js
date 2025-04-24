import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Dimensions 
} from 'react-native';
import { globalStyles } from '../StyleSheet/StyleSheet';

const { width } = Dimensions.get('window');

const topics = [
  {
    id: 1,
    title: "Basic Arithmetic",
    description: "Addition, Subtraction, Multiplication, Division",
    icon: "➕"
  },
  {
    id: 2,
    title: "Geometry",
    description: "Shapes, Areas, Angles",
    icon: "📐"
  },
  {
    id: 3,
    title: "Algebra",
    description: "Equations, Variables, Functions",
    icon: "✖️"
  },
  {
    id: 4,
    title: "Statistics",
    description: "Data Analysis, Probability",
    icon: "📊"
  }
];

const TopicSelectionScreen = ({ onSelectTopic }) => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.screenTitle}>Choose Your Topic</Text>
      <ScrollView contentContainerStyle={globalStyles.topicScrollContainer}>
        {topics.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={globalStyles.topicCard}
            onPress={() => onSelectTopic(topic)}
          >
            <Text style={globalStyles.topicIcon}>{topic.icon}</Text>
            <Text style={globalStyles.topicTitle}>{topic.title}</Text>
            <Text style={globalStyles.topicDescription}>{topic.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopicSelectionScreen; 