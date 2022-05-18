import React, { Component } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody, TextField } from "@material-ui/core";

export default class ViewBillsByCust extends Component{
    constructor(props) {
        super(props);
        this.state={
            resid:this.props.match.params.resid,
            custid:this.props.match.params.custId,
            billList : [
            ],
        }
      }

      componentDidMount() {
            this.state.billList=this.props.match.params.id;
            axios.get(`http://localhost:9090/viewBillByCustomerId/${this.state.custid}`)
              .then((result) => {
                alert('Bill fetched..');
                const billdata = result.data;
                this.setState({
                  billList : billdata
                })
                 const temp=this.state.billList.filter(bill=>bill.order.restaurant.restaurantId=this.state.resid);
                 this.setState({billList:temp})
              });
          }
        



          render()
          {
      
              return(
                  <div>
                  <Typography variant="h4" gutterBottom>Bills of Cust Id</Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>Bill Id</TableCell>
                        <TableCell>Bill Date</TableCell>
                        <TableCell>Total Items</TableCell>
                        <TableCell>Total Cost</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {this.state.billList.map((bill) =>(
                           <TableRow key={bill.billId}>
                            <TableCell>{bill.order.customer.firstName}</TableCell>
                            <TableCell>{bill.billId}</TableCell>
                            <TableCell>{bill.billDate}</TableCell>
                            <TableCell>{bill.totalItem}</TableCell>
                            <TableCell>{bill.totalCost}</TableCell>
                          </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
           </div>
      
              );
            
          }


    }
