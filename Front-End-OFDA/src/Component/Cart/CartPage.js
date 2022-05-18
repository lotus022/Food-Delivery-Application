import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { Component } from 'react';


class CartPage extends Component {
   
    constructor(props) {
        super(props);
        this.state = { 
            id :this.props.match.params.id,
            cartId : '',
            itemList : [ ],
            qty : 1
         }
    }

    componentDidMount () {

        alert("In view All method")
            axios.get(`http://localhost:9090/viewAllItems/${this.state.id}`).then (
                (response) => {
                    alert("Fetching cart items...");
                    const items= response.data;
                    this.setState({itemList:items});
                });       
    }
 

   increase = (iId) => {
        alert("In increase method")
        let qty1=this.state.qty+1;
        this.state.qty=qty1;
        axios.put(`http://localhost:9090/increaseQuantity/${this.state.id}/${iId}`).then (
            (response) => {
                alert("Increasing items...");
                const items= response.data;
                alert(items);
                this.setState({itemList:items});
            }
        )
    }

    decrease = (itemId) => {
        alert("In decrease method")
        axios.put(`http://localhost:9090/reduceQuantity/${this.state.id}/${itemId}`).then (
            (response) => {
                alert("Reducing items...");
                const items= response.data;
                // this.setState({itemList:items});
            }
        )
    }
   
    removeItem = (itemId) => {
        alert("In remove item....");
        alert(this.state.id+itemId)
        axios.delete(`http://localhost:9090/removeItem/${this.state.id}/${itemId}`).then (
            (response) => {
                alert("Item deleted successfully...");
                const items= response.data;
                const temp=this.state.itemList.filter(item=>item.itemId!=itemId);
                this.setState({itemList:temp});
                //this.setState({i})
                // this.setState({itemList:items});
            }
        )
    }

    clear = () => {
        alert("In clear cart method");
        axios.delete(`http://localhost:9090/clearCart/${this.state.id}`).then (
                (response) => {
                    alert("Cart is cleared...");
                    //const items= response.data;
                    this.setState({itemList:[]});
                });
    }

    placeOrder = (cartId) =>  {
        this.props.history.push(`/AddOrder/${cartId}`);
    }
    
    render() { 
        return (  
            <div>
              <br/><br/>              
                <Typography variant="h4" ><b>Your Cart</b></Typography><br/>
              <Container maxWidth="md">
                    <Paper elevation={6}>
                    <div>        
                      <TableContainer>
              <Table>
                <TableHead style={{backgroundColor:"black"}}>
                  <TableRow>
                  <TableCell  style={{color:"orange"}}>ITEM ID</TableCell>
                        <TableCell  style={{color:"orange"}}>ITEM NAME</TableCell>
                        <TableCell  style={{color:"orange"}}>COST</TableCell>
                        <TableCell  style={{color:"orange"}}>QTY</TableCell>
                        <TableCell  style={{color:"orange"}}>INCREASE</TableCell>
                        <TableCell  style={{color:"orange"}}>DECREASE</TableCell>
                        <TableCell  style={{color:"orange"}}>ACTION</TableCell>
                 </TableRow>
                </TableHead>
                            <TableBody>
                        {this.state.itemList.map((item) =>(
                            <TableRow key={item.itemId}>
                                <TableCell>{item.itemId}</TableCell>
                                <TableCell>{item.itemName}</TableCell>
                                <TableCell>{item.cost}</TableCell>
                                <TableCell>{this.state.qty}</TableCell>
                                <TableCell><Button variant="contained" color="primary" onClick={()=>this.increase(item.itemId)}>+</Button></TableCell>
                                <TableCell><Button variant="contained" color="primary" onClick={()=>this.decrease(item.itemId)}>-</Button></TableCell>
                                <TableCell><Button variant="contained" color="primary" onClick={()=>this.removeItem(item.itemId)}>DELETE</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
              </Table>
            </TableContainer>
                      </div>
                    </Paper>
              </Container><br/>
                <Button variant="contained" color="primary" onClick={()=>this.clear(this.state.id)}>Clear cart</Button>
                <Button variant="contained" color="primary" style={{marginLeft:"3rem"}} onClick={()=>this.placeOrder(this.state.id)}>Place Order</Button>
            </div>
        );
    }
}

export default CartPage;