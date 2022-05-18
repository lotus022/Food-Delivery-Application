import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Container, IconButton, Paper, TextField, withWidth } from '@material-ui/core';
import AddCategory from '../Category/AddCategory';
import { TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody } from "@material-ui/core";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';


class RestaurantHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            open :false,
            restId : this.props.match.params.id,  
            restaurant : {},
            addCat : '',
            orderlist: [  ],
            order : {}
        }
    }

    componentDidMount = () => {
        axios.get(`http://localhost:9090/viewRestaurantById/${this.state.restId}`).then (
            (response) => {
                const resData=response.data;
                this.setState({restaurant:resData});
            })

            axios.get(`http://localhost:9090/viewAllOrdersByRestaurant/${this.state.restId}`)
          .then((result) => {
            const temp = result.data;
            this.setState({
              orderlist : temp
            });
          });
    }

    refrshPage = () => {
        window.location.reload();
    }

    viewProfile = () =>{
        this.props.history.push(`/RestaurantProfile/${this.state.restId}`);
    }

    viewAllCust = () => {
        
        this.props.history.push(`/ViewAllCustByRest/${this.state.restaurant.restaurantName}`);
    }

    addItem = () => {
        
        this.props.history.push(`/AddItemToRestaurant/${this.state.restId}`);
    }

    handleClickOpen = () => {
        this.setState({open :true});
      };

    handleClose = () => {
        this.setState({open :false});
        this.setState({addCat:this.catRef.value});
        this.addCategory();
    };

    addCategory = () => {

        let Category = {
            categoryName : ''
         }
 
        Category.categoryName = this.catRef.value;
        axios.post('http://localhost:9090/addCategory',Category).then(
            (response) => {
                   alert("Category added...")
            }
        );
    }

    viewAllItems = () => {
        this.props.history.push(`/ViewAllItemsByRestaurant/${this.state.restaurant.restaurantName}`);
    }

    deleteOrder = (orderId) => {
        axios.delete(`http://localhost:9090/removeOrderByOrderId/${orderId}`)
          .then((result) => {
            alert('Order Deleted...');
            const orders = result.data;
            this.setState({ order : orders });
          });
    }

    viewBillsBtwDate = (restId) => {
        alert("In bills between Date");
        this.props.history.push(`/ViewBillBtwDate/${restId}`);
      }

      logout =() => {
        this.props.history.push('/');
      }
      

    render() { 
        return ( 
            <div> <br/>
              <Container maxWidth="lg">
                  <Paper elevation={6}>
                      <Box p={2}>
                        <div style={{textAlign:"right"}}>
                        <Button variant="contained" color="primary" onClick={this.logout}> <ExitToAppSharpIcon></ExitToAppSharpIcon>LOGOUT</Button>

                        </div>
                        <div>

                        </div>
                        <h1><i>Welcome To {this.state.restaurant.restaurantName}</i>  </h1>

                        <div>
                        <Button variant="contained" color="primary" onClick={this.handleClickOpen}> ADD CATEGORY </Button>
                        <Button variant="contained" color="primary" onClick={this.addItem} style={{marginLeft:"30px"}}> ADD ITEM </Button>
                        <Button variant="contained" color="primary" onClick={this.viewAllItems} style={{marginLeft:"30px"}}> VIEW ALL ITEMS </Button>
                        <Button variant="contained" color="primary" onClick={() =>this.viewBillsBtwDate(this.state.restId)} style={{marginLeft:"30px"}}>View Bills Btw Date </Button>
                        <Button variant="contained" color="primary" onClick={this.viewAllCust} style={{marginLeft:"30px"}}> ALL CUSTOMERS </Button>
                        <Button variant="contained" color="primary" onClick={this.viewProfile} style={{marginLeft:"30px"}}> <AssignmentIndIcon size="large"></AssignmentIndIcon>VIEW PROFILE </Button>
                  
                        </div>
                      </Box>
                 </Paper>

              </Container><br/>
              <br/>
                      <Typography variant="h4" ><b>Recent Orders</b></Typography><br/>
              <Container maxWidth="lg">
                    <Paper elevation={6}>
                    <div>        
                      <TableContainer>
              <Table>
                <TableHead style={{backgroundColor:"black"}}>
                  <TableRow>
                    <TableCell style={{color:"orange"}}>ORDER ID</TableCell>
                    <TableCell style={{color:"orange"}}>ORDER DATE</TableCell>
                    <TableCell style={{color:"orange"}}>ORDER STATUS</TableCell>
                    <TableCell style={{color:"orange"}}>RESTAURANT</TableCell>
                    <TableCell style={{color:"orange"}}>CUSTOMER NAME</TableCell>
                    <TableCell style={{color:"orange"}}>ACTION</TableCell>
                   
                  </TableRow>
                </TableHead>
                <TableBody>
                {this.state.orderlist.map((order) =>(
                     <TableRow key={this.state.order.orderId}>
                      <TableCell style={{color:"red"}}>{order.orderId}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.orderStatus}</TableCell>
                      <TableCell>{order.restaurant.restaurantName}</TableCell>
                      <TableCell>{order.customer.firstName}</TableCell>
                      <TableCell><Button variant="contained" color="primary" onClick={() => {this.deleteOrder(order.orderId);this.refrshPage()}}>DELETE</Button></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
                      </div>
                    </Paper>
              </Container>
            <h1></h1>
            
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Enter Category Name</DialogTitle>
                    <DialogContent>
                    <TextField  autoFocus   margin="dense"  id="area" label="Category" inputRef={value => (this.catRef = value)} type="text" fullWidth/>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">  CANCEL     </Button>
                    <Button onClick={this.handleClose} color="primary">  ADD     </Button>
                    </DialogActions>    
                </Dialog>

                
            
            </div>
        );
    }
}
 
export default RestaurantHomePage;
