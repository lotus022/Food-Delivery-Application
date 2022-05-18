import React, { Component } from 'react';
import axios from "axios";
import { TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody, Container, Paper, Box } from "@material-ui/core";
import { Button } from "@material-ui/core";


class RestaurantPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restName : this.props.match.params.name,
            cartId : this.props.match.params.cartId,
            itemlist: [  ],
            item : {
                category:{},
                restaurant:{}                
            } }
    }

    componentDidMount() {
        axios.get(`http://localhost:9090/findItemsByRestaurant/${this.state.restName}`)
          .then((result) => {
           
            const temp = result.data;
            this.setState({ itemlist : temp});
        });
    }

    addToCart = (itemId) => {

        axios.post(`http://localhost:9090/addItemToCart/${this.state.cartId}/${itemId}`)
          .then((result) => {
            alert('Item added to cart...');
           
        });

    }

    render() { 
        return (  
            <div>
                 <h1><i>Welcome to {this.state.restName} Restaurant</i></h1>
                  <h3>Order the Food & Enjoy the meal !!!</h3>
               
            <Container maxWidth="lg">
                    <Paper elevation={6}>
                    <div>        
                      <TableContainer>
              <Table>
                <TableHead style={{backgroundColor:"black"}}>
                  <TableRow>
                    <TableCell style={{color:"orange"}}>Item Id</TableCell>
                    <TableCell style={{color:"orange"}}>Item Name</TableCell>
                    <TableCell style={{color:"orange"}}>Quantity</TableCell>
                    <TableCell style={{color:"orange"}}>Cost</TableCell>
                    <TableCell style={{color:"orange"}}>Category</TableCell>
                    <TableCell style={{color:"orange"}}>Action</TableCell>
                   
                  </TableRow>
                </TableHead>
                <TableBody>
                {this.state.itemlist.map((item) =>(
                     <TableRow key={item.itemId}>
                      <TableCell>{item.itemId}</TableCell>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.cost}</TableCell>
                      <TableCell>{item.category.categoryName}</TableCell>
                      <TableCell><Button variant="contained" color="primary" onClick={()=>this.addToCart(item.itemId)}>Add to Cart</Button></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
                      </div>
                    </Paper>
              </Container>
                
            </div>
        );
    }
}
 
export default RestaurantPage;



