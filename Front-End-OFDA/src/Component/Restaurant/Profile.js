import React, { Component } from 'react';
import { Button, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import axios from 'axios';

class RestaurantProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            restId : this.props.match.params.id,
            restaurant : {
                address : {}
            } 
         }
    }

    componentDidMount () {

        axios.get(`http://localhost:9090/viewRestaurantById/${this.state.restId}`).then (
            (response) => {
                alert("Data fetched successfull..."+ response.data.email);
                const resData=response.data;
                this.setState({restaurant:resData});
            });
    }
    editProfile = () =>{
        alert("In update method")
        this.props.history.push(`/UpdateProfile/${this.state.restId}`);
    }

    deleteAccount = () => {
        axios.delete(`http://localhost:9090/removeRestaurantById/${this.state.restId}`).then (
            (response) => {
                alert("Account deleted successfull...")
            });
            this.props.history.push(`/`);
    }

    render() { 
        return ( 
                <div>
                     <h1>Restaurant Profile: {this.state.id}</h1>
                     <Table>
                         <TableBody>
                           
                            <TableRow>Restaurant Id: {this.state.restaurant.restaurantId}</TableRow>
                            <TableRow> Restaurant Name:{this.state.restaurant.restaurantName}</TableRow>
                            <TableRow>Manager Name: {this.state.restaurant.managerName}</TableRow>
                            <TableRow>Contact Number: {this.state.restaurant.contactNumber}</TableRow>
                            <TableRow>Email Id: {this.state.restaurant.email}</TableRow>
                            <TableRow>Contact No: {this.state.restaurant.contactNumber}</TableRow>
                            <TableRow>Password: {this.state.restaurant.password}</TableRow>
                            <TableRow>Address: </TableRow>
                            <TableRow>Building Name: {this.state.restaurant.address.buildingName}</TableRow>
                            <TableRow>Area: {this.state.restaurant.address.area}</TableRow>
                            <TableRow>Street No: {this.state.restaurant.address.streetNo}</TableRow>
                            <TableRow>City: {this.state.restaurant.address.city}</TableRow>
                            <TableRow>State: {this.state.restaurant.address.state}</TableRow>
                            <TableRow>Country: {this.state.restaurant.address.country}</TableRow>
                            <TableRow>Pin Code: {this.state.restaurant.address.pincode}</TableRow>
                            
                         </TableBody>
                    </Table><br/>
                    <Button variant="contained" color="primary" onClick={this.editProfile}> Edit Profile </Button><br/><br/>
                    <Button variant="contained" color="secondary" onClick ={this.deleteAccount}>  Delete Account </Button>
                </div>
         );

    }
}
 
export default RestaurantProfile;