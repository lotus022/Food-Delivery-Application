import React, { Component } from "react";
import axios from "axios";
import { TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody, Button, Grid, Box, Container, Paper, withStyles } from "@material-ui/core";
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



class AddBill extends Component{
    constructor(props) {
        super(props);
        this.state={
            bill : {
              order:{
                customer:{}
              }
            }
        }
      }

      componentDidMount() {
        alert(this.props.match.params.id)
        axios.post(`http://localhost:9090/addBill/${this.props.match.params.id}`)
          .then((result) => {
            alert('Bill Added...');
            const billdata = result.data;
            this.setState({ bill : billdata });
          });
      }
      goToHome = () => {
        this.props.history.push(`/CustomerHome/${this.state.bill.order.customer.customerId}`);
      }

      render()
    {
      const { classes } = this.props;
        return(

          <div><br/>
          <Container className={classes.bottom} maxWidth="md">
          <Paper elevation={4}>
          <Typography variant="h2" color="primary" className={classes.center}>  Bill Details </Typography><br/> 

           <Grid className ={classes.spacing} container spacing={3}>
          <Grid item className={classes.root} xs={6}>
            <Box>
            <Typography
                color="error"
                display="block"
                
              >
                Customer Name : {this.state.bill.order.customer.firstName}
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
                Bill Id  : {this.state.bill.billId}
              </Typography>
            </Box> 
          </Grid>
        </Grid>

        <Grid className ={classes.spacing} container spacing={3}>
          <Grid item className={classes.root} xs={6}>
            <Box>
            <Typography
                color="error"
                display="block"
                
              >
                Bill Date : {this.state.bill.billDate}
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
                Total Item : {this.state.bill.totalItem}
              </Typography>
            </Box> 
          </Grid>
        </Grid>

        <Grid className ={classes.spacing} container spacing={3}>
          <Grid item className={classes.root} xs={6}>
            <Box>
            <Typography
                color="error"
                display="block"
               >
                Total Cost : {this.state.bill.totalCost}
              </Typography>
            </Box>
          </Grid>
          
        </Grid>
        </Paper>
          </Container><br/>
        
          <Button onClick={this.goToHome} variant="contained" color="primary">GO TO HOME</Button>   
              </div>
       );
      
    }
}
AddBill.propTypes = {
  classes: PropTypes.object.isRequired,
  };
export default withStyles(useStyles, { withTheme: true })(AddBill);