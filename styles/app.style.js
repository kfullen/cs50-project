import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  geocontainer: {
    height: '80%',
    backgroundColor: '#fff',
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'white',
    flex: 1,
    padding: 12,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  datecontainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datecontainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  buttonText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  modalselector: {
    flex: 1, 
    justifyContent:'space-around', 
    padding: 50,
    backgroundColor: 'white'
  },
  forminput: {
    backgroundColor: 'white',
    margin: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5, 
    flex: 1, 
    flexWrap: 'wrap',
  }
});