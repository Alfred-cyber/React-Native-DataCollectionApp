import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  Button,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DraftScreen = () => {
  const [drafts, setDrafts] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const loadDrafts = async () => {
      try {
        // Fetch user email from AsyncStorage
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          setUserEmail(email);
        }

        // Fetch drafts and filter by user email
        const existingDrafts = await AsyncStorage.getItem('drafts');
        if (existingDrafts) {
          const allDrafts = JSON.parse(existingDrafts);
          const userDrafts = allDrafts.filter(draft => draft.userEmail === email);
          setDrafts(userDrafts);
        }
      } catch (error) {
        console.error('Error loading drafts:', error);
      }
    };

    loadDrafts();
  }, []);

  const deleteDraft = async (index) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this draft?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const updatedDrafts = drafts.filter((_, i) => i !== index);
            await AsyncStorage.setItem('drafts', JSON.stringify(updatedDrafts));
            setDrafts(updatedDrafts);
          },
        },
      ]
    );
  };

  const saveOnline = async (draft) => {
    try {
      const response = await fetch('https://server/save_data.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draft),
      });

      const result = await response.json();
      if (result.success) {
        Alert.alert('Success', 'Data saved online successfully!');
        deleteDraft(drafts.indexOf(draft)); // Remove draft after saving
      } else {
        Alert.alert('Error', 'Failed to save data online.');
      }
    } catch (error) {
      console.error('Error saving online:', error);
      Alert.alert('Error', 'An error occurred while saving data online.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {drafts.length === 0 ? (
          <Text style={styles.noDraftsText}>No drafts available</Text>
        ) : (
          drafts.map((draft, index) => (
            <View key={index} style={styles.draftCard}>
              <Text style={styles.draftText}>Health Facility: {draft.healthFacilityName}</Text>
              <Text style={styles.draftText}>Date Collected: {draft.dateCollected}</Text>
              <Text style={styles.draftText}>User Email: {draft.userEmail}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="Save Online"
                  onPress={() => saveOnline(draft)}
                  color="#007BFF"
                />
                <Button
                  title="Delete"
                  onPress={() => deleteDraft(index)}
                  color="#FF5733"
                />
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default DraftScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    
  },
  scrollContainer: {
    paddingBottom: 16,
    marginTop: 30,
  },
  noDraftsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 5,
    color: '#999',
  },
  draftCard: {
    padding: 16,
    borderRadius: 8,
    borderColor: '#007BFF',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: '#87CEEB',
  },
  draftText: {
    fontSize: 14,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});
