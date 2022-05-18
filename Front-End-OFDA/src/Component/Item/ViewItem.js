import React, { Component } from "react";
import axios from "axios";
//import styles from '@material-ui/core/styles';
import { TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody, Paper} from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Delete } from '@material-ui/icons';
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';


class ViewItem extends Component{
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
        this.deleteItem.bind(this);
      }
    

    componentDidMount() {
        axios.get(`http://localhost:9090/viewAllItemsByItemName/momos`)
          .then((result) => {
            const temp = result.data;
            this.setState({
              itemlist : temp,
            });
          });
      }
      deleteItem = (id) => {
        axios.delete('http://localhost:9090/removeItemById/' + id)
            .then(res => {
                this.setState({ message: 'Record Deleted' })
                const temp=this.state.itemlist.filter(item=>item.itemId!==id);
                this.setState({itemlist:temp})
            });
          

    }
   

   render()
    {
    
        return(
            <div style={{display: 'flex', alignItems: 'center', height: 400, width: '100%', justifyContent: 'center'}}>
            <Typography variant="h4" align="center" gutterBottom>Item Name Details</Typography>
            <TableContainer>
              <Table size="medium">
                <TableHead style={{backgroundColor:'skyBlue'}}>
                  <TableRow>
                    <TableCell align="center"><h4>Item Id</h4></TableCell>
                    <TableCell align="center"><h4>Item Name</h4></TableCell>
                    <TableCell align="center"><h4>Quantity</h4></TableCell>
                    <TableCell align="center"><h4>Cost</h4></TableCell>
                    <TableCell align="center"><h4>Category</h4></TableCell>
                    <TableCell align="center"><h4>Actions</h4></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {this.state.itemlist.map((item) =>(
                     <TableRow key={item.itemId}>
                      <TableCell align="center">{item.itemId}</TableCell>
                      <TableCell align="center">{item.itemName}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">{item.cost}</TableCell>
                      <TableCell align="center">{item.category.categoryName}</TableCell>
                      <TableCell align="center"> <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}  onClick={() => this.deleteItem(item.itemId)}>Delete</Button></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
     </div>

        );
      
    }
}

export default ViewItem;