
import React, { Component} from 'react';
import { Button, withStyles ,Grid, Paper, Container, Typography, Box, TableRow, TableCell, Table} from '@material-ui/core';
import axios from 'axios';
import PropTypes from "prop-types";


const useStyles = (theme) => ({
    root: {
      paddingLeft: theme.spacing(5),
    },
    center: {
        paddingTop:theme.spacing(1),
      textAlign: "center",
    },
    spacing:{
        marginTop:theme.spacing(3)
    },
    bottom:{
      marginTop:theme.spacing(4)
  },
  button:{
      marginTop:'20px',
      marginBottom:'30px',
      textAlign: "center"
  }
  });
class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            id : this.props.match.params.id,
            customer : {
                address : {}
            } 
         }
    }

    componentDidMount () {

        axios.get(`http://localhost:9090/viewCustomer/${this.state.id}`).then (
            (response) => {
                 const custData=response.data;
                this.setState({customer:custData});
            });
    }

    update = () => {
          this.props.history.push(`/updateCustomer/${this.state.id}`);
    }

    delete = () => {
        alert("In delete")
        axios.delete(`http://localhost:9090/removeCustomer/${this.state.id}`).then (
            (response) => {
                alert("Customer deleted successfully...");
                this.props.history.push(`/`);
            });
    }

    render() { 
       const { classes } = this.props;
        return ( 
            
                <div>            

        

<Container className={classes.bottom} maxWidth="md">
<Paper elevation={4}>
  <Typography variant="h4" color="primary" className={classes.center}>
    Profile Page
  </Typography><br/>  
  <div>
  <Typography
          color="error"
          display="block"
          className={classes.root}
        >
          Customer Id : {this.state.id}
        </Typography>
  </div>
  <Grid className ={classes.spacing} container spacing={3}>
    <Grid item className={classes.root} xs={6}>
      <Box>
      <Typography
          color="error"
          display="block"
          
        >
          First Name : {this.state.customer.firstName}
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box>
      <Typography
          color="error"
          display="block"
          className={classes.root}
        >
          Last Name : {this.state.customer.lastName}
        </Typography>
      </Box>
    </Grid>
  </Grid>
  <Grid container spacing={3}>
    <Grid item className={classes.root} xs={6}>
      <Box>
      <Typography
          color="error"
          display="block"
          
        >
          Gender : {this.state.customer.gender}
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box>
      <Typography
          color="error"
          display="block"
          className={classes.root}
        >
          Age : {this.state.customer.age}
        </Typography>
      </Box>
    </Grid>
  </Grid>
  <Grid container spacing={3}>
    <Grid item className={classes.root} xs={6}>
      <Box>
      <Typography
          color="error"
          display="block"
          
        >
          Mobile Number : {this.state.customer.mobileNumber}
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box>
      <Typography
          color="error"
          display="block"
          
        >
          Email : {this.state.customer.email}
        </Typography>
      </Box>
    </Grid>
  </Grid>
  <Grid container spacing={3}>
    <Grid item className={classes.root} xs={6}>
      <Box>
        <Typography
          color="error"
          display="block"
          className={classes.root}
        >
          Password : {this.state.customer.password}
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box>
      <Typography
          color="error"
          display="block"
          className={classes.root}
        >
          Building Name : {this.state.customer.address.buildingName}
        </Typography>
      </Box>
    </Grid>
  </Grid>
  <Grid container spacing={3}>
    <Grid item className={classes.root} xs={6}>
      <Box>
      <Typography
          color="error"
          display="block"
          
        >
          Area : {this.state.customer.address.area}
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box>
      <Typography
          color="error"
          display="block"
          className={classes.root}
        >
          Street No : {this.state.customer.address.streetNo}
        </Typography>
      </Box>
    </Grid>
  </Grid>
  <Grid container spacing={3}>
    <Grid item className={classes.root} xs={6}>
      <Box>
      <Typography
          color="error"
          display="block"
          
        >
          City : {this.state.customer.address.city}
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box>
      <Typography
          color="error"
          display="block"
          className={classes.root}
        >
          State : {this.state.customer.address.state}
        </Typography>
      </Box>
    </Grid>
  </Grid>
  <Grid container spacing={3}>
        </Grid>
  <Grid className ={classes.spacing} container spacing={3}>
    <Grid item className={classes.root} xs={6}>
      <Box>
      <Typography
          color="error"
          display="block"
          
        >
          Country : {this.state.customer.address.country}
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box>
      <Typography
          color="error"
          display="block"
          className={classes.root}
        >
          Pincode : {this.state.customer.address.pincode}
        </Typography>
      </Box>
    </Grid>
  </Grid>
  <Grid className ={classes.spacing} container spacing={3}>
    <Grid item className={classes.root} xs={6}>
      <Box>
       
      </Box>
    </Grid>
    </Grid>
    <Grid container spacing={3}>
                <Grid item className={classes.button} xs={12}>
                <Button variant="contained" color="primary" onClick={this.update}> Update Profile </Button>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item className={classes.button} xs={12}>
                <Button variant="contained" color="secondary" onClick={this.delete}> Delete Profile </Button>   
                </Grid>
            </Grid>
</Paper>
</Container>
</div>


);
}
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  };
export default withStyles(useStyles, { withTheme: true })(Profile);