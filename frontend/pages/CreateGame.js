import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles.js';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

RR
this is my page now edit it so that it would work:
const createGame = () =>{
    const [selectedValue, setSelectedValue] = useState('option1');

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
          onChangeText={setCustomValue}
          value={customValue}
          placeholder="Enter your own value"
        />
      )}
    </View>
    );
  };


Sure, I'll edit your component to make it work correctly. Here's the revised version:

javascript

Copy
import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './path/to/your/style.js'; // Make sure this path is correct

const CreateGame = () => {
    const [roundTimeMins, setSelectedValue] = useState('30');

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="30 mins" value="30" />
                <Picker.Item label="1 hour" value="60" />
                <Picker.Item label="3 hours" value="180" />
                <Picker.Item label="6 hours" value="360" />
                <Picker.Item label="12 hours" value="720" />
                <Picker.Item label="24 hours" value="1440" />
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