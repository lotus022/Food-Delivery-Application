import React, { Component } from 'react';
import { FormControl } from '@material-ui/core';
import { Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';

class AddCategory extends Component {

    constructor(props) {
        super(props);
        this.state ={
            categoryNameError:'',
        }
    };

    validate =()=>{

        let categoryNameError = "";
        if(this.cnameRef.value===""){
           categoryNameError="Category Name should not be empty !!!";
        }

        if(categoryNameError){
            this.setState({
                categoryNameError
                 
            })
            return false;
        }
        return true;
    }


    addCategory = () => {
        const isValid=this.validate();

        let Category = {
           categoryName:''
        }
        if(this.validate()){
            alert('success');

        Category.categoryName = this.cnameRef.value;
        alert(Category.categoryName);

        axios.post('http://localhost:9090/addCategory',Category).then(
            (response) => {
                   alert("Category added...")
            }
        );
    }

}
    render() { 
        return (
            <div>
                <h1>Add Category</h1>
                <FormControl>
                   <TableContainer>
                       <Table>
                           <TableBody>
                                <TableRow>
                                    <TableCell> Category Name : </TableCell>
                                    <TableCell><TextField name="cname" label="Category Name" variant="outlined" error helperText="This is required field" inputRef={value => (this.cnameRef = value)}></TextField><span style={{fontSize:"2",color:"red"}}>{this.state.categoryNameError}</span></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell> <Button variant="contained" color="primary" onClick={this.addCategory}> Submit </Button></TableCell>
                                </TableRow>

                            </TableBody>
                       </Table>
                   </TableContainer>
                </FormControl>
            </div> 
        );
    }
}
 
export default AddCategory;