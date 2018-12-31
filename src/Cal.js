import React, { Component } from 'react';
import './Cal.css';
import Transition from './Components/Transition';

class Cal extends Component {

    state = {
        value:null,
        input: "0",
        isWait: false,
        operator:null,
        listHistory:[],
        newList:[],
      };

    componentDidMount(){
        document.onkeydown = (e)=>{
          let keyb = String(e.keyCode);
          const filter_key = ['191','88','189','187','13','190','48','49','50','51','52','53','54','55','56','57'];
          const keyb_operator = { 191: '/', 88: '*', 189: '-', 187: '+', 13: '='};

          if(filter_key.includes(keyb)){
                if (Object.keys(keyb_operator).includes(keyb)) {
                  this.Calculate(keyb_operator[keyb]);
                  e.preventDefault()
                }else if(keyb === "190"){
                    this.inputDot();
                    e.preventDefault()
                }else{
                    keyb = String.fromCharCode(e.keyCode);
                    this.inpuntNumber(keyb);
                    //console.log(keyb);
                    e.preventDefault()
                }
            }
        }
  }

  Calculate(next_op){
    const {input, operator, value} = this.state;

    const calculation = {
      "/" : (preValue, nextValue) => preValue / nextValue,
      "*" : (preValue, nextValue) => preValue * nextValue,
      "-" : (preValue, nextValue) => preValue - nextValue,
      "+" : (preValue, nextValue) => preValue + nextValue,
      "=" : (preValue, nextValue) =>  nextValue
    };

    const nextValue = parseFloat(input);

    if(value==null){
      this.setState({
        value: nextValue
      })
    }else if(operator){

      const currentValue = value;
      const calculatedValue = calculation[operator](currentValue,nextValue);
      const newList = [currentValue,operator,nextValue, calculatedValue];

      this.setState({
        value: calculatedValue,
        input: String(calculatedValue),
        listHistory: [...this.state.listHistory, newList]
      })
    }
    this.setState({
      isWait:true,
      operator:next_op,
    })
  }

  inpuntNumber(Num){
    const {input, isWait} = this.state;
    if(isWait){
      this.setState({
        input : String(Num),
        isWait:false
      })
    }else {
      this.setState({
        input : input === "0" ? String(Num): input + String(Num),
      })
    }

  }

  inputDot(){
    const {input, isWait} = this.state;
    if(isWait){
      this.setState({
        input : ".",
        isWait:false
      })
    }else if(input.indexOf(".") === -1){
        this.setState({
          input : input + ".",
        })
      }
  }

  Clear() {
    const { input } = this.state;
    this.setState({
      input:  '0'
    })
  }

  render() {
    console.log(this.state);
    const {input, listHistory} = this.state;
    return (
      <div>
      <div className="app"  >
      {/*<pre>{JSON.stringify(this.state,null,2)}</pre>*/}
          <div className="calc-wrapper">
            <div className="input" id="input">{input}</div>
            <div className="row">
              <button className="button-wrapper clear-btn" onClick ={() => this.Clear()} >Clear</button>
              <button className="button-wrapper operator" onClick ={() =>this.Calculate("/")} >÷</button>
            </div>
            <div className="row">
              <button className="button-wrapper" onClick={() => this.inpuntNumber(7)} >7</button>
              <button className="button-wrapper" onClick={() => this.inpuntNumber(8)} >8</button>
              <button className="button-wrapper" onClick={() => this.inpuntNumber(9)} >9</button>
              <button className="button-wrapper operator" onClick ={() =>this.Calculate("*")}>x</button>
            </div>
            <div className="row">
              <button className="button-wrapper" onClick={() => this.inpuntNumber(4)} >4</button>
              <button className="button-wrapper" onClick={() => this.inpuntNumber(5)} >5</button>
              <button className="button-wrapper" onClick={() => this.inpuntNumber(6)} >6</button>
              <button className="button-wrapper operator" onClick ={() =>this.Calculate("+")}>+</button>
            </div>
            <div className="row">
              <button className="button-wrapper" onClick={() => this.inpuntNumber(1)} >1</button>
              <button className="button-wrapper" onClick={() => this.inpuntNumber(2)} >2</button>
              <button className="button-wrapper" onClick={() => this.inpuntNumber(3)} >3</button>
              <button className="button-wrapper operator" onClick ={() =>this.Calculate("-")}>-</button>
            </div>
            <div className="row">
              <button className="button-wrapper duo" onClick={() => this.inpuntNumber(0)} >0</button>
              <button className="button-wrapper" onClick={() => this.inputDot()} >.</button>
              <button className="button-wrapper operator" onClick ={() =>this.Calculate("=")}>=</button>
            </div>
          </div>
        </div>
        <div className="app1">
            <ul>
                <li><h3><u>List of Calculation :</u></h3></li>
                <Transition list={listHistory} />
            </ul>
        </div>
      </div>
    );
  }
}
export default Cal;
