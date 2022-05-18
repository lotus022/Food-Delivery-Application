import React, { Component } from "react";
import axios from "axios";
import { TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody } from "@material-ui/core";
import { Button } from "@material-ui/core";
export default class ViewOrders extends Component{ /************************** / Delete this page ***************************/
    constructor(props) {
        super(props);
        this.state={
            orderlist: [
            ],
            order : {},
            message: ''
        }

      }    

    componentDidMount() {
        axios.get(`http://localhost:9090/viewAllOrdersByRestaurant/${this.props.match.params.name}`)
          .then((result) => {
            alert('fetching Order details...');
            const temp = result.data;
            this.setState({
              orderlist : temp,
            });
          });
      }
    //   deleteOrder = (id) => {
    //     axios.delete('http://localhost:9090/removeOrderByOrderId/' + id)
    //         .then(res => {
    //             //  alert(res.data);
    //             this.setState({ message: 'Record Deleted' })
    //             const temp=this.state.orderlist.filter(order=>order.orderId!=id);
    //             this.setState({orderlist:temp})
    //         });
          

    // }

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
                    {/* <TableCell>Actions</TableCell> */}
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
                      {/* <TableCell><Button onClick={() => this.deleteOrder(order.orderId)}>DELETE</Button></TableCell> */}
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
     </div>

        );
      
    }
}