import React, { Component } from 'react';
import { FormControl } from '@material-ui/core';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';


import axios from 'axios';


class ViewCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            CategoryList : []
        }
    }

    
    componentDidMount () {
        alert("Fetching details....");
        axios.get('http://localhost:9090/viewAllCategory').
            then(
                (response) =>
                this.setState({CategoryList:response.data})
         );
    }

  
    
    render() { 
        
        return (
            <div>
                <h1>View Category</h1>
                <FormControl>
                   <TableContainer>
                       <Table>
                           <TableBody> 
                                <TableRow>
                                    <TableCell> Category Id </TableCell>
                                    <TableCell> Category Name </TableCell>
                                </TableRow>
                                {this.state.CategoryList.map((cat) =>
                                 <TableRow key={cat.catId}>
                                 <TableCell>{cat.catId}</TableCell>
                                 <TableCell>{cat.categoryName}</TableCell>
                             </TableRow>
                                )}
                            </TableBody>
                       </Table>
                   </TableContainer>
                </FormControl>
            </div> 
        );
    }
}
 
export default ViewCategory;


