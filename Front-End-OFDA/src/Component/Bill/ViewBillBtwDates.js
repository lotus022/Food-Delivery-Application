import React, { Component } from "react";
import { Box, Button, Container, Grid, Paper,   } from "@material-ui/core";
import axios from "axios";
import { TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody,TextField,withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = (theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
  },
  center: {
      paddingTop:theme.spacing(1),
    textAlign: "center",
  },
  spacing:{
      marginTop:theme.spacing(3)
  },
  bottom:{
    marginTop:theme.spacing(4)
},
button:{
    marginTop:'20px',
    marginBottom:'30px',
    textAlign: "center"
}
});

class ViewBillBtwDates extends Component{
    constructor(props) {
        super(props);
        this.state={
            billList: [],
            startDate:'',
            endDate:'',
            resid:this.props.match.params.id
        }
      }

      viewBillByDates= () => {
        this.state.startDate=this.startdateRef.value;
        this.state.endDate=this.enddateRef.value;
        axios.get(`http://localhost:9090/viewBillByOrderDate/${this.state.startDate}/${this.state.endDate}`)
          .then((result) => {
            alert('fetching bill details...');
            const billdata= result.data;
            this.setState({
              billList : billdata
            })
          const temp=this.state.billList.filter(bill=>bill.order.restaurant.restaurantId=this.state.resid);
          this.setState({billList:temp})
        });
        
       }

      back = () => {
        this.props.history.goBack();
      }

      render()
    {
      const { classes } = this.props;
        return(
            <div>
                <Container maxWidth="lg"><br/><br/>
                    <Paper elevation={6}>
                      <div>
                      <Button onClick={this.back} variant="contained" style={{marginLeft:"70rem",marginTop:"1rem"}} color="primary">Back</Button>
                      </div>
                    <div>
                    <Typography variant="h3" ><i>Bills Based Between Dates</i></Typography><br/>
                    <TableRow>
                    <TableCell>From Date :</TableCell>
                    <TableCell><TextField id="date" type="date" inputRef={value=>(this.startdateRef=value)}></TextField></TableCell>
                    </TableRow><br></br>
                    <TableRow>
                         <TableCell>To Date :</TableCell>
                         <TableCell><TextField id="date1" type="date" inputRef={value=>(this.enddateRef=value)}></TextField></TableCell>
                         <TableCell><Button onClick={()=>this.viewBillByDates()} variant="contained" color="primary">Search</Button> </TableCell>
                    </TableRow>
                    <br></br>        
                      <TableContainer>
              <Table>
                <TableHead style={{backgroundColor:"black"}}>
                <TableRow>
                  <TableCell style={{color:"orange"}}>Customer</TableCell>
                  <TableCell style={{color:"orange"}}>Bill Id</TableCell>
                  <TableCell style={{color:"orange"}}>Bill Date</TableCell>
                  <TableCell style={{color:"orange"}}>Total Items</TableCell>
                  <TableCell style={{color:"orange"}}>Total Cost</TableCell>
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
                    </Paper>
              </Container>










          </div>
           

        );
      
    }

  }
  ViewBillBtwDates.propTypes = {
    classes: PropTypes.object.isRequired,
    };
  export default withStyles(useStyles, { withTheme: true })(ViewBillBtwDates);