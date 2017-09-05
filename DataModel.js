import React,{Component} from 'react';
import showTimeClass from './showtime';
export default class Data extends Component {
  static myInstance = null;
  static getInstance() {
       if (this.myInstance == null) {
           this.myInstance = new Data();
       }

       return this.myInstance;
   }

   constructor(props){
     super(props);
     this.state={
       DataArray: [],
       index : 0,
       timerPointer: null,
       lapPointer: null,
     };
   }
   _saveLapPointer=(pointer)=>{
     this.state.lapPointer=pointer;
   }
  _saveTimerPointer=(pointer)=>{
    this.state.timerPointer=pointer;
  }
   _returnDataArray=()=>{
      return this.state.DataArray;
   }

   _addElements=(element)=>{
     this.state.DataArray.push({time:element,
                    index:this.state.index});
     this.state.index=this.state.index+1;
     this.state.lapPointer._UpdateTableData();
   }

   _resetData=()=>{
     this.state.DataArray=[];
     this.state.index=0;
     this.state.lapPointer._resetTableArray();
   }
}
