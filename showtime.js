import React,{Component} from 'react';
import {View,StyleSheet,Image,Text,FlatList} from 'react-native';
import Data from './DataModel';
import { NavigationActions } from 'react-navigation'

export default class  showTimeClass extends Component {
  static navigationOptions = ({TabNavigator})=>({
  tabBarLabel: 'Lap Time',
  tabBarIcon: ({ tintColor }) => (
    <Image
      source={require('./Icons/feed.png')}
      style={[styles.iconTab, {tintColor: tintColor}]}
    />
  ),
});
  constructor(props){
    super(props);
    this.state={
      tableData:[]
    };
  }

 _UpdateTableData=()=>{
   this.setState({
     tableData: Array.from(Data.getInstance()._returnDataArray())
   });
  }
  componentDidMount(){
   Data.getInstance()._saveLapPointer(this);
  }
  _resetTableArray=()=>{
    this.setState({
      tableData: []
    });
  }
 render(){
   return(
     <View style={styles.viewContainer}>

     <View style={styles.headerContainer}>
       <Text style={styles.TitleContainer}>LAPS</Text>
     </View>

     <View style={styles.tableContainer}>

     <FlatList data={this.state.tableData}
      keyExtractor ={item => item.index}
      renderItem={({item}) =>(
        <View style={styles.rowContainer}>
         <Text style={styles.itemContainer}>{item.time}</Text>
        </View>
      )}
      />
     </View>

     </View>
   )
 }}
const styles = StyleSheet.create({
  viewContainer : {
    flex : 1,
    backgroundColor: 'black',
    marginTop: 22,
  },
  headerContainer : {
    height : 60,
    backgroundColor : 'black',
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleContainer : {
    height: 60,
    fontSize: 50,
    padding: 10,
    color: '#ff6600',
    fontFamily: "digital-7",
  },
  tableContainer : {
    backgroundColor: 'black',
    height: '90%'
  },
  rowContainer : {
    height: 70,
    flexDirection: 'row',
  },
  itemContainer : {
    marginLeft: 10,
    paddingTop: 10,
    padding: 10,
    fontSize: 35,
    color: '#00ff00',
    fontFamily: "digital-7",
  },
  iconTab: {
    width: 26,
    height: 26,
  },
});
