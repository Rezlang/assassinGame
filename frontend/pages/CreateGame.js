import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles.js';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const CreateGame = () =>{
    const [selectedValue, setSelectedValue] = useState('30');
    const [customValue, setCustomValue] = useState('');
    return (
        <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label=" 30 mins" value="30" />
          <Picker.Item label=" 1 hour " value="60" />
          <Picker.Item label="3 hours" value="180" />
          <Picker.Item label="6 hours" value="360" />
          <Picker.Item label="12 hours" value="720" />
          <Picker.Item label="Other" value="other" />
      </Picker>

      {selectedValue === 'other' && (
                <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    const days = parseFloat(text) || 0;
                    const minutes = days * 1440;
                    setCustomValue(text);
                    setSelectedValue(minutes.toString());
                }}
                value={customValue}
                placeholder="Enter number of days"
                keyboardType="numeric"
            />
        )}
    </View>
    );
  };

export default CreateGame;