import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import AppTextInput from '../components/AppTextInput'; // Adjust path if necessary
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const storeUserData = async (userEmail) => {
    try {
      await AsyncStorage.setItem('userEmail', userEmail); // Save email in AsyncStorage
      console.log('Email saved successfully!');
    } catch (e) {
      console.error('Failed to save the email.', e);
    }
  };

  const handleLogin = async () => {
    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch('https://server/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log('Response from server:', data); // Debugging line

      if (data.status === 'success') {
        Alert.alert('Success', data.message);
        
        // Store the email in AsyncStorage after successful login
        storeUserData(data.user.email);

        // Navigate to the next screen after successful login
        navigation.navigate('Home'); // Adjust this to your home screen
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'An error occurred while logging in.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.loginTitle}>QuickCollect</Text>
      </View>

      <View style={styles.inputContainer}>
        <AppTextInput 
          placeholder="Email" 
          value={email} 
          onChangeText={setEmail} 
        />
        <AppTextInput 
          placeholder="Password" 
          secureTextEntry 
          value={password} 
          onChangeText={setPassword} 
        />
      </View>

      <Text style={styles.forgotPassword}>Forgot your password?</Text>

      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.createAccount}>Create new account</Text>
      </TouchableOpacity>

      <Text style={styles.orContinue}>Or continue with</Text>

      <View style={styles.socialMediaRow}>
        <TouchableOpacity style={styles.socialMediaButton}>
          <Ionicons name="logo-google" color="#333333" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialMediaButton}>
          <Ionicons name="logo-apple" color="#333333" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialMediaButton}>
          <Ionicons name="logo-facebook" color="#333333" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#ffffff',
  },
  center: {
    alignItems: 'center',
    marginTop: 100,
  },
  loginTitle: {
    fontSize: 24,
    marginVertical: 24,
    fontWeight: '900',
    color: '#FF6A13',
  },
  inputContainer: {
    marginVertical: 24,
  },
  forgotPassword: {
    fontSize: 12,
    color: '#1E90FF',
    alignSelf: 'flex-end',
  },
  signInButton: {
    padding: 16,
    backgroundColor: '#1E90FF',
    marginVertical: 24,
    borderRadius: 8,
    shadowColor: '#1E90FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  signInButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
  },
  createAccount: {
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
  },
  orContinue: {
    fontSize: 12,
    color: '#1E90FF',
    textAlign: 'center',
  },
  socialMediaRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialMediaButton: {
    padding: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginHorizontal: 8,
  },
});

export default LoginScreen;
