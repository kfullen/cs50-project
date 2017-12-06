import React from 'react';
import { TextField } from 'react-native-material-textfield'
import PopupDialog from 'react-native-popup-dialog';
import Modal from 'react-native-modal';
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
import { firebaseApp } from '../firebase/FirebaseConfig';
import { GMAPS_API_KEY } from 'react-native-dotenv';

class SubmitButton extends React.Component {
  render() {
    return (
      <View style={styles2.action}>
        <TouchableHighlight
          underlayColor={constants.actionColor}
          onPress={() => this.props.onPress()}>
          <Text style={styles2.actionText}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

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
      <ScrollView containerStyle={styles.container}>
        <TextField
        	label="What's Free / Event Name"
        	onChangeText={ (eventname) => this.setState({eventName: eventname})}
        	multiline={true}
        	inputContainerStyle={{ marginLeft: 25, marginRight: 23 }}
        />
        <TextField
        	label="Details"
        	onChangeText={ (details) => this.setState({details: details})}
        	multiline={true}
        	inputContainerStyle={{ marginLeft: 25, marginRight: 23 }}
        />
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
        <SubmitButton onPress={ () => this._submit() } title="Submit" />
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

const constants = {
  actionColor: '#24CE84'
};

const styles2 = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  searchbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  statusbar: {
    backgroundColor: '#fff',
    flex: 1,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
})