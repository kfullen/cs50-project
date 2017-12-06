import React from 'react';
import { FormLabel, FormInput } from 'react-native-elements';
import PopupDialog from 'react-native-popup-dialog';
import Modal from 'react-native-modal';
import ModalSelector from 'react-native-modal-selector';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DatePicker from 'react-native-datepicker';
import { 
  ScrollView, 
  StyleSheet, 
  TextInput, 
  Button,
  TouchableHighlight,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from '../styles/app.style';

import { GMAPS_API_KEY } from 'react-native-dotenv';

export default class FormScreen extends React.Component {
  static navigationOptions = {
    title: 'Create Event',
  };

  constructor(props) {
    super(props);
    this.state = {
        location: 'Location',
        visibleModal: null,
        startDateTime: null,
        endDateTime: null,
        latlng: null,
    }
  };
  
  render() {
    return (
      <ScrollView containerStyle={styles.container}>
        <FormLabel>What's Free / Event </FormLabel>
        <FormInput containerStyle={styles.forminput} multiline={true} autoGrow={true} autoCorrect={false} numberOfLines={3}></FormInput>
        <FormLabel>Details</FormLabel>
        <FormInput containerStyle={styles.forminput} multiline={true} autoGrow={true} autoCorrect={false}></FormInput>
        <View style={{ flex: 1, flexDirection: 'column', paddingVertical: 20 }}>
	        <View style={styles.datecontainer1}>
	          <DatePicker
	            style={{ width: 330 }}
	            date={this.state.startDateTime}
	            mode="datetime"
	            format="YYYY-MM-DD HH:mm"
	            placeholder="Start Time"
	            confirmBtnText="Confirm"
	            cancelBtnText="Cancel"
	            customStyles={{
	              dateIcon: {
	                position: 'absolute',
	                left: 0,
	                top: 4,
	                marginLeft: 0
	              },
	              dateInput: {
	                marginLeft: 50
	              }
	            }}
	            minuteInterval={10}
	            onDateChange={(datetime) => {this.setState({ startDateTime: datetime });}}
	          /> 
	        </View>
	        <View style={styles.datecontainer2}>
	          <DatePicker
	            style={{ width: 330 }}
	            date={this.state.endDateTime}
	            mode="datetime"
	            format="YYYY-MM-DD HH:mm"
	            placeholder="End Time"
	            confirmBtnText="Confirm"
	            cancelBtnText="Cancel"
	            showIcon={false}
	            customStyles={{
	              dateInput: {
	                marginLeft: 50
	              }
	            }}
	            minuteInterval={10}
	            onDateChange={(datetime) => {this.setState({ endDateTime: datetime });}}
	          /> 
	        </View>
        </View>
        <View style={styles.button}>
          {this._renderButton(this.state.location, () => this.setState({ visibleModal: 1 }))}
          <Modal
            isVisible={this.state.visibleModal === 1}
            onBackdropPress={() => this.setState({ visibleModal: null })}>
            {this._renderModalContent()}
          </Modal>
        </View>
      </ScrollView>
    );
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.geocontainer}>
      <ScrollView>
        <GooglePlacesAutocomplete
          placeholder='Search for your event location'
          minLength={1}
          autoFocus={true}
          returnKeyType="search"
          fetchDetails={true}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,50,0)',
            },
            textInput: {
              marginLeft: 5,
              marginRight: 0,
              padding: 10,
              height: 35,
              color: 'black',
              fontSize: 18
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
          }}
          query={{
            key: GMAPS_API_KEY,
            language: 'en',
            types: ['geocode', 'establishment']
          }}
          onPress={(data, details) => {
          	this.setState({ 
          		visibleModal: null, 
          		location: data.description || data.formatted_address || data.name,
          		lat: details.geometry.location.lat,
          		lng: details.geometry.location.lng,
          	})
          }}
          textInputProps={{ clearButtonMode: 'while-editing' }}
        />
      </ScrollView>
    </View>
  );
}
