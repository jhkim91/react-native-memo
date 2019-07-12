import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar, //
  TextInput,  // input 사용시 추가
  Dimensions, // 디바이스 크기 확인
  Platform // 플랫폼 확인(android, ios 등)
} from 'react-native';

const {height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: ""
  };
  render() {
    const { newToDo } = this.state
    return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content"/>
          <Text style={styles.title}>Kawai To Do</Text>
          <View style={styles.card}>{/* {}가 1쌍이면 styles참고, {{}} 일경우 하드코딩 */}
            <TextInput
                style={styles.input}
                placeholder={"New To Do"}
                value={newToDo}
                onChangeText={this._controlNewToDo}
                placeholderTextColor={"#999"}
                returnKeyType="done"
                autoCorrect={false}
            ></TextInput>
          </View>
        </View>
    );
  }
  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    //쉐도우는 사용법이 달라서 따로 지정 ios: shadow, android: elevation
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 1,
    fontSize: 25
  }
});