# react-native-memo
ID 사용
* 터미널에 작성 npm install uuid --save
* 사용 소스
            import uuidv1 from "uuid/v1";

            const ID = uuidv1();
            const newToDoObject = {
              [ID]: {
                id: ID,
                isCompleted: false,
                text: newToDo,
                createdAt: Date.now()
              }
            };
앱스토리지 사용
* AsyncStorage
* 사용 소스
            import { AsyncStorage } from 'react-native';
            저장 : AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
            로드 :
                _loadToDos = async () => {
                  try {
                    const toDos = await AsyncStorage.getItem("toDos");
                    const parsedToDos = JSON.parse(toDos);
                    this.setState({
                      loadedToDos: true,
                      toDos: parsedToDos
                    });
                  } catch {
                    console.log(err)
                  }
                };
                
안드로이드 apk 파일 생성 (expo 가입)
* yarn or npm global add exp
* exp build:android
* app.json에 아래 내용 추가
            "android": {
              "package": "com.yourcompany.yourname"
            }
* '구글 플레이스토어'에서 'Play 프로텍트 설정' 에서 '기기에 보안 위협이 있는지 검사' 해제

* exp build:ios

안드로이드 TextInput 언더라인 히든
* underlineColorAndroid={"transparent"}

쉐도우는 사용법이 달라서 따로 지정 ios: shadow, android: elevation
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
  }
  
object map
              {Object.values(toDos).reverse().map(toDo => (
                  <Todo
                      key={toDo.id}
                      deleteToDo={this._deleteToDo}
                      uncompleteToDo={this._uncompleteToDo}
                      completeToDo={this._completeToDo}
                      updateToDo={this._updateToDo}
                      {...toDo}
                  />
              ))}

 
