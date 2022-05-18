import React, { Component } from "react";
import axios from "axios";
import { TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody } from "@material-ui/core";

export default class ViewOrdersByCust extends Component{
    constructor(props) {
        super(props);
        this.state={
            orderlist: [
            ],
            order : {}
        }
      }
    

    componentDidMount() {
         alert(this.props.match.params.id);
        axios.get(`http://localhost:9090/viewAllOrdersByCustomer/${this.props.match.params.id}`)
          .then((result) => {
            alert('fetching Order details...');
            const temp = result.data;
            this.setState({
              orderlist : temp,
            });
          });
      }

   render()
    {
        return(
            <div>
            <Typography variant="h4" gutterBottom>Restaurant Order Details</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order Id</TableCell>
                    <TableCell>Order Date</TableCell>
                    <TableCell>Order Status</TableCell>
                    <TableCell>Restaurant</TableCell>
                    <TableCell>Customer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {this.state.orderlist.map((order) =>(
                     <TableRow key={this.state.order.orderId}>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.orderStatus}</TableCell>
                      <TableCell>{order.restaurant.restaurantName}</TableCell>
                      <TableCell>{order.customer.firstName}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
     </div>

        );
      
    }
}