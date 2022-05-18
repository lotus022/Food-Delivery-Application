import React, { Component } from "react";
import { Box, Container, FormControl, Grid, Paper, Typography, withStyles, TableCell } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import PropTypes from "prop-types";

const useStyles = (theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
  
    paper: {
      marginTop: "1rem",
      marginBotton: "1.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    spacing: {
      marginTop: "1rem",
      textAlign: "center",
    },
    left: {
      textAlign: "left",
    },
    formControl: {
      minWidth: "30ch",
      height: "5ch",
    },
    right: {
      textAlign: "right",
      marginTop: "0.5rem",
      marginRight: "0.5rem",
    },
    spacing1: {
      marginTop: "1.5rem",
      marginBotton: "1.5rem"
    },
    spacing2: {
      marginTop: "1rem",
      
      marginLeft: "-2.5rem"
    },
    spacing3 : {
        marginTop: "0.5rem",
        textAlign:"left",
        paddingLeft:"1rem"
    },
    spacing4 : {
        marginTop: "0.5rem",
        textAlign:"left",
        paddingLeft:"2.5rem"
    },
    span: {
      textAlign: "left",
      marginLeft: "-6rem"
    },
    submit: {
        paddingTop: "2rem",
        paddingBotton: "2rem"
    },
    span1 : {
        textAlign : "right",
        marginTop: "-1.3rem",
        marginRight:"-0.5rem"
    }
  });



class UpdateItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           
            categoryList: [],
           itemId : this.props.match.params.id,
            item : {
                category :{
                    categoryId : '',
                    categoryName : ''
                },
                restaurant :{
                    restaurantId:''
                }
            },
            itemNameError:'',
            quantityError:'',
            costError:''
         }
    }

    validate =()=>{
       
        let itemNameError="";
        let quantityError="";
        let costError="";
        if(this.inameRef.value===""){
            itemNameError="Item Name should not be empty !!!";
        }
        else if(this.inameRef.value.length<3){
            itemNameError="Item Name should be more than 3 characters";
        }
        
        if(this.quantityRef.value===""){
            quantityError="Quantity should not be empty !!!";
        }
        else if(!this.quantityRef.value.match(/(?=.\d)/)) {
            quantityError="Quantity must be numeric !!!"; 
    }
         if(this.costRef.value===""){
            costError="Cost should not be empty !!!";
         }
           else if(!this.costRef.value.match(/(?=.\d)/)) {
            costError="Cost must be numeric !!!"; 
         }
        if(itemNameError || quantityError || costError){
            this.setState({
                itemNameError,quantityError,costError
            })
            return false;
        }
        return true;

    }

    componentDidMount () {

        axios.get(`http://localhost:9090/viewItemByItemId/${this.state.itemId}`).then (
            (response) => {
                alert("Data fetched successfull...");
                const itemData=response.data;
                this.setState({item:itemData});
             
                this.inameRef.value=itemData.itemName;
                this.quantityRef.value=itemData.quantity;
                this.costRef.value=itemData.cost;
               
            });

    }

    update = () => {
        let Item = {
            itemName : '',
            quantity : '',
            cost : '',
            category : {
               categoryName:''
            },
            restaurant :{
                restaurantId:''
            }
            
        }
        
            alert('success');
        
        Item.itemId = this.state.item.itemId;
        Item.itemName = this.inameRef.value;
        Item.quantity= this.quantityRef.value;
        Item.cost= this.costRef.value;
        Item.category.catId = this.state.item.category.catId;
        Item.restaurant.restaurantId=this.state.item.restaurant.restaurantId;
     
        axios.put(`http://localhost:9090/updateItem`,Item).then (
            (response) => {
                alert("Item Updated Successfully...");
            }
        )
        this.props.history.goBack();
}

    render() { 
        const {classes} = this.props;
        return (
            <div>
               <Container maxWidth="md">
                       <Paper elevation={6}>
                             <Box className={classes.spacing1} style={{paddingTop:"0.5rem"}}>
                                   <Typography variant="h4" className={classes.spacing1} ><b>UPDATE ITEM</b></Typography><br/>
                             </Box>
                       <Container maxWidth="md">

                        <Grid container className={classes.spacing2} spacing={2}>
                             <Grid item md={6}>
                                   <TextField name="iname" label="Item Name" variant="outlined" inputRef={value => (this.inameRef = value)}/> 
                              </Grid>

                             <Grid item md={6}>
                             <TextField name="quantity" label="Quantity" variant="outlined" inputRef={value => (this.quantityRef = value)}/>
                              </Grid>
                        </Grid>

                            <Grid container className={classes.spacing2} spacing={2}>
                             <Grid item md={6}>
                             <TextField name="cost" label="Cost" variant="outlined" inputRef={value => (this.costRef = value)}/>
                              </Grid>
                             <Grid item md={6}>
                             <TextField name="cat" label="Category" variant="outlined" value={this.state.item.category.categoryName}></TextField>
                              </Grid>
                            </Grid>

                            <Box className={classes.submit}>
                            <Button variant="contained" color="secondary" onClick={()=>this.update()}> UPDATE </Button>
                             </Box>
                         </Container>
                       </Paper>
                </Container>   

            </div> 
        );
    }
}
 
UpdateItem.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles, { withTheme: true })(UpdateItem);