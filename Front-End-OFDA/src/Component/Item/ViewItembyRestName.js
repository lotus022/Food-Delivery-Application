import React, { Component } from "react";
import axios from "axios";
import { TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody } from "@material-ui/core";
import { Button } from "@material-ui/core";
class ViewItembyRestName extends Component{
    constructor(props) {
        super(props);
        this.state={
            restName : this.props.match.params.name,
            itemlist: [  ],
            item : {
                category:{},
                restaurant:{}
            },
            message: ''
        }

      }
    

    componentDidMount() {

        axios.get(`http://localhost:9090/findItemsByRestaurant/${this.state.restName}`)
          .then((result) => {
            const temp = result.data;
            this.setState({
              itemlist : temp,
            });
          });
      }

      updateItem = (itemId) => {
        this.props.history.push(`/UpdateItem/${itemId}`);
      }

      deleteItem = (itemId) => {
        axios.delete(`http://localhost:9090/removeItemById/${itemId}`).then (
            (response) => {
                alert("Item deleted successfully...");
                this.props.history.push(`/ViewAllItemsByRestaurant/${this.state.restName}`);
            });
      }

   render()
    {
        return(
            <div><br/><br/>
            <Typography variant="h4" gutterBottom>Restaurant Item Details</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item Id</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell colSpan="2">Action</TableCell>
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
                      <TableCell><Button variant="contained" color="primary" onClick={()=>this.updateItem(item.itemId)}> UPDATE </Button></TableCell>
                      <TableCell><Button variant="contained" color="primary" onClick={()=>this.deleteItem(item.itemId)}> DELETE </Button></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
     </div>

        );
      
    }
}

export default ViewItembyRestName;