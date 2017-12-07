import React from 'react';
import PopupDialog from 'react-native-popup-dialog';
import Modal from 'react-native-modal';
import { TextField } from 'react-native-material-textfield'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DatePicker from 'react-native-datepicker';
import { Ionicons } from '@expo/vector-icons';
import { 
  ScrollView, 
  TextInput, 
  Button,
  Image,
  TouchableHighlight,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SubmitButton from '../components/SubmitButton';
import styles from '../styles/app.style';
import { firebaseApp } from '../firebase/FirebaseConfig';
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
        lat: null,
        lng: null,
        eventName: '',
        details: ''
    }
    this.itemsRef = this.getRef().child('events');
  };
  
  getRef() {
    return firebaseApp.database().ref();
  };

  _submit() {
	  console.log(`Submitted`);
	  if (this.state.location != 'Location' && 
	  		this.state.startDateTime != null && 
	  		this.state.endDateTime != null &&
	  		this.state.lat != null &&
	  		this.state.lng != null &&
	  		this.state.eventName != '') {
	  			this.itemsRef.push({
	  				eventName: this.state.eventName,
	  				details: this.state.details,
	  				startDateTime: this.state.startDateTime,
	  				endDateTime: this.state.endDateTime,
	  				location: this.state.location,
	  				lat: this.state.lat,
	  				lng: this.state.lng
	  			});
	  		} 
	  	else {console.log("Text Input Invalid");}
  }; 

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View> 
          <Image source={require('../assets/images/icons8-reservation-50.png')} style={styles.icon} />
          <TextField
            label="What's Free / Event Name"
            onChangeText={ (eventname) => this.setState({eventName: eventname})}
            multiline={true}
            inputContainerStyle={styles.inputContainerStyle}
          />
        </View>
        
        <View style={{ paddingBottom: 10 }}>
          <Image source={require('../assets/images/icons8-view-details-50.png')} style={styles.icon} />
          <TextField
        	 label="Details"
        	 onChangeText={ (details) => this.setState({details: details})}
        	 multiline={true}
        	 inputContainerStyle={styles.inputContainerStyle}
          />
        </View>

        <View style={{ flexDirection: 'column', paddingVertical: 20 }}>
	        <View style={styles.datecontainer1}>
	          <DatePicker
	            style={styles.datepicker}
	            date={this.state.startDateTime}
	            mode="datetime"
	            format="YYYY-MM-DD HH:mm"
	            placeholder="Start Time"
	            confirmBtnText="Confirm"
	            cancelBtnText="Cancel"
	            customStyles={styles.datepickerstyle}
	            minuteInterval={10}
              iconSource={require('../assets/images/icons8-schedule-50.png')}
	            onDateChange={(datetime) => {this.setState({ startDateTime: datetime });}}
	          /> 
	        </View>
	        <View style={styles.datecontainer2}>
	          <DatePicker
	            style={styles.datepicker}
	            date={this.state.endDateTime}
	            mode="datetime"
	            format="YYYY-MM-DD HH:mm"
	            placeholder="End Time"
	            confirmBtnText="Confirm"
	            cancelBtnText="Cancel"
	            showIcon={false}
	            customStyles={styles.datepickerstyle}
	            minuteInterval={10}
	            onDateChange={(datetime) => {this.setState({ endDateTime: datetime });}}
	          /> 
	        </View>
        </View>
        
        <View style={styles.view1}>
          <Image source={require('../assets/images/icons8-place-marker-50.png')} style={styles.locationIcon} />
          {this._renderButton(this.state.location, () => this.setState({ visibleModal: 1 }))}
          <Modal
            isVisible={this.state.visibleModal === 1}
            onBackdropPress={() => this.setState({ visibleModal: null })}>
            {this._renderModalContent()}
          </Modal>
        </View>
        
        <View style={styles.view2}>
          <SubmitButton onPress={ () => this._submit() } title="Submit"/>
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
          styles={styles.googleplacestyle}
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
