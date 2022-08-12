import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  StatusBar,
  
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
      name: 'MainDB',
      location: 'default',
  },
  () => { },
  error => { console.log(error) }
);


export default function Home( { navigation,route}) {
  // const[notesCheck,setNotesCheck]=useState(true)
  // const[modelsCheck,setModelsCheck]=useState(true)

  useEffect(() => {
    createTableNotes();
    createTable();
   getNotesData();
   getModelsData();
  
});





  const createTable = () => {
    

    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "MODELS"
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, MODEL TEXT,MODELNAME TEXT,"
            +"MODELTYPE TEXT,COST INTEGER,CATEGORY TEXT,ADDITIONALDESCRIPION TEXT,IMAGENAME TEXT);"
        )
    })
  }
  

  const setData = async () => {
   
        try {
         
            await db.transaction(async (tx) => {
                
                await tx.executeSql(
                    "INSERT INTO MODELS (MODEL, MODELNAME,MODELTYPE,COST,CATEGORY,ADDITIONALDESCRIPION,IMAGENAME)"
                    +"VALUES ('GT2000', 'GT2000','Hello1','200$','Devices','High speed',"
                    +"'https://www.kindpng.com/picc/m/153-1533005_printer-png-free-image-download-epson-latest-printer.png'),"
                    +"('Lcd x', 'Lcd x','Hello2','700$','Devices','High speed',"
                    +"'https://clipart.world/wp-content/uploads/2020/09/Lcd-screen-monitor-TV-png.png'),"

                    +"('Laptops', 'Laptops','Hello3','1000$','Devices','Fast speed',"
                    +"'https://m.media-amazon.com/images/I/61XS1+c+kXL._AC_SL1500_.jpg'),"
                    +"('Coloers', 'Coloers','Hello4','100$','Devices','High Quality'," 
                    +"'https://png.pngtree.com/png-clipart/20190618/original/pngtree-plastic-bottle-color-colored-plastic-bottle-cartoon-png-image_3922541.jpg');"

                );
                
            })
           
        } catch (error) {
            console.log(error);
        }
    
}
const getModelsData = () => {
  
  try {
      db.transaction((tx) =>{
          tx.executeSql(
              "SELECT * FROM MODELS;",
              [],
              (tx, results) => {
                console.log(results.rows.length)
                  var len = results.rows.length;
                  
                  if (len == 0) {
                    setData();
                  }
              }
          )
      })
  } catch (error) {
      console.log(error);
  }
}
 
const createTableNotes = () => {
  db.transaction((tx) => {
      tx.executeSql(
          "CREATE TABLE IF NOT EXISTS "
          + "Notes"
          + "(ID INTEGER PRIMARY KEY AUTOINCREMENT,ModalID TEXT,userName TEXT,date TEXT,"
          +"noteText TEXT);"
      )
  })
}
const getNotesData = () => {
  
  try {
      db.transaction((tx) =>{
          tx.executeSql(
              "SELECT * FROM Notes;",
              [],
              (tx, results) => {
                console.log(results.rows.length)
                  var len = results.rows.length;
                  
                  if (len == 0) {
                    setNotesData();
                  }
              }
          )
      })
  } catch (error) {
      console.log(error);
  }
}



const setNotesData = async () => {
   
  try {
   
      await db.transaction(async (tx) => {
          
          await tx.executeSql(
              "INSERT INTO Notes (ModalID,userName, date,noteText)"
              +"VALUES ('1','Mostafa Brakat','03.02.2021 15:00','This item need to be checked'),"
              +"('3','Jennifer Smith','12.04.2021 18:35','Good item i like it');" 
          )
      })
     
  } catch (error) {
      console.log(error);
  }

}


// const destroyTaples = () => {
  
//   try {
//       db.transaction((tx) =>{
//           tx.executeSql(
//               "DROP TABLE Notes;",
//               [],
//               (tx, results) => {
                    
//               }
//           )
//       })
//   } catch (error) {
//       console.log(error);
//   }
// }






  return (
    <>
      <StatusBar backgroundColor={'#adabab'} />
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ 
            margin: 7,
            alignItems:'center',
            justifyContent:'center',
            marginLeft:15
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
            Pictuer
          </Text>
        </View>
        <View
          style={{
            margin: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
             <Image
              source={require('../Image/check.png')}
              style={{ width: 25, height: 25 }}
            />
          <Text style={{ fontSize: 10 }}>proccess</Text>
        </View>
      </View>


     <TouchableOpacity style={styles.proccessButton}>
      <View style={{flexDirection:'row'}}>
      <Image source={require("../Image/asset.png",)}
      style={{width:25,height:25}} />
      <Text 
      style={{fontSize:20,fontWeight:'bold'}}
      > Asset Inventory</Text>
      </View>
        <Image source={require("../Image/next.png",)}
      style={{width:20,height:20}} />
     </TouchableOpacity>


     <TouchableOpacity 

     onPress={() => navigation.navigate('ModelsList')}

     style={styles.proccessButton}>
     <View style={{flexDirection:'row'}}>
      <Image source={require("../Image/person.png",)}
      style={{width:25,height:25}} />
      <Text 
      style={{fontSize:20,fontWeight:'bold'}}
      > Model</Text>
      </View>
        <Image source={require("../Image/next.png",)}
      style={{width:20,height:20}} />
     </TouchableOpacity>


     <TouchableOpacity style={styles.proccessButton}>
     <View style={{flexDirection:'row'}}>
      <Image source={require("../Image/person.png",)}
      style={{width:30,height:30}} />
      <Text 
      style={{fontSize:20,fontWeight:'bold'}}
      > Person</Text>
      </View>
        <Image source={require("../Image/next.png",)}
      style={{width:20,height:20}} />
     </TouchableOpacity>
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
  },
 
  proccessButton:{
    width:"77%",
    height:55,
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:25,
    backgroundColor:'#EAEAEA',
    alignItems:'center',
    paddingLeft:20,
    borderRadius:28,
    paddingRight:20,

  }
});
