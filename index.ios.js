/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React,{Component} from 'react';
import {AppRegistry,Button,StyleSheet,Image} from 'react-native';
import {TabNavigator} from 'react-navigation';
import timerClass from './timer';
import showTimeClass from './showtime';

class main extends Component {
  render(){
    const { TabNavigation } = this.props;
    return (
      <App navigation={ TabNavigation }/>
    );
  }
}
const MyApp = TabNavigator({
  Timer: {
  screen: timerClass,
},
ShowTime: {
  screen: showTimeClass,
},
},
{
tabBarOptions: {
  activeTintColor: '#33cc33',
},
});
export default MyApp;
AppRegistry.registerComponent('TimeLapApp', ()=>MyApp);
