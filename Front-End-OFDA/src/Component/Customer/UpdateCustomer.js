import React, { Component } from 'react';
import { FormControl } from '@material-ui/core';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class UpdateCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id : this.props.match.params.id,
            customer : {
                address :{
                    addId : ''
                },
                firstNameError:'',
                lastNameError:'',
               genderError : '',
               ageError : '',
               mobileNumberError : '',
               emailError : '',
               pwdError : '',
            
                buildingNameError: '',
                areaError: '',
                pincodeError : '',
                streetNoError:'',
                cityError:'',
                stateError:'',
                countryError: ''
            }
         }
    }


    validate =()=>{
       
        let firstNameError="";
         let lastNameError="";
        let genderError = "";
        let ageError = "";
        let mobileNumberError = "";
        let emailError= "";
        let pwdError ="";
     
        let buildingNameError="";
        let areaError="";
        let pincodeError ="";
        let streetNoError="";
        let cityError="";
         let stateError="";
         let countryError="";
         
         if(this.fnameRef.value===""){
             firstNameError="First name should not be empty !!!";
         }
         else if(this.fnameRef.value.length<3){
             firstNameError="First Name should be more than 3 characters";
         }
         else if(!this.fnameRef.value.match(/(?=.[a-z])(?=.*[A-Z])/)){
             firstNameError="First Name should contain only alphabets";
         }
         if(this.lnameRef.value===""){
             lastNameError="Last name should not be empty !!!";
         }
         else if(this.lnameRef.value.length<3){
             lastNameError="Last Name should be more than 3 characters";
         }
         else if(!this.lnameRef.value.match(/(?=.[a-z])(?=.*[A-Z])/)){
             lastNameError="Last Name should not contain numbers";
         }
 
         if(this.ageRef.value===""){
             ageError="Age should not be empty !!!";
         }
         else if(!this.ageRef.value.match(/(?=.\d)/)) {
             ageError="Age must be numeric !!!"; 
         }
 
         if(this.mobNoRef.value===""){
             mobileNumberError="please enter your mobile number";
         }
         else if(!this.mobNoRef.value.match(/^\d{10}$/)) {
             mobileNumberError="please enter valid mobile number"; 
     }
         if(this.emailRef.value===""){
             emailError="EmailId should not be Empty !!!";
         }
         else if(!this.emailRef.value.match( /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)){
             emailError="please enter valid EmailId";
         }
 
         if(this.pwdRef.value===""){
             pwdError="Password should not be Empty !!!";
         }
         else if(!this.pwdRef.value.match(/(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,}/)){
             pwdError="Password must meet requirements !!!";
         }
 
 
 
 
         if(this.buildRef.value===""){
             buildingNameError="Building name should not be empty !!!";
         }
        
         if(this.areaRef.value===""){
             areaError="Area name should not be empty !!!";
         }
 
         if(this.pinRef.value===""){
             pincodeError="Pincode should not be Empty !!!";
         }
         else if(!this.pinRef.value.match(/(?=.\d).{6,}/)){
             pincodeError="Pincode must be 6 digits !!!";
         }
 
         if(this.streetRef.value===""){
             streetNoError="Street Number should not be Empty !!!";
         }
         
         if(this.cityRef.value===""){
             cityError="City should not be Empty !!!";
         }
 
         if(this.stateRef.value===""){
             stateError="State should not be Empty !!!";
         }
         
         if(this.countryRef.value===""){
             countryError="Country should not be Empty !!!";
         }
 
         
         
         if( firstNameError || lastNameError || genderError || ageError || mobileNumberError || emailError || pwdError || buildingNameError || areaError || pincodeError || streetNoError || cityError || stateError || countryError)
         {
             this.setState({
                 firstNameError, lastNameError, genderError, ageError, mobileNumberError, emailError, pwdError, buildingNameError, areaError, pincodeError, streetNoError, cityError, stateError, countryError
            })
             return false;
         }
         return true;
 
     }
 




    componentDidMount () {

        axios.get(`http://localhost:9090/viewCustomer/${this.state.id}`).then (
            (response) => {
                alert("Data fetched successfull...");
                const custData=response.data;
                this.setState({customer:custData});
                
                
                this.fnameRef.value=custData.firstName;
                this.lnameRef.value=custData.lastName;
                this.genderRef.value=custData.gender;
                this.ageRef.value=custData.age;
                this.mobNoRef.value=custData.mobileNumber;
                this.emailRef.value=custData.email;
                this.pwdRef.value=custData.password;
                this.buildRef.value=custData.address.buildingName;
                this.areaRef.value=custData.address.area;
                this.streetRef.value=custData.address.streetNo;
                this.cityRef.value=custData.address.city;
                this.stateRef.value=custData.address.state;
                this.countryRef.value=custData.address.country;
                this.pinRef.value=custData.address.pincode;

            });

    }

    update = () => {
        const isValid=this.validate();
        let Customer = {
            firstName : '',
            lastName : '',
            gender : '',
            age : '',
            mobileNumber : '',
            email : '',
            password : '',
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
            alert('success');
        
        var addId = this.address.addressId;
        Customer.customerId = this.state.id;
        Customer.firstName = this.fnameRef.value;
        Customer.lastName = this.lnameRef.value;
        Customer.gender = this.genderRef.value;
        Customer.age = this.ageRef.value;
        Customer.mobileNumber = this.mobNoRef.value;
        Customer.email = this.emailRef.value;
        Customer.password = this.pwdRef.value;
        Customer.address.addressId = addId;
        Customer.address.buildingName=this.buildRef.value;
        Customer.address.area=this.areaRef.value;
        Customer.address.pincode=this.pinRef.value;
        Customer.address.streetNo=this.streetRef.value;
        Customer.address.city=this.cityRef.value;
        Customer.address.state=this.stateRef.value;
        Customer.address.country=this.countryRef.value;


        axios.put(`http://localhost:9090/updateCustomer`,Customer).then (
            (response) => {
                alert("Customer Profile Updated Successfully...");
                
                this.props.history.push(`/Profile/${this.state.id}`)
                
            }
        )
    }
}

    render() { 
        return (
            <div>
                <h1>Update Profile</h1>
                <FormControl>
                   <TableContainer>
                       <Table>
                           <TableBody>
                               
                                <TableRow>
                                    <TableCell> First Name : </TableCell>
                                    <TableCell><TextField name="fname" label="First Name" variant="outlined" inputRef={value => (this.fnameRef = value)} />
                                    <span style={{fontSize:"2",color:"red"}}>{this.state.firstNameError}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> Last Name : </TableCell>
                                    <TableCell><TextField name="lname" label="Last Name" variant="outlined" inputRef={value => (this.lnameRef = value)}/>
                                    <span style={{fontSize:"2",color:"red"}}>{this.state.lastNameError}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> Gender : </TableCell>
                                    <TableCell><TextField name="gender" label="Gender" variant="outlined" inputRef={value => (this.genderRef = value)}/>
                                    <span style={{fontSize:"2",color:"red"}}>{this.state.genderError}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> Age : </TableCell>
                                    <TableCell><TextField name="age" label="Age" variant="outlined" inputRef={value => (this.ageRef = value)}/>
                                    <span style={{fontSize:"2",color:"red"}}>{this.state.ageError}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Mobile Number : </TableCell>
                                    <TableCell><TextField name="mobNo" label="Mobile Number" variant="outlined" inputRef={value => (this.mobNoRef = value)}/>
                                    <span style={{fontSize:"2",color:"red"}}>{this.state.mobileNumberError}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Email : </TableCell>
                                    <TableCell><TextField name="email" label="Email" variant="outlined" inputRef={value => (this.emailRef = value)}/>
                                    <span style={{fontSize:"2",color:"red"}}>{this.state.emailError}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Password : </TableCell>
                                    <TableCell><TextField name="pwd" label="Password" variant="outlined" inputRef={value => (this.pwdRef = value)}/>
                                    <span style={{fontSize:"2",color:"red"}}>{this.state.pwdError}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>

                                <TableCell>Address :</TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell>Building Name : </TableCell>
                                    <TableCell><TextField name="building" label="Building Namw" variant="outlined" inputRef={value => (this.buildRef = value)}/>
                                    <span style={{fontSize:"2",color:"red"}}>{this.state.buildingNameError}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>Area : </TableCell>
                                <TableCell><TextField name="area" label="Area" variant="outlined" inputRef={value => (this.areaRef = value)}/>
                                <span style={{fontSize:"2",color:"red"}}>{this.state.areaError}</span>
                                </TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>Street Number : </TableCell>
                                <TableCell><TextField name="street" label="Street Number" variant="outlined" inputRef={value => (this.streetRef = value)}/>
                                <span style={{fontSize:"2",color:"red"}}>{this.state.streetNoError}</span>
                                </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>City : </TableCell>
                                    <TableCell><TextField name="city" label="City" variant="outlined" inputRef={value => (this.cityRef = value)}/>
                                    <span style={{fontSize:"2",color:"red"}}>{this.state.cityError}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>State : </TableCell>
                                    <TableCell><TextField name="state" label="State" variant="outlined" inputRef={value => (this.stateRef = value)}/>
                                    <span style={{fontSize:"2",color:"red"}}>{this.state.stateError}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Country : </TableCell>
                                    <TableCell><TextField name="country" label="Country" variant="outlined" inputRef={value => (this.countryRef = value)}/>
                                    <span style={{fontSize:"2",color:"red"}}>{this.state.countryError}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Pincode : </TableCell>
                                    <TableCell><TextField name="pincode" label="Pincode" variant="outlined" inputRef={value => (this.pinRef = value)}/>
                                    <span style={{fontSize:"2",color:"red"}}>{this.state.pincodeError}</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell> <Button variant="contained" color="primary" onClick={this.update}> Submit </Button></TableCell>
                                </TableRow>

                            </TableBody>
                       </Table>
                   </TableContainer>
                </FormControl>
            </div>
        );
    }
}
 
export default UpdateCustomer;