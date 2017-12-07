import React from 'react';
import { 
  TouchableHighlight,
  Text,
  View,
} from 'react-native';

import styles from '../styles/app.style';

export default class SubmitButton extends React.Component {
  render() {
    return (
      <View style={styles.action}>
        <TouchableHighlight
          underlayColor={styles.constants.actionColor}
          onPress={() => this.props.onPress()}>
          <Text style={styles.actionText}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
