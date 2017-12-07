import { StyleSheet } from 'react-native';

const constants = {
  actionColor: '#24CE84'
};

var googleplacestyle = StyleSheet.create({
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
  }
});

var datepickerstyle = StyleSheet.create({
  dateIcon: {
    position: 'absolute',
    left: -5,
    top: -3,
    marginLeft: 0,
    height: 40,
    width: 40
  },
  dateInput: {
    marginLeft: 57
  }
})

var styles = StyleSheet.create({
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
  geocontainer: {
    height: '80%',
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent:'flex-start'
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    width: 272,
    marginLeft: 80
  },
  datecontainer1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  datecontainer2: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  buttonText: {
    fontSize: 15,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 0,
    top: 28,
    marginLeft: 22
  },
  locationIcon: {
    width: 32,
    height: 45,
    position: 'absolute',
    left: 0,
    top: 0,
    marginLeft: 25
  },
  inputContainerStyle: { 
    width: 270, 
    marginLeft: 80
  },
  datepicker: {
    width: 328
  },
  view1: {
    padding: 0
  },
  view2: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0
  },
});

module.exports = styles;
module.exports.constants = constants;
module.exports.googleplacestyle = googleplacestyle;
module.exports.datepickerstyle = datepickerstyle;