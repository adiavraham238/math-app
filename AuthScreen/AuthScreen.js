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
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { globalStyles } from '../StyleSheet/StyleSheet';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      if (isNewUser) {
        // Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        console.log('Successfully created user:', userCredential.user.email);
        Alert.alert('Success', 'Account created successfully!');
      } else {
        // Sign In
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Auth error:', error.code, error.message);
      let errorMessage = 'An error occurred';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        default:
          errorMessage = error.message;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.innerContainer}>
        <Text style={globalStyles.logoText}>Math Buddy</Text>
        
        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />
        
        <TextInput
          style={globalStyles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
        />

        <TouchableOpacity 
          style={[
            globalStyles.authButton,
            isLoading && globalStyles.authButtonDisabled
          ]}
          onPress={handleAuth}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={globalStyles.authButtonText}>
              {isNewUser ? 'Sign Up' : 'Sign In'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={globalStyles.switchButton}
          onPress={() => {
            setIsNewUser(!isNewUser);
            setEmail('');
            setPassword('');
          }}
          disabled={isLoading}
        >
          <Text style={globalStyles.switchButtonText}>
            {isNewUser 
              ? 'Already have an account? Sign In' 
              : 'New user? Create account'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;