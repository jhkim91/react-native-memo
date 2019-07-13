import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar, //
  TextInput,  // input 사용시 추가
  Dimensions, // 디바이스 크기 확인
  Platform, // 플랫폼 확인(android, ios 등)
  ScrollView
} from 'react-native';
import { AppLoading } from "expo";
import Todo from "./ToDo";
import uuidv1 from "uuid/v1"; //터미널에서 다음명령어 입력 npm install uuid --save

const {height, width } = Dimensions.get("window");

export default class App extends Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos: {}
  };

  componentDidMount = () => {
    this._loadToDos();
  }

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    console.log(toDos)
    if(!loadedToDos) {
      return <AppLoading />;
    }
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
                returnKeyType={"done"}
                autoCorrect={false}
                onEndEditing={this._addToDo}
            />
            <ScrollView contentContainerStyle={styles.toDos}>
              {Object.values(toDos).map(toDo => (
                  <Todo
                      key={toDo.id}
                      deleteToDo={this._deleteToDo}
                      uncompleteToDo={this._uncompleteToDo}
                      completeToDo={this._completeToDo}
                      {...toDo}
                  />
              ))}
            </ScrollView>
          </View>
        </View>
    );
  }
  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    })
  };
  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    })
  };
  _addToDo = () => {
    const { newToDo } = this.state;
    if(newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newToDo: '',
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        }
        return { ...newState };
      })
    }
  };
  _deleteToDo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      }
      return {...newState}
    })
  };
  _uncompleteToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      };
      return { ...newState };
    });
  };
  _completeToDo = (id) => {
    this.setState( prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      };
      return { ...newState };
    });
  };
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
  },
  toDos: {
    alignItems: "center"
  }
});