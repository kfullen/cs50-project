import React from 'react';
import Prompt from 'react-native-prompt';
import Moment from 'moment';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Alert,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
  
import { firebaseApp } from '../firebase/FirebaseConfig';

class ListItem extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.item.eventName}</Text>
          <Text style={styles.liText}>{this.props.item.startDateTime}</Text>
          <Text style={styles.liText}>{this.props.item.location}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class EventsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('events');
  	state: State = {
	    query: '',
	    sort: '#',
	  };
  }

  getRef() {
    return firebaseApp.database().ref();
  }; 

 	listenForItems(itemsRef) {
    itemsRef.on('value', (snapshot) => {
      // get children as an array
      var items = [];
      snapshot.forEach((child) => {
        if (child.val().endDateTime > Moment(Date()).format('YYYY-MM-DD HH:mm')) {
          items.push({
          eventName: child.val().eventName,
          startDateTime: child.val().startDateTime,
          location: child.val().location,
          _key: child.key
          });
        }
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  _renderItem(item) {
    return (
      <ListItem item={item} />
    );
  }

	render() {
	    return (
	  		<View style={styles.container}>
        	<ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
      	</View>
    );
	}
}

const constants = {
  actionColor: '#24CE84'
};

const styles = StyleSheet.create({
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
