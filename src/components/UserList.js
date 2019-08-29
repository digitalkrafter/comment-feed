
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import RandomUser from './RandomUser';

class UserList extends Component {
    render(){
      return this.props.data.map(function(ticketData, ind){
                return (
                    <li key={ind}>
                        <RandomUser
                        data={ticketData}
                        />
                    </li>
                )
            });
    }
}
  
export default UserList;