import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AuthScreen from '@/screens/auth/AuthScreen';
import HomeScreen from '@/screens/home/HomeScreen';
import { globalStyles } from '@/styles/StyleSheet';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      {user ? (
        <HomeScreen 
          user={user} 
          onSignOut={() => auth.signOut()} 
        />
      ) : (
        <AuthScreen />
      )}
    </SafeAreaView>
  );
}