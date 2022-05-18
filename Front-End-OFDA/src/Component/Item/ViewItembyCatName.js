import React, { Component } from "react";
import axios from "axios";
import { TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody } from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
class ViewItembyCatName extends Component{
    constructor(props) {
        super(props);
        this.state={
            itemlist: [
            ],
            item : {
                category:{}       
            },
            message: ''
        }
      
      }
    

    componentDidMount() {
        axios.get('http://localhost:9090/viewAllItemsByCategory/Veg')
          .then((result) => {
            alert('fetching Item details...');
            const temp = result.data;
            this.setState({
              itemlist : temp,
            });
          });
      }
  
   

   render()
    {
        return(
            <div>
            <Typography variant="h4" gutterBottom>Item Details</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item Id</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Category</TableCell>
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
                      {/* <TableCell><Button onClick={() => this.deleteItem(item.itemId)}>DELETE</Button></TableCell> */}
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
     </div>

        );
      
    }
}

export default ViewItembyCatName;