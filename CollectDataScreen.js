import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, Button, View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const CollectDataScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    state: '',
    lga: '',
    ward: '',
    healthFacilityName: '',
    hfTotalPopulation: '',
    dateOfSupervision: '',
    weekOfReporting: '',
    measlesVaccination: '',
    pentaVaccination: '',
    covidVaccination: '',
    ancVisits: '',
    familyPlanningAcceptors: '',
    deliveriesBySkilled: '',
    opdConsultations: '',
    nameOfWFP: '',
    phoneNo: '',
    dateCollected: new Date().toISOString().split('T')[0],
    userEmail: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [lgaOptions, setLgaOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);

  const lgaData = {
    Adamawa: ['Demsa', 'Fufore', 'Ganye', 'Girei', 'Gombi', 'Guyuk', 'Hong', 'Jada', 'Lamurde', 'Madagali', 'Maiha', 'MayoBelwa', 'Michika', 'MubiNorth', 'MubiSouth', 'Numan', 'Shelleng', 'Song', 'Toungo', 'YolaNorth', 'YolaSouth'],
  };

  const wardData = {
    Demsa: ['Demsa', 'Bille', 'Bwate', 'Dilli', 'Dong', 'Kpasham', 'Mbula Kuli', 'Nassarawo Demsa', 'Borrong', 'Dwam'],
    Fufore: ['Fufore', 'Boderei', 'Farang', 'Gurin', 'Kaduna', 'Malabu', 'Pariya', 'Ribadu', 'Verre', 'Yadim', 'Betso'],
    Ganye: ['Ganye', 'Jaggu', 'Gurum', 'Timdore', 'Sugu', 'Kirimti', 'Tebang', 'Bojum', 'Gada', 'Samtine'],
    Girei: ['Girei', 'Gereng', 'Damare', 'Jera', 'Vinikilang', 'Labondo', 'Wuro Dole', 'Jauro Yinu', 'Tambo', 'Modire', 'Yola Wuro Haussa'],
    Gombi: ['Gombi', 'Tawa', 'Gabun', 'Duwa', 'Badel', 'Lala', 'Guyaku', 'Dadiya', 'Dirma', 'Gaya'],
    Guyuk: ['Guyuk', 'Bodeno', 'Banjiram', 'Chikila', 'Daksiri', 'Dumna', 'Lokoro', 'Purokayo', 'Gwalura'],
    Hong: ['Hong', 'Mijili', 'Garkida', 'Daksiri', 'Hildi', 'Kwara', 'Thilbang', 'Madyali', 'Duda', 'Uba', 'Watirang'],
    Jada: ['Jada', 'Mayo Ine', 'Mbulo', 'Yelli', 'Danaba', 'Mayoselbe', 'Wuro Abbo', 'Koma', 'Nyibango'],
    Lamurde: ['Lamurde', 'Gyawana', 'Lafiya', 'Mgbebongun', 'Suwa', 'Boshikiri', 'Gbajeng', 'Rigange', 'Zekun'],
    Madagali: ['Madagali', 'Gulak', 'Duhu', 'Shuwa', 'Wagga', 'Shelmi', 'Lassa', 'Kirchinga'],
    Maiha: ['Maiha', 'Belel', 'Pakka', 'Kiba', 'Dabna', 'Hong', 'Kwananwaje', 'Mbilla', 'Ndikong'],
    MayoBelwa: ['Mayo Belwa', 'Binyeri', 'Dansa', 'Jada', 'Gasa Chukkol', 'Mukta', 'Gwalban', 'Banjiram', 'Kwade', 'Gorobi', 'Nassarawo'],
    Michika: ['Michika', 'Bazza', 'Futudou', 'Madzi', 'Zhukam', 'Ghumbuli', 'Watu', 'Garta', 'Gorin', 'Mugulvu'],
    MubiNorth: ['Mubi North', 'Betso', 'Muchalla', 'Bahuli', 'Digil', 'Kojoli', 'Muda', 'Yelwa', 'Lokuwa'],
    MubiSouth: ['Mubi South', 'Gude', 'Nassarawo', 'Kwaja', 'Girija', 'Sikil', 'Dirbishi', 'Gude'],
    Numan: ['Numan', 'Tigno', 'Lafiya', 'Vulpi', 'Mbula', 'Nassarawo', 'Libbo', 'Bakundi'],
    Shelleng: ['Shelleng', 'Bodwai', 'Bojude', 'Tallum', 'Jumbul', 'Ketembo', 'Njoboliyo', 'Shelleng Town'],
    Song: ['Song', 'Gudu Mboi', 'Zumo', 'Dirma', 'Walasa', 'Gori', 'Wuro Aba', 'Song Batta', 'Hyamti', 'Fandang', 'Kilange'],
    Toungo: ['Toungo', 'Gamu', 'Kiri', 'Kuburshosho', 'Kofan Fulani', 'Binji', 'Dulo', 'Dudai'],
    YolaNorth: ['Yola Town', 'Jambutu', 'Doubeli', 'Alkalawa', 'Luggere', 'Kofare', 'Limawa', 'Rumde', 'Mbamba'],
    YolaSouth: ['Yola South', 'Bako', 'Wuro Hausa', 'Makama A', 'Makama B', 'Ndikongi', 'Yolde Pate', 'Mbamoi', 'Namtari']

  };

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          setFormData((prevData) => ({ ...prevData, userEmail: email }));
        }
      } catch (error) {
        console.error('Error fetching email from AsyncStorage:', error);
      }
    };

    fetchUserEmail();
  }, []);

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));

    if (key === 'state') {
      setLgaOptions(lgaData[value] || []);
      setWardOptions([]); // Reset ward options when state changes
      handleInputChange('lga', ''); // Reset LGA and ward
      handleInputChange('ward', '');
    } else if (key === 'lga') {
      setWardOptions(wardData[value] || []);
      handleInputChange('ward', ''); // Reset ward when LGA changes
    }
  };

  const saveToDrafts = async () => {
    try {
      const existingDrafts = await AsyncStorage.getItem('drafts');
      const drafts = existingDrafts ? JSON.parse(existingDrafts) : [];
      drafts.push(formData);
      await AsyncStorage.setItem('drafts', JSON.stringify(drafts));
      navigation.navigate('DraftScreen'); // Navigate to DraftScreen after saving
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Close the picker
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      handleInputChange('dateOfSupervision', formattedDate);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Picker
          selectedValue={formData.state}
          onValueChange={(value) => handleInputChange('state', value)}
          style={styles.input}
        >
          <Picker.Item label="Select State" value="" />
          <Picker.Item label="Adamawa" value="Adamawa" />
          {/*<Picker.Item label="Gombe" value="Gombe" />*/}
        </Picker>

        <Picker
          selectedValue={formData.lga}
          onValueChange={(value) => handleInputChange('lga', value)}
          style={styles.input}
        >
          <Picker.Item label="Select LGA" value="" />
          {lgaOptions.map((lga, index) => (
            <Picker.Item key={index} label={lga} value={lga} />
          ))}
        </Picker>

        <Picker
          selectedValue={formData.ward}
          onValueChange={(value) => handleInputChange('ward', value)}
          style={styles.input}
        >
          <Picker.Item label="Select Ward" value="" />
          {wardOptions.map((ward, index) => (
            <Picker.Item key={index} label={ward} value={ward} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Health Facility Name"
          value={formData.healthFacilityName}
          onChangeText={(value) => handleInputChange('healthFacilityName', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="HF Total Population"
          keyboardType="numeric"
          value={formData.hfTotalPopulation}
          onChangeText={(value) => handleInputChange('hfTotalPopulation', value)}
        />

<TouchableOpacity onPress={showDatePickerModal}>
          <TextInput
            style={styles.input}
            placeholder="Date of Supervision (yyyy-mm-dd)"
            value={formData.dateOfSupervision}
            editable={false}
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'android' ? 'default' : 'spinner'}
            onChange={handleDateChange}
          />
        )}

        <Picker
          selectedValue={formData.weekOfReporting}
          onValueChange={(value) => handleInputChange('weekOfReporting', value)}
          style={styles.input}
        >
          <Picker.Item label="Select Week of Reporting" value="" />
          <Picker.Item label="Week 1" value="Week 1" />
          <Picker.Item label="Week 2" value="Week 2" />
          <Picker.Item label="Week 3" value="Week 3" />
          <Picker.Item label="Week 4" value="Week 4" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="No. of Measles 2 Vaccination"
          keyboardType="numeric"
          value={formData.measlesVaccination}
          onChangeText={(value) => handleInputChange('measlesVaccination', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="No. of Penta 3 Vaccination"
          keyboardType="numeric"
          value={formData.pentaVaccination}
          onChangeText={(value) => handleInputChange('pentaVaccination', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="No. of COVID19 Vaccination"
          keyboardType="numeric"
          value={formData.covidVaccination}
          onChangeText={(value) => handleInputChange('covidVaccination', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="No. of ANC 4th Visits"
          keyboardType="numeric"
          value={formData.ancVisits}
          onChangeText={(value) => handleInputChange('ancVisits', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="No. of New Family Planning Acceptors"
          keyboardType="numeric"
          value={formData.familyPlanningAcceptors}
          onChangeText={(value) => handleInputChange('familyPlanningAcceptors', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="No. of Deliveries by Skilled Birth Attendant"
          keyboardType="numeric"
          value={formData.deliveriesBySkilled}
          onChangeText={(value) => handleInputChange('deliveriesBySkilled', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="No. of OPD Consultations"
          keyboardType="numeric"
          value={formData.opdConsultations}
          onChangeText={(value) => handleInputChange('opdConsultations', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Name of WFP"
          value={formData.nameOfWFP}
          onChangeText={(value) => handleInputChange('nameOfWFP', value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={formData.phoneNo}
          onChangeText={(value) => handleInputChange('phoneNo', value)}
        />

        <Text style={styles.dateText}>Date Collected: {formData.dateCollected}</Text>
        {formData.userEmail ? <Text style={styles.dateText}>Logged in as: {formData.userEmail}</Text> : null}

        <View style={styles.buttonContainer}>
          <Button title="Save to Drafts" onPress={saveToDrafts} color="#007BFF" />
          
        </View>
      </ScrollView>
    </View>
  );
};

export default CollectDataScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40, // Increased margin to avoid overlap with status bar
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#007BFF',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  dateText: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 14,
    color: '#1E90FF',
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    borderRadius: 60,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
});
