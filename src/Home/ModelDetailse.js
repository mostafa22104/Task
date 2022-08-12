import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  StatusBar,
  FlatList,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  (error) => {
    console.log(error);
  }
);

export default function ModelDetailse({ navigation, route }) {
  // const {navigation} = useNavigation();

  // alert(JSON.stringify( modelDetails) )

  const [models, setModels] = useState({});

  const [notseData, setNotesData] = useState([]);

  const [lockDetails, setLockdetails] = useState(false);
  const [note, setNote] = useState('');
  const [noteLock, setNoteLock] = useState(false);

  useEffect(() => {
    const { modelDetails } = route.params;
    setModels(modelDetails);
    getData(modelDetails.ID);
  }, []);

  const getData = (modelID) => {
    // console.log("hi")
    try {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Notes WHERE ModalID=' + modelID + ';',
          [],
          (tx, results) => {
            var len = results.rows.length;

            if (len > 0) {
              var resultData = [];
              for (var x = 0; x < results.rows.length; x++) {
                resultData[x] = results.rows.item(x);
              }
              setNotesData(resultData);
            }
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addNotes = async (note) => {
    var newData = notseData;
    if (note) {
      try {
        await db.transaction(async (tx) => {
          await tx.executeSql(
            'INSERT INTO Notes (ModalID,userName, date,noteText)' +
              "VALUES ('" +
              models.ID +
              "','Jennifer Smith','03.02.2021 15:00','" +
              note +
              "');"
          );
        });
        getData(models.ID);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('No notes to add');
    }
    setNote('');
  };

  return (
    <>
      <StatusBar backgroundColor={'#adabab'} />

      <View style={styles.headerContainer}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              margin: 7,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 15,
            }}>
            <Image
              source={require('../Image/arrowLeft.png')}
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ fontSize: 12 }}>Back</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              margin: 8,
            }}>
            Model Details
          </Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Image
            source={require('../Image/edit.png')}
            style={{ width: 14, height: 14 }}
          />
          <Text style={{ fontSize: 14 }}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ marginBottom: 50 }}>
        <View style={styles.detailsContainer}>
          <View
            style={{
              width: '80%',
              height: 180,
              alignSelf: 'center',
              backgroundColor: '#fff',
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{ uri: models.IMAGENAME }}
              style={{ width: '80%', height: '65%' }}
            />
          </View>

          <View
            style={{
              width: '100%',
              height: 50,
              marginTop: 30,
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopWidth: 1,
              borderTopColor: '#ddd',
              flexDirection: 'row',
            }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Image Info</Text>
            <TouchableOpacity
              onPress={() => {
                setLockdetails(!lockDetails);
              }}
              style={{
                width: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={
                  !lockDetails
                    ? require('../Image/arrowTop.png')
                    : require('../Image/arrowDown.png')
                }
              />
            </TouchableOpacity>
          </View>

          {!lockDetails ? (
            <>
              <View style={styles.detailsList}>
                <Text style={{ fontSize: 20 }}>Model</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  {models.MODELTYPE}
                </Text>
              </View>

              <View style={styles.detailsList}>
                <Text style={{ fontSize: 20 }}>Model Name</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  {models.MODELNAME}
                </Text>
              </View>

              <View style={styles.detailsList}>
                <Text style={{ fontSize: 20 }}>Model Type</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  {models.MODELTYPE}
                </Text>
              </View>

              <View style={styles.detailsList}>
                <Text style={{ fontSize: 20 }}>Cost</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  {models.COST}
                </Text>
              </View>

              <View style={styles.detailsList}>
                <Text style={{ fontSize: 20 }}>Category</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  {models.CATEGORY}
                </Text>
              </View>

              <View style={styles.detailsList}>
                <Text style={{ fontSize: 20 }}>Additional Description</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  {models.ADDITIONALDESCRIPION}
                </Text>
              </View>
            </>
          ) : null}

          <View
            style={{
              width: '100%',
              height: 50,
              marginTop: 30,
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopWidth: 1,
              borderTopColor: '#ddd',
              flexDirection: 'row',
            }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Notes</Text>
            <TouchableOpacity
              onPress={() => {
                setNoteLock(!noteLock);
              }}
              style={{
                width: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={
                  !noteLock
                    ? require('../Image/arrowTop.png')
                    : require('../Image/arrowDown.png')
                }
              />
            </TouchableOpacity>
          </View>
          {!noteLock ? (
            <>
              <View
                style={{
                  width: '82%',
                  height: 40,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <View />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      addNotes(note);
                    }}
                    style={{
                      width: 20,
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../Image/save.png')}
                      style={{ margin: 3 }}
                    />
                  </TouchableOpacity>
                  <Text>Save</Text>
                </View>
              </View>

              <TextInput
                style={styles.inputStyle}
                placeholder={'Type a note...'}
                onChangeText={(note) => setNote(note)}
                value={note}
              />
              <View style={{ width: '85%', marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 20,
                  }}>
                  History Notes
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 25,
                  marginTop: 10,
                }}>
                <FlatList
                  data={notseData}
                  renderItem={(item) => (
                    <>
                      <View style={{ padding: 15 }}>
                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                          }}>
                          {item.item.userName}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                          }}>
                          {item.item.date}
                        </Text>
                        <Text
                          style={{
                            fontSize: 17,
                          }}>
                          {item.item.noteText}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: '80%',
                          height: 1,
                          // marginTop:10,
                          backgroundColor: '#ddd',
                          alignSelf: 'center',
                          // marginBottom:10,
                        }}
                      />
                    </>
                  )}
                />
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#DEDEDE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  editButton: {
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '16%',
    height: '65%',
    borderLeftColor: '#000',
    borderWidth: 1,
    borderRadius: 30,
    padding: 3,
    backgroundColor: '#fff',
  },
  detailsContainer: {
    width: '95%',
    backgroundColor: '#EAEAEA',
    alignSelf: 'center',
    borderRadius: 30,
    padding: 25,
    marginTop: 20,
  },
  detailsList: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: '#ddd',
    flexDirection: 'row',
  },
  inputStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    backgroundColor: '#ffff',
    borderRadius: 30,
    fontSize: 20,
    paddingLeft: 10,
  },
});
