import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';
import React, { Component } from 'react';

class ViewAllCustByRest extends Component {
    state = { 
        name: this.props.match.params.name,
        customerList:[]
     }

     componentDidMount(){
         alert("in Component")
        axios.get(`http://localhost:9090/viewAllCustomerByRestaurant/${this.state.name}`).then(
            (response) => {
                alert("View All Cutomers ..");
                const temp = response.data;
                this.setState({customerList : temp});
            }
         );
     }

    render() { 
        return ( 
            <div>
                <h1>All Customer List..!</h1>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer Id </TableCell>
                                <TableCell>First Name </TableCell>
                                <TableCell>Last Name </TableCell>
                                <TableCell>Mobile Number </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.customerList.map((customer) =>(
                            <TableRow key={customer.customerId}>
                                <TableCell>{customer.customerId}</TableCell>
                                <TableCell>{customer.firstName}</TableCell>
                                <TableCell>{customer.lastName}</TableCell>
                                <TableCell>{customer.mobileNumber}</TableCell>
                                {/* <TableCell><Button variant="contained" color="primary" onClick={()=>this.increase(item.itemId)}>+</Button></TableCell>
                                <TableCell><Button variant="contained" color="primary" onClick={()=>this.decrease(item.itemId)}>-</Button></TableCell>
                                <TableCell><Button variant="contained" color="primary" onClick={()=>this.removeItem(item.itemId)}>Delete</Button></TableCell> */}
                            </TableRow>
                        ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </div>
         );
    }
}
 
export default ViewAllCustByRest;