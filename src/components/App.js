import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HolderComponent from './HolderComponent'
import axios from 'axios'

class App extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      displayName: ''
    }
  }

  //TODO:
  //check state to see if there's a facebook display name. if there's a display name, then display that, but if there isn't, display the username

  componentDidMount(){
    //some stuff here, not sure just yet.
    axios.get('http://localhost:3000/users/').then((data) =>{
      this.setState({
        username: data.data.username,
        displayName: data.data.facebook_name
      })
      console.log(data)
    }).catch((error) =>{
      console.log(error)
    })
  }

  displayName(){
    console.log('inside displayName')
    console.log(this.state)
    if(this.state.displayName){
      return <HolderComponent name={this.state.displayName} />
    } else {
      return <HolderComponent name={this.state.username} />
    }
  }

  render(){
    return(
      <div className='App'>
        {this.displayName()}
        <a href='/connect/facebook'>Connect with Facebook!</a>
      </div>
    )
  }
}

export default App;
