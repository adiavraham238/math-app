import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  SafeAreaView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { auth } from '@config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { globalStyles } from '@styles/StyleSheet';

// ... rest of AuthScreen code 

const AuthScreen = () => {
  // ... rest of the code stays the same
};

export default AuthScreen; 