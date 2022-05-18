import React, { Component } from "react";
import axios from "axios";
import { TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody } from "@material-ui/core";

export default class RemoveOrder extends Component{
    constructor(props) {
        super(props);
        this.state={
            order : ""
        }
      }
    

    componentDidMount() {
        axios.delete(`http://localhost:9090/removeOrderByOrderId/`+25)
          .then((result) => {
            alert('Order Deleted...');
            const employees = result.data;
            this.setState({
              order : employees,
            });
          });
      }

   render()
    {
        return(
        <div>
            <TableContainer>
              <Table>
                  <TableRow>{this.state.order}</TableRow>
              </Table>
            </TableContainer>
     </div>

        );
      
    }
}