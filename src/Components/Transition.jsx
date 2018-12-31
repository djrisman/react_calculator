import React, { Component } from 'react';
//import './Cal.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Transition extends Component {

render(){
  const listing = this.props.list;
  console.log(listing);
  return(
    <div>
    <ReactCSSTransitionGroup
    transitionName="fade"
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}>
    {listing.map(list => {
          if(list[1] !== "="){
          return <li>{list[0]}{list[1]}{list[2]} = {list[3]} </li>
          }
      })}
    </ReactCSSTransitionGroup>
    <li><h3><u>Keyboard Keys :</u></h3></li>
      <ul>
        <li>  Number : press "0-9 key"</li>
        <li>  addition : press "+ key"  </li>
        <li>  subtraction : press "- key"</li>
        <li>  division : press  "/ key" </li>
        <li>  multiplication : press "x key" </li>
        <li>  equal : press "enter key" </li>
        <li>  clear : press "0 Number key" </li>
      </ul>
    </div>
  )
}

}
export default Transition;
