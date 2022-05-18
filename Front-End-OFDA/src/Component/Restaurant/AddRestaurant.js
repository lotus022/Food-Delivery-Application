import React, { Component } from 'react';
import axios from 'axios';
import { FormControl } from '@material-ui/core';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class AddRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            restaurantNameError:'',
            managerNameError:'',
            emailError:'',
            passwordError:'',
            contactNumberError : '',
            buildingNameError: '',
            areaError: '',
            pincodeError: '',
            streetNoError:'',
            cityError:'',
            stateError:'',
            countryError: ''

        }
    };

 validate =()=>{

    let restaurantNameError = "";
    let managerNameError="";
    let emailError = "";
    let passwordError = "";
    let contactNumberError = "";
    let buildingNameError = "";
    let areaError = "";
    let pincodeError = "";
    let streetNoError = "";
    let cityError = "";
    let stateError = "";
    let countryError = "";

    if(this.restRef.value===""){
        restaurantNameError="Restaurant Name should not be empty !!!";
    }
    else if(this.restRef.value.length<3){
        restaurantNameError="Restaurant name should be more than 3 characters";
    }
    if(this.managerRef.value===""){
        managerNameError="Manager Name should not be empty";
    }
    else if(!this.managerRef.value.match(/(?=.[a-z])(?=.*[A-Z])/)){
        managerNameError="Manager Name must be alphabetics";
    }

    if(this.emailRef.value===""){
        emailError="please enter EmailId";
    }
    else if(!this.emailRef.value.match( /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)){
        emailError="please enter valid EmailId";
    }

    if(this.pwdRef.value===""){
        passwordError="please set the password";
    }
    else if(this.pwdRef.value<6){
        passwordError="password should be more than 6 characters";
    }
    
    if(this.contactRef.value===""){
        contactNumberError="please enter your mobile number";
    }
    else if(!this.contactRef.value.match(/^\d{10}$/)) {
        contactNumberError="please enter valid mobile number"; 
}
 
   if(this.buildRef.value==="")
   {
       buildingNameError="Building Name should not be empty";
   }
  
   if(this.areaRef.value===""){
       areaError="Area Field should not be empty";
       }
    

    if(this.pinRef.value==""){
        pincodeError="Pincode should not be empty";
    }
    else if(!this.pinRef.value.match(/(?=.\d).{6,}/)){
        pincodeError="Pincode must be 6 digit";
    }

    
    if(this.streetRef.value===""){
        streetNoError="streetno should not be empty";
    }

    if(this.cityRef.value===""){
        cityError="City should not be empty";
    }

    if(this.stateRef.value===""){
        stateError="state should not be empty";
    }

    if(this.countryRef.value===""){
        countryError="country should not be empty";
    }

    if(restaurantNameError || managerNameError || emailError || passwordError || contactNumberError || buildingNameError || areaError || pincodeError || streetNoError || cityError || stateError || countryError){
        this.setState({
            restaurantNameError,managerNameError,emailError,passwordError,contactNumberError,buildingNameError,areaError,pincodeError,streetNoError,cityError,stateError,countryError
             
        })
        return false;
    }
    return true;


    

 }
 cancel=()=>{
    this.props.history.push('/RestaurantLogin');
}
addRestaurant = (event) => {
    const isValid=this.validate();
   
    event.preventDefault();

    let Restaurant = {
        restaurantName: '',
        managerName : '',
        email : '',
        password : '',
        contactNumber : '',
        address : {
            buildingName: '',
            area: '',
            pincode : '',
            streetNo:'',
            city:'',
            state:'',
            country: ''
        }
    }
    
    if(this.validate()){
       
    Restaurant.restaurantName = this.restRef.value;
    Restaurant.managerName = this.managerRef.value;
    Restaurant.email = this.emailRef.value;
    Restaurant.password = this.pwdRef.value;
    Restaurant.contactNumber = this.contactRef.value;
    Restaurant.address.buildingName=this.buildRef.value;
    Restaurant.address.area=this.areaRef.value;
    Restaurant.address.pincode=this.pinRef.value;
    Restaurant.address.streetNo=this.streetRef.value;
    Restaurant.address.city=this.cityRef.value;
    Restaurant.address.state=this.stateRef.value;
    Restaurant.address.country=this.countryRef.value;
  
    alert(Restaurant.restaurantName);

    axios.post('http://localhost:9090/addRestaurant', Restaurant).then(
    (response) => {
        alert("Restaurant Added ..");
    });
    this.props.history.push('/RestaurantLogin')
}
}
    render() { 
        return ( 
       

        <div>
                <h1>Restaurant Registration :</h1>
                <h4>Owner Registration :</h4>
                <FormControl>
                   <TableContainer>
                       <Table>
                           <TableBody>
                                
                                <TableRow>
                                    <TableCell> Restaurant Name : </TableCell>
                                    <TableCell><TextField name="rname" label="Restaurant Name" variant="outlined" inputRef={value => (this.restRef=value)}/><span style={{fontSize:"2",color:"red"}}>{this.state.restaurantNameError}</span></TableCell> 
                                    <TableCell> Manager Name : </TableCell>
                                    <TableCell><TextField name="lname" label="Manager Name" variant="outlined" inputRef={value => (this.managerRef=value)}/><span style={{fontSize:"2",color:"red"}}>{this.state.managerNameError}</span></TableCell>

                                </TableRow>

                                <TableRow>
                                    <TableCell>Email Id : </TableCell>
                                    <TableCell><TextField name="gender" label="EmailId" variant="outlined" inputRef={value => (this.emailRef=value)}/> <span style={{fontSize:"2",color:"red"}}>{this.state.emailError}</span></TableCell>

                                    <TableCell>Create Password : </TableCell>
                                    <TableCell><TextField name="pwd" label="Password" variant="outlined" type="password" inputRef={value => (this.pwdRef=value)}/> <span style={{fontSize:"2",color:"red"}}>{this.state.passwordError}</span></TableCell>
 
                                </TableRow>

                                <TableRow>
                                    <TableCell>Mobile Number : </TableCell>
                                    <TableCell><TextField name="mobNo" label="Mobile Number" variant="outlined" inputRef={value => (this.contactRef=value)}/> <span style={{fontSize:"2",color:"red"}}>{this.state.contactNumberError}</span></TableCell>
                                </TableRow>
                               
                             
                                   <h2>Address :</h2>
                              
                                <TableRow>
                                    <TableCell>Building Name : </TableCell>
                                    <TableCell><TextField name="building" label="Building Name" variant="outlined" inputRef={value => (this.buildRef=value)} /> <span style={{fontSize:"2",color:"red"}}>{this.state.buildingNameError}</span></TableCell>
                                    <TableCell>Area : </TableCell>
                                    <TableCell><TextField name="area" label="Area" variant="outlined" inputRef={value => (this.areaRef=value)}/> <span style={{fontSize:"2",color:"red"}}>{this.state.areaError}</span></TableCell>
                                </TableRow>

                                <TableRow>
                                <TableCell>Street Number : </TableCell>
                                <TableCell><TextField name="street" label="Street Number" variant="outlined" inputRef={value => (this.streetRef=value)}/> <span style={{fontSize:"2",color:"red"}}>{this.state.streetNoError}</span></TableCell>
                                <TableCell>City : </TableCell>
                                <TableCell><TextField name="city" label="City" variant="outlined" inputRef={value => (this.cityRef=value)}/> <span style={{fontSize:"2",color:"red"}}>{this.state.cityError}</span></TableCell>
                                </TableRow>	

                            <TableRow>
                                <TableCell>State : </TableCell>
                                <TableCell><TextField name="state" label="State" variant="outlined" inputRef={value => (this.stateRef=value)}/> <span style={{fontSize:"2",color:"red"}}>{this.state.stateError}</span></TableCell>
                                <TableCell>Country : </TableCell>
                                <TableCell><TextField name="country" label="Country" variant="outlined" value="India" disabled inputRef={value => (this.countryRef=value)}/> <span style={{fontSize:"2",color:"red"}}>{this.state.countryError}</span></TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Pincode : </TableCell>
                                <TableCell><TextField name="pincode" label="Pincode" variant="outlined" inputRef={value => (this.pinRef=value)}/> <span style={{fontSize:"2",color:"red"}}>{this.state.pincodeError}</span> </TableCell>
                            </TableRow>
                            
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell> <Button variant="contained" color="primary" onClick={this.addRestaurant}> Submit </Button></TableCell>
                                <TableCell><Button variant="contained" onClick={this.cancel} color="secondary">  Cancel </Button></TableCell>
                            </TableRow>
                            </TableBody>
                       </Table>
                   </TableContainer>
                </FormControl>
            </div>
        );
    }
}
 
export default AddRestaurant ;