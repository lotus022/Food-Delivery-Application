import { Button } from "@material-ui/core";
import React, { Component } from "react";

export default class CartPage extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            cartid:17,
            resName:'SweetHeart',
            custid:1,
            resid:4
        }
    }
    goToOrder=()=>
    {
        alert(this.state.id);
        this.props.history.push(`/addOrder/${this.state.cartid}`)
    }
    viewOrders=()=>
    {
        alert('Showing orders..')
        this.props.history.push(`/viewOrdersByRes/${this.state.resName}`)
    }
    viewOrdersbyCust=()=>
    {
        alert('Showing orders of Customer..')
        this.props.history.push(`/viewOrdersofCust/${this.state.custid}`)
    }
    viewBillByDate=()=>
    {
        alert('Showing Bills Between Dates..')
        this.props.history.push(`/billDatesData/${this.state.resid}`)
    }
    viewBillByCust=()=>
    {
        alert('Showing Bills of custId..')
        this.props.history.push(`/viewBillsByCust/${this.state.resid}/${this.state.custid}`)
    }
    render()
    {
        return(
            <div>
            <Button onClick={this.goToOrder} variant="contained" color="primary">Place Order</Button><br></br>
            <Button onClick={this.viewOrders} variant="outlined" color="secondary">View Restaurant Orders</Button><br></br>
            <Button onClick={this.viewOrdersbyCust} variant="contained" color="primary">View Orders Of Customer</Button><br></br>
            <Button onClick={this.viewBillByDate} variant="contained" color="primary">View Bills Bettween Dates</Button><br></br>
            <Button onClick={this.viewBillByCust} variant="contained" color="primary">View Bills of customer</Button><br></br>
            </div>
        )
    }
}
