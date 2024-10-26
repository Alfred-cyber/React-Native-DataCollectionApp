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

const RegistrationScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const registrationData = {
      fullName,
      email,
      phone_number: phoneNumber,
      password,
    };

    console.log('Registration Data:', registrationData); // Debugging line

    try {
      const response = await fetch('https://server/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();
      console.log('Response from server:', data); // Debugging line

      if (data.status === 'success') {
        Alert.alert('Success', data.message);
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Error', 'An error occurred while registering.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.registerTitle}>Create Account</Text>
        <Text style={styles.welcomeMessage}>Join us today!</Text>
      </View>

      <View style={styles.inputContainer}>
        <AppTextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <AppTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <AppTextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <AppTextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <AppTextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
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
  },
  registerTitle: {
    fontSize: 24,
    color: '#1E90FF',
    marginVertical: 24,
  },
  welcomeMessage: {
    fontSize: 20,
    maxWidth: '60%',
    textAlign: 'center',
  },
  inputContainer: {
    marginVertical: 24,
  },
  registerButton: {
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
  registerButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
  },
  loginText: {
    fontSize: 12,
    color: '#1E90FF',
    textAlign: 'center',
  },
});

export default RegistrationScreen;
