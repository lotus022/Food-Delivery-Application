import React, { Component } from "react";
import {
  Box,
  Container,
  FormControl,
  Grid,
  Link,
  Paper,
  RootRef,
  Typography,
  withStyles,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import FastfoodSharpIcon from "@material-ui/icons/FastfoodSharp";
import axios from "axios";

const useStyles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },

  paper: {
    marginTop: "6.5rem",
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
    marginBottom: "1.5rem",
  },

  span: {
    textAlign: "center",
    marginLeft: "10.5rem",
  },
});

class RestaurantLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pwd: "",

      emailError: "",
      pwdError: "",
    };
  }

  validate = () => {
    let emailError = "";
    let pwdError = "";
    if (this.unameRef.value === "") {
      emailError = "Email Id should not be Empty !!!";
    } else if (
      !this.unameRef.value.match(
        /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
      )
    ) {
      emailError = "Enter Email in Correct Format !!!";
    }

    if (this.passwordRef.value === "") {
      pwdError = "Password should not be Empty !!!";
    } else if (this.passwordRef.value.length < 6) {
      pwdError = "Password must meet requirements !!!";
    }
    if (emailError || pwdError) {
      this.setState({
        emailError,
        pwdError,
      });
      return false;
    }
    return true;
  };

  login = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    let restaurant = {
      email: "",
      password: "",
    };

    if (this.validate()) {
      restaurant.email = this.unameRef.value;
      restaurant.password = this.passwordRef.value;
      alert(restaurant.email + " -> " + restaurant.password);

      axios
        .get(
          `http://localhost:9090/restaurantLogin/${restaurant.email}/${restaurant.password}`
        )
        .then((response) => {
          alert("Restaurant Login successfull...");
          this.props.history.push(`/RestaurantHome/${response.data.restaurantId}`)
        }).catch(error=>{alert("Invalid credentials")});
    }
    
  };
  custlogin=()=>{
    this.props.history.push('/')
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <form onSubmit = {this.addLogin.bind(this)}> */}
        <Container maxWidth="sm">
          <Paper className={classes.paper} elevation={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box className={classes.right}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.custlogin}
                  >
                    <b>Customer Login</b>
                  </Button>
                </Box>
                <FastfoodSharpIcon fontSize="large"></FastfoodSharpIcon>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h4">
                  <b>Restaurant Login</b>
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.spacing}>
                <TextField
                  name="uname"
                  label="Email Id"
                  variant="outlined"
                  inputRef={(value) => (this.unameRef = value)}
                />
              </Grid>
              <span
                className={classes.span}
                style={{ fontSize: "2", color: "red" }}
              >
                {this.state.emailError}
              </span>
              <Grid item xs={12} className={classes.spacing}>
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  inputRef={(value) => (this.passwordRef = value)}
                />
              </Grid>
              <span
                className={classes.span}
                style={{ fontSize: "2", color: "red" }}
              >
                {this.state.pwdError}
              </span>
              <Grid item xs={12} className={classes.spacing}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={this.login}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} className={classes.spacing1}>
                <Typography>
                  <Link
                    href="/RegisterRestaurant"
                    onClick={this.registerRestaurant}
                    variant="body2"
                  >
                    "Don't have an account? Sign Up as Restaurant"
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    );
  }
}
RestaurantLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles, { withTheme: true })(RestaurantLogin);
