// Questions data and related functions
export const questions = [
  {
    id: 1,
    text: "Which math topic would you like to learn?",
    options: ["Geometry", "Functions", "Equations"]
  },
  {
    id: 2,
    text: "What is your level of knowledge?",
    options: ["Elementary", "High School"]
  }
];

// Helper functions for questions
export const getQuestionById = (id) => {
  return questions.find(question => question.id === id);
};

export const getTotalQuestions = () => {
  return questions.length;
};

export const getNextQuestion = (currentQuestionId) => {
  const currentIndex = questions.findIndex(q => q.id === currentQuestionId);
  if (currentIndex < questions.length - 1) {
    return questions[currentIndex + 1];
  }
  return null;
}; 