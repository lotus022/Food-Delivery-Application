import React, { Component } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody, TextField } from "@material-ui/core";

export default class BillDatesData extends Component{
    constructor(props) {
        super(props);
        this.state={
            resid:this.props.match.params.id,
            billList : [
            ],
            startDate:'',
            endDate:''
        }
      }

      viewBillByDates= (event) => {
          event.preventDefault();
          this.state.startDate=this.startdateRef.value;
          this.state.endDate=this.enddateRef.value;
          this.props.history.push(`/viewBillBtwDates/${this.state.startDate}/${this.state.endDate}/${this.state.resid}`)
         }

     render()
     {
         return(
             <div>
                 <TextField id="date" label="StartDate" type="date" inputRef={value=>(this.startdateRef=value)}></TextField><br></br>
                 <TextField id="date1" label="EndDate" type="date" inputRef={value=>(this.enddateRef=value)}></TextField><br></br>
                 <Button onClick={this.viewBillByDates} variant="contained" color="primary">View Bills Bettween Dates</Button>
                 {/* <Typography variant="h4" gutterBottom>Bills Based Between Dates</Typography> */}
            {/* <TableContainer>
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
            </TableContainer> */}
              </div>
         );
     }


    }
