import React, { Component } from "react";
import { Box, Button, Container, Grid, Paper, withStyles  } from "@material-ui/core";
import axios from "axios";
import { TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody } from "@material-ui/core";
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

 class AddOrder extends Component{
    constructor(props) {
        super(props);
        this.state={
            order : {
              restaurant:{},
              customer:{}
            }
        }
      }
    

    componentDidMount() {
        axios.post(`http://localhost:9090/addOrder/${this.props.match.params.id}`)
          .then((result) => {
            alert('Order Added...');
            const orderRes = result.data;
            console.log(result.data);
            this.setState({  order : orderRes });
          });
      }

      addBill=(orderId)=>{
        alert('Generating Bill...'+orderId)
        this.props.history.push(`/AddBill/${orderId}`)
      }

   render()
    {
      const { classes } = this.props;
        return(
                <div><br/>
                    <Container className={classes.bottom} maxWidth="md">
                    <Paper elevation={4}>
                    <Typography variant="h2" color="primary" className={classes.center}>  Order Details </Typography><br/> 

                     <Grid className ={classes.spacing} container spacing={3}>
                    <Grid item className={classes.root} xs={6}>
                      <Box>
                      <Typography
                          color="error"
                          display="block"
                          
                        >
                          Order Id : {this.state.order.orderId}
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
                          Customer Name  : {this.state.order.customer.firstName}
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
                          Order Date : {this.state.order.orderDate}
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
                          Restaurant Name  : {this.state.order.restaurant.restaurantName}
                        </Typography>
                      </Box> 
                    </Grid>
                  </Grid>
                  </Paper>
                    </Container><br/>
                    <Button onClick={()=>this.addBill(this.state.order.orderId)} variant="contained" color="primary">Generate Bill</Button>
                </div>
        );
      
    }
}
AddOrder.propTypes = {
  classes: PropTypes.object.isRequired,
  };
export default withStyles(useStyles, { withTheme: true })(AddOrder);