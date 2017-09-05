import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,TouchableOpacity} from 'react-native';
import Data from './DataModel';

export default class  timerClass extends Component {
  static navigationOptions = {
   tabBarLabel: 'Timer',
   setParams:({
        params:{pointer: this },
   }),
   tabBarIcon: ({ tintColor }) => (
     <Image
       source={require('./Icons/timer.png')}
       style={[styles.iconTab, {tintColor: tintColor}]}
     />
   ),
 };

componentDidMount(){
  Data.getInstance()._saveTimerPointer(this);
}
  constructor(props) {
    super(props);
    this.state = {
      millisec: "00",
      sec: "00",
      minutes: "00",
      timer: null,
      LapMilliSec: "00",
      LapSec: "00" ,
      LapMinutes: "00",
    };
  }

 render(){
   return(
     <View style={styles.viewContainer}>
       <View style={styles.headerContainer}>
         <Text style={styles.TitleContainer}>TIMER</Text>
       </View>
       <View style={styles.TimerContainer}>
         <Text style={styles.TimeContainer}>{this.state.minutes}</Text>
         <Text style={styles.colonContainer}>:</Text>
         <Text style={styles.TimeContainer}>{this.state.sec}</Text>
         <Text style={styles.colonContainer}>:</Text>
         <Text style={styles.TimeContainer}>{this.state.millisec}</Text>
       </View>

       <View style={styles.ButtonContainer}>

       <TouchableOpacity
        onPress={() => this._StartTimer()}>
         <View style={styles.button}>
         <Image
           source={require('./Icons/Start.png')}
           style={styles.icon}
         />
       </View>
      </TouchableOpacity>

         <TouchableOpacity
          onPress={() => this._stopTimer()}>
         <View style={styles.button}>
         <Image
           source={require('./Icons/stop.png')}
           style={styles.icon}
         />
         </View>
     </TouchableOpacity>

     <TouchableOpacity
      onPress={() => this._LapTimer()}>
         <View style={styles.button}>
         <Image
           source={require('./Icons/stopwatch.png')}
           style={styles.icon}
         />
         </View>
     </TouchableOpacity>

       </View>

       <TouchableOpacity
        onPress={() => this._resetButtonAction()}>
           <View style={styles.resetButton}>
            <Text style={styles.resetButtonText}>RESET</Text>
           </View>
       </TouchableOpacity>

     </View>
   );


 }
 //main timer
 _Set=()=>{
    var milisecNum = (Number(this.state.millisec) +1).toString(),
         secNum = this.state.sec,
         minutesNum = this.state.minutes;

   if (Number(this.state.millisec)==99){
     secNum = (Number(this.state.sec)+1).toString();
     milisecNum = "00";
   }


   if (Number(this.state.sec) == 59) {
     minutesNum = (Number(this.state.minutes)+1).toString();
     secNum = "00";
   }
    this.setState({
      millisec: milisecNum.length == 1 ? '0'+milisecNum : milisecNum,
      sec: secNum.length == 1 ? '0'+secNum : secNum,
      minutes : minutesNum.length == 1 ? '0'+minutesNum : minutesNum,
    });

   var milisecNumLap = (Number(this.state.LapMilliSec) +1).toString(),
        secNumLap = this.state.LapSec,
        minutesNumLap = this.state.LapMinutes;

  if (Number(this.state.LapMilliSec)==99){
    secNumLap = (Number(this.state.LapSec)+1).toString();
    milisecNumLap = "00";
  }

  if (Number(this.state.LapSec) == 59) {
    minutesNumLap = (Number(this.state.LapMinutes)+1).toString();
    secNumLap = "00";
  }
   this.setState({
     LapMilliSec: milisecNumLap.length == 1 ? '0'+milisecNumLap : milisecNumLap,
     LapSec: secNumLap.length == 1 ? '0'+secNumLap : secNumLap,
     LapMinutes : minutesNumLap.length == 1 ? '0'+minutesNumLap : minutesNumLap,
   });
}
   _StartTimer=()=>{
     console.log("=======================");
     console.log(this.props.navigation);
     this.state.timer = setInterval(()=>{this._Set()},10);
   }
   _stopTimer=()=>{
      clearInterval(this.state.timer);
       Data.getInstance()._addElements('TOTAL TIME : '+this.state.minutes+':'+this.state.sec+':'+this.state.millisec);
   }
   _resetButtonAction=()=>{
     this.setState({
       millisec: "00",
       sec: "00",
       minutes: "00",
       LapMilliSec: "00",
       LapSec: "00" ,
       LapMinutes: "00",
     });
     Data.getInstance()._resetData();
   }

   _LapTimer=()=>{
     Data.getInstance()._addElements(this.state.LapMinutes+':'+this.state.LapSec+':'+this.state.LapMilliSec);
     this.setState({
       LapMinutes: '00',
       LapSec: '00',
       LapMilliSec: '00',
     });
   }
}


const styles = StyleSheet.create({
  viewContainer : {
    flex : 1,
    backgroundColor: 'black',
    marginTop:22,
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
  TimerContainer : {
    marginTop: 50,
    height : 200,
    backgroundColor : 'black',
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TimeContainer : {
    fontSize: 75,
    fontFamily: "digital-7",
    color: '#c4ff4d',
    width:'20%',
    alignItems: 'center',
    textAlign: 'center',
  },
  colonContainer : {
    fontSize: 75,
    fontFamily: "digital-7",
    color: '#c4ff4d',
    width: '10%',
    alignItems: 'center',
    textAlign: 'center',
  },
  ButtonContainer :{
    height : 100,
    flexDirection : 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button : {
    height: 50,
    width: 50,
  },
  icon : {
    height: 50,
    width: 50,
  },
  resetButton : {
    height : 50,
    width : '50%',
    marginLeft: '25%',
    alignItems: 'center',
  },
  resetButtonText : {
    height: 50,
    fontSize: 40,
    padding: 10,
    color: '#1affff',
    fontFamily: "digital-7",
  },
  iconTab: {
    width: 26,
    height: 26,
  },
});
