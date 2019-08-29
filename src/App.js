import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import UserList from './components/UserList';
import axios from 'axios';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            userTicketsData: [],
            showing: true,
            firstName: '',
            lastName:''
        };
   
        this.clearUsers = this.clearUsers.bind(this);
        this.requestUser = this.requestUser.bind(this);
        this.generate = this.generate.bind(this);
        this.toggle = this.toggle.bind(this);
        this.togleBox = this.togleBox.bind(this);
    }
  
    componentDidMount() {
        this.requestUser();
    }

    clearUsers() {
        this.setState({
            userTicketsData: []
        });
    }
    requestUser() {
        const self = this;
        axios.get("https://randomuser.me/api/").then(function (res) {
            console.log(res);
            const data = res.data.results[0];
            const tickets = self.state.userTicketsData.slice();
            tickets.unshift(data);
            self.setState({
                userTicketsData: tickets
            });
        });
    }
   
  
    generate() {
        if (this.state.userTicketsData.length) {
            return (
                <ul className="ticketsList">
                    <UserList
                        data={this.state.userTicketsData}
                    />
                </ul>
            );
        }
        return <div>Please Generate User</div>
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    togleBox() {
        this.setState({
            showing: !this.state.showing
        });
    }
    handleChange=(e)=> {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit = (e) => {
        alert(`${this.state.firstName} ${this.state.lastName}`);
        const user = {
            firstName: this.state.firstName,
            lastName:this.state.lastName
          };

        e.preventDefault();
        axios.post("https://randomuser.me/api/", { user }).then(function (res) {
            console.log(res);
            console.log(res.data.results);
           });
	}
 

    render() {
        const userTicket = this.generate();
        return (
            <div className="main-body">
                <div className="mx-auto mt-5">
                    <Button color="primary" size="sm" onClick={this.toggle}> Comments </Button>
                </div>
     
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <Button color="primary" size="sm" onClick={this.requestUser}>Refresh for Comments</Button>{' '}
            
                        <Button color="primary" size="sm" onClick={this.clearUsers}>Clear Comments</Button>{' '}
                        <div className="usersTicketsContainer">
                            {userTicket}
                        </div>
                        <hr />
                        
                        <Button color="primary" size="lg" onClick={this.togleBox}>Add Comment</Button>{' '}
                        <br/>
                        <div className="usersTicketsContainer" style={{ display: (this.state.showing ? 'block' : 'none') }}>
                <form onSubmit={this.handleSubmit} className="mt-5 mx-auto">
                <div class="form-group">
                <label for="exampleInputEmail1">First Name </label>{' '}
                      <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                </div>
                <div class="form-group">
                <label for="exampleInputPassword1">Last Name </label>{' '}
                     <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                        </div>
                    </ModalBody>
                  
                </Modal>

        
         
            </div>
     
        )
    }
}



export default App;
