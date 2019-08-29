import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';


class RandomUser extends Component {
    constructor(props){
        super(props);
        this.state = {displayData: "name"};
       
        this.getDisplayData = this.getDisplayData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    
    getDisplayData(){
        const data = this.props.data;
        const key = this.state.displayData;
        switch(key){
            case "name":
                return (
                    <div className="name">
                        <div>
                            Name:
                        </div>
                        <div>
                            {data.name.first + ' ' + data.name.last}
                        </div>
                    </div>
                );
            case "dob":
                return (
                    <div className="dob">
                        <div>
                            Birthday:
                        </div>
                        <div>
                            {data.dob}
                        </div>
                    </div>
                );
            case "location":
                return (
                    <div className="location">
                        <div>
                            Location:
                        </div>
                        <div>
                            {data.location.street + ', ' + data.location.city + ', ' + data.location.state}
                        </div>
                    </div>
                );
            case "contact":
                return (
                    <div className="contact">
                        <div>
                            Contact Information:
                        </div>
                        <div>
                            E-Mail: {data.email}
                        </div>
                        <div>
                            Phone: {data.phone}
                        </div>
                        <div>
                            Mobile: {data.cell}
                        </div>
                    </div>
                );
            default:
                return (
                    <div>
                        ERROR!!!
                    </div>
                );
        }
    }
    
    handleClick(e){
        const key = e.currentTarget.className.split(' ')[0];
        this.setState({displayData: key});
    }
    
    render(){
        const data = this.props.data;
      
        const displayData = this.getDisplayData();
        
        return(
            <div className="usersContainBox">
                <div className="userImgContainBox">
                    <img className="imgtagBox" alt="" src={data.picture.large} />
                </div>
                <div className="displayDataContainer">
                    <hr />
                    {displayData}
                    <hr />
                </div>
            </div>
        );
    }
}
  
export default RandomUser;