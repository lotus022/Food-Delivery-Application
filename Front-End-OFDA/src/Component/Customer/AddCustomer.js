import React, { Component } from "react";
import { Box, Container, FormControl, Grid, Paper, Typography, withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import PropTypes from "prop-types";


const useStyles = (theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
  
    paper: {
      marginTop: "1rem",
      marginBotton: "1.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    spacing: {
      marginTop: "1rem",
      textAlign: "center",
    },
    left: {
      textAlign: "left",
    },
    formControl: {
      minWidth: "30ch",
      height: "5ch",
    },
    right: {
      textAlign: "right",
      marginTop: "0.5rem",
      marginRight: "0.5rem",
    },
    spacing1: {
      marginTop: "1.5rem",
      marginBotton: "1.5rem"
    },
    spacing2: {
      marginTop: "1rem",
      
      marginLeft: "-2.5rem"
    },
    spacing3 : {
        marginTop: "0.5rem",
        textAlign:"left",
        paddingLeft:"1rem"
    },
    spacing4 : {
        marginTop: "0.5rem",
        textAlign:"left",
        paddingLeft:"2.5rem"
    },
    span: {
      textAlign: "left",
      marginLeft: "-4rem"
    },
    submit: {
        paddingTop: "2rem",
        paddingBotton: "2rem"
    },
    span1 : {
        textAlign : "right",
        marginTop: "-1.3rem",
        marginRight:"-0.5rem"
    }
  });

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameError: "",
      lastNameError: "",
      genderError: "",
      ageError: "",
      mobileNumberError: "",
      emailError: "",
      pwdError: "",

      buildingNameError: "",
      areaError: "",
      pincodeError: "",
      streetNoError: "",
      cityError: "",
      stateError: "",
      countryError: "",
    };
  }

  validate = () => {
    let firstNameError = "";
    let lastNameError = "";
    let genderError = "";
    let ageError = "";
    let mobileNumberError = "";
    let emailError = "";
    let pwdError = "";

    let buildingNameError = "";
    let areaError = "";
    let pincodeError = "";
    let streetNoError = "";
    let cityError = "";
    let stateError = "";
    let countryError = "";

    if (this.fnameRef.value === "") {
      firstNameError = "First name should not be empty !!!";
    } else if (this.fnameRef.value.length < 3) {
      firstNameError = "First Name should be more than 3 characters";
    } else if (!this.fnameRef.value.match(/(?=.[a-z])(?=.*[A-Z])/)) {
      firstNameError = "First Name should contain only alphabets";
    }
    if (this.lnameRef.value === "") {
      lastNameError = "Last name should not be empty !!!";
    } else if (this.lnameRef.value.length < 3) {
      lastNameError = "Last Name should be more than 3 characters";
    } else if (!this.lnameRef.value.match(/(?=.[a-z])(?=.*[A-Z])/)) {
      lastNameError = "Last Name should not contain numbers";
    }

    if (this.ageRef.value === "") {
      ageError = "Age should not be empty !!!";
    } else if (!this.ageRef.value.match(/(?=.\d)/)) {
      ageError = "Age must be numeric !!!";
    }

    if (this.mobNoRef.value === "") {
      mobileNumberError = "Please enter your mobile number";
    } else if (!this.mobNoRef.value.match(/^\d{10}$/)) {
      mobileNumberError = "Please enter valid mobile number";
    }
    if (this.emailRef.value === "") {
      emailError = "EmailId should not be Empty !!!";
    } else if (
      !this.emailRef.value.match(
        /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
      )
    ) {
      emailError = "Please enter valid EmailId";
    }

    if (this.pwdRef.value === "") {
      pwdError = "Password should not be Empty !!!";
    } else if (this.pwdRef.value.length < 6) {
      pwdError = "Password must meet requirements !!!";
    }

    if (this.buildRef.value === "") {
      buildingNameError = "Building name required !!!";
    }

    if (this.areaRef.value === "") {
      areaError = "Area name should not be empty !!!";
    }

    if (this.pinRef.value === "") {
      pincodeError = "Pincode should not be Empty !!!";
    } else if (!this.pinRef.value.match(/(?=.\d).{6,}/)) {
      pincodeError = "Pincode must be 6 digits !!!";
    }

    if (this.streetRef.value === "") {
      streetNoError = "Street Number should not be Empty !!!";
    }

    if (this.cityRef.value === "") {
      cityError = "City should not be Empty !!!";
    }

    if (this.stateRef.value === "") {
      stateError = "State should not be Empty !!!";
    }

    if (this.countryRef.value === "") {
      countryError = "Country should not be Empty !!!";
    }

    if (
      firstNameError ||
      lastNameError ||
      genderError ||
      ageError ||
      mobileNumberError ||
      emailError ||
      pwdError ||
      buildingNameError ||
      areaError ||
      pincodeError ||
      streetNoError ||
      cityError ||
      stateError ||
      countryError
    ) {
      this.setState({
        firstNameError,
        lastNameError,
        genderError,
        ageError,
        mobileNumberError,
        emailError,
        pwdError,
        buildingNameError,
        areaError,
        pincodeError,
        streetNoError,
        cityError,
        stateError,
        countryError,
      });
      return false;
    }
    return true;
  };

  addCustomer = () => {
    const isValid = this.validate();
    let Customer = {
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      mobileNumber: "",
      email: "",
      password: "",
      address: {
        buildingName: "",
        area: "",
        pincode: "",
        streetNo: "",
        city: "",
        state: "",
        country: "",
      },
    };
    if (this.validate()) {
      alert("success");
      Customer.firstName = this.fnameRef.value;
      Customer.lastName = this.lnameRef.value;
      Customer.gender = this.genderRef.value;
      Customer.age = this.ageRef.value;
      Customer.mobileNumber = this.mobNoRef.value;
      Customer.email = this.emailRef.value;
      Customer.password = this.pwdRef.value;
      Customer.address.buildingName = this.buildRef.value;
      Customer.address.area = this.areaRef.value;
      Customer.address.pincode = this.pinRef.value;
      Customer.address.streetNo = this.streetRef.value;
      Customer.address.city = this.cityRef.value;
      Customer.address.state = this.stateRef.value;
      Customer.address.country = this.countryRef.value;

      alert(
        Customer.firstName +
          Customer.lastName +
          Customer.gender +
          Customer.age +
          Customer.mobileNumber +
          Customer.email +
          Customer.password +
          Customer.address.buildingName +
          Customer.address.area +
          Customer.address.pincode +
          Customer.address.streetNo +
          Customer.address.city +
          Customer.address.state +
          Customer.address.country
      );
      //alert(this.state.firstName+this.state.address.area)
      axios
        .post("http://localhost:9090/addCustomer", Customer)
        .then((response) => {
          alert("Added...");
        });
      this.props.history.push("/");
    }
  };

  render() {
      const {classes} = this.props;
    return (
      <div>
       <Container maxWidth="md">
          <Paper elevation={6}>
              <Box className={classes.spacing1} style={{paddingTop:"0.5rem"}}>
                <Typography variant="h4" className={classes.spacing1} ><b>Customer Registration</b></Typography><br/>
              </Box>
        <Container maxWidth="md">
        <Box>
                <Typography variant="h5" className={classes.spacing3}><b>PERSONAL DETAILS</b></Typography>
              </Box>
          <Paper className={classes.paper} elevation={6}>
            <FormControl>
              <Grid container className={classes.spacing2} spacing={2}>
                <Grid item md={6}>
                  <TextField
                    name="fname"
                    label="First Name"
                    variant="outlined"
                    inputRef={(value) => (this.fnameRef = value)}
                  />
                </Grid>
                
                <Grid item md={6}>
                <TextField
                      name="lname"
                      label="Last Name"
                      variant="outlined"
                      inputRef={(value) => (this.lnameRef = value)}
                    />
                   
                </Grid>
              </Grid>
              <span className={classes.span} style={{ fontSize: "2", color: "red" }}> {this.state.firstNameError} </span> <span className={classes.span1} style={{ fontSize: "2", color: "red" }}> {this.state.lastNameError}  </span>
              <Grid container className={classes.spacing2} spacing={2}>
                <Grid item md={6}>
                <TextField
                      name="gender"
                      label="Gender"
                      variant="outlined"
                      inputRef={(value) => (this.genderRef = value)}
                    />
                    
                </Grid>
                <Grid item md={6}>
                <TextField
                      name="age"
                      label="Age"
                      variant="outlined"
                      inputRef={(value) => (this.ageRef = value)}
                    />
                    
                </Grid>
              </Grid>
                  <span  className={classes.span1} style={{ fontSize: "2", color: "red",paddingTop:"1.2rem",paddingRight:"3rem" }}>
                    {this.state.ageError}
                </span>
              <Grid container className={classes.spacing2} spacing={2}>
                <Grid item md={6}>
                <TextField
                      name="mobNo"
                      label="Mobile Number"
                      variant="outlined"
                      inputRef={(value) => (this.mobNoRef = value)}
                    />
                    
                </Grid>
                <Grid item md={6}>
                <TextField
                      name="email"
                      label="Email"
                      variant="outlined"
                      inputRef={(value) => (this.emailRef = value)}
                    />
                    
                </Grid>
              </Grid>
              <span className={classes.span} style={{ fontSize: "2", color: "red" }}>
                      {this.state.mobileNumberError}
                    </span>
                    <span className={classes.span1} style={{ fontSize: "2", color: "red",paddingRight:"1.7rem" }}>
                      {this.state.emailError}
                    </span>
              <Grid container className={classes.spacing2} spacing={2}>
                <Grid item md={6}>
                <TextField
                      name="pwd"
                      label="Create Password"
                      variant="outlined"
                      type="password"
                      inputRef={(value) => (this.pwdRef = value)}
                    />
                    
                </Grid>
               
            </Grid>
              
            <span style={{ fontSize: "2", color: "red",marginLeft:"-17rem"}}>
                      {this.state.pwdError}
                    </span>
            </FormControl>
          </Paper>
        </Container>
        <Box>        <Typography className={classes.spacing4} variant="h5" ><b>ADDRESS </b></Typography>
        </Box>

        <Container maxWidth="md">
          <Paper className={classes.paper} elevation={6}>
            <FormControl>
              <Grid container className={classes.spacing2} spacing={2}>
                <Grid item md={6}>
                <TextField
                      name="building"
                      label="Building Name"
                      variant="outlined"
                      inputRef={(value) => (this.buildRef = value)}
                    />
                   
                </Grid>
                <Grid item md={6}>
                <TextField
                      name="area"
                      label="Area"
                      variant="outlined"
                      inputRef={(value) => (this.areaRef = value)}
                    />
                   
                    
                </Grid>
              </Grid>
              <span className={classes.span} style={{ fontSize: "2", color: "red",marginLeft:"-2rem" }}>
                      {this.state.buildingNameError}
                    </span>
                    <span className={classes.span1} style={{ fontSize: "2", color: "red" }}>
                      {this.state.areaError}
                    </span>
              <Grid container className={classes.spacing2}  spacing={2}>
                <Grid item md={6}>
                <TextField
                      name="street"
                      label="Street Number"
                      variant="outlined"
                      inputRef={(value) => (this.streetRef = value)}
                    />
                    
                </Grid>
                <Grid item md={6}>
                <TextField
                      name="city"
                      label="City"
                      variant="outlined"
                      inputRef={(value) => (this.cityRef = value)}
                    />
                   
                </Grid>
              </Grid>
              <span className={classes.span} style={{ fontSize: "2", color: "red" }}>
                      {this.state.streetNoError}
                    </span>
                    <span className={classes.span1} style={{ fontSize: "2", color: "red" }}>
                      {this.state.cityError}
                    </span>
              <Grid container className={classes.spacing2} spacing={2}>
                <Grid item md={6}>
                <TextField
                      name="state"
                      label="State"
                      variant="outlined"
                      inputRef={(value) => (this.stateRef = value)}
                    />
                    
                </Grid>
                <Grid item md={6}>
                <TextField
                      name="country"
                      label="Country"
                      variant="outlined"
                      value="India"
                      disabled
                      inputRef={(value) => (this.countryRef = value)}
                    />
                </Grid>
              </Grid>
              <span className={classes.span} style={{ fontSize: "2", color: "red",marginLeft:"-1.6      rem" }}>
                      {this.state.stateError}
                    </span>
                    
              <Grid container className={classes.spacing2} spacing={2}>
                <Grid item md={6}>
                <TextField
                      name="pincode"
                      label="Pincode"
                      variant="outlined"
                      inputRef={(value) => (this.pinRef = value)}
                    />
                    <span  style={{ fontSize: "2", color: "red",paddingBottom: "5rem" }}>
                      {this.state.pincodeError}
                    </span>
                </Grid>
            </Grid>
              
            </FormControl>
          </Paper>
          <Box className={classes.submit}>
          <Button
                      variant="contained"
                      color="primary"
                      onClick={this.addCustomer}
                      size="large"
                    >
                        REGISTER 
                    </Button>
                    </Box><br/><br/>
        </Container>
        </Paper>
        </Container>






                
                
            
            
      </div>
    );
  }
}
AddCustomer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles, { withTheme: true })(AddCustomer);

