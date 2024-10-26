import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  // Fetch the stored email from AsyncStorage
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail !== null) {
          setEmail(storedEmail); // Set email to state
        }
      } catch (error) {
        console.error('Error fetching user email from AsyncStorage', error);
      }
    };

    fetchUserEmail();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userEmail'); // Clear stored user data
      Alert.alert('Logged Out', 'You have been successfully logged out.');
      navigation.navigate('Login'); // Redirect to login screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>QuickCollect</Text>
      <Text style={styles.introText}>A safe place to collect Data online/offline</Text>
      {email ? <Text style={styles.emailText}>You are logged in as: {email}</Text> : null}

      {/* Cards Section */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CollectDataScreen')}>
          <Text style={styles.cardText}>Collect Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DraftScreen')}>
          <Text style={styles.cardText}>Draft</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleLogout}>
          <Text style={styles.cardText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  welcomeText: {
    fontSize: 24,
    color: '#FF6A13',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emailText: {
    marginBottom: 20,
    fontSize: 11,
    color: '#1E90FF'
  },
  cardContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#1E90FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});
