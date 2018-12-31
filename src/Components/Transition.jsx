import React, { Component } from 'react';
//import './Cal.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Transition extends Component {

render(){
  const listing = this.props.list;
  console.log(listing);
  return(
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

  )
}

}
export default Transition;
