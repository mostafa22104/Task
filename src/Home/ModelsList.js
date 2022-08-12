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

export default function ModelsList({ navigation, route }) {
  // const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [filteredData, setfilteredData] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    getData();
    setfilteredData(models);
  }, []);

  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM MODELS;', [], (tx, results) => {
          var len = results.rows.length;

          if (len > 0) {
            var resultData = [];
            for (var x = 0; x < results.rows.length; x++) {
              resultData[x] = results.rows.item(x);
            }
            //  alert(JSON.stringify(resultData) )
            setModels(resultData);
            setfilteredData(resultData);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = models.filter(function (item) {
        const itemData = item.MODELNAME
          ? item.MODELNAME.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilteredData(newData);
      setSearch(text);
    } else {
      setfilteredData(models);
      setSearch(text);
    }
  };

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#F4F4F4',
      }}>
      <StatusBar backgroundColor={'#adabab'} />
      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: 'row',
          }}>
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
              style={{ width: 25, height: 25 }}
            />
            <Text style={{ fontSize: 12 }}>Back</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              margin: 8,
            }}>
            Model
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.inputStyle}
          placeholder={'Type to search...'}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
        />
        <TouchableOpacity>
          <Image
            source={require('../Image/search.png')}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        numColumns={'2'}
        renderItem={(item) => (
          <View
            style={{
              width: '40%',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ModelDetailse', {
                  modelDetails: models[item.index],
                });
              }}
              style={styles.modalContainer}>
              <Image
                source={{ uri: item.item.IMAGENAME }}
                style={{ width: '80%', height: '70%' }}
              />
            </TouchableOpacity>
            <Text>{item.item.MODELNAME}</Text>
          </View>
        )}
      />
    </View>
  );
}

var styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#DEDEDE',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  inputStyle: {
    width: '80%',
    height: '100%',
  },
  searchContainer: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
});
