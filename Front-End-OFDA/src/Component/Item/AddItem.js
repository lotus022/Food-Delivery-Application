import React, { Component } from "react";
import { Box, Container, FormControl, Grid, Paper, Typography, withStyles, TableCell } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import PropTypes from "prop-types";
import MenuItem from '@material-ui/core/MenuItem';


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



class AddItem extends Component {

  constructor(props) {
    super(props);
        this.state = {  
           restId : this.props.match.params.id,
            categoryList: [ ],
            itemNameError:'',
            quantityError:'',
            costError:''

        }
     
    }

    componentDidMount(){
        axios.get('http://localhost:9090/viewAllCategory').then(
        (response) => {
            this.setState({categoryList:response.data})
        });
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
        else if(this.quantityRef.value.match(/(?=.\d)/)) {
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
  
    addItem = () => {

        const isValid=this.validate();
        let Item = {
            itemName : '',
            quantity : '',
            cost : '',
            category : {
                catId : ''
            },
            restaurant : {
                restaurantId : ''
            }
        }
        
        if(this.validate()){
        Item.itemName = this.inameRef.value;
        Item.quantity = this.quantityRef.value;
        Item.cost = this.costRef.value;
        Item.category.catId = this.catRef.value;
        Item.restaurant.restaurantId = this.state.restId;
    
        alert(Item.itemName);
        axios.post('http://localhost:9090/addItem',Item).then(
            (response) => {
                alert("Item added...")
                // this.props.history.push(`/AddItemToRestaurant/${this.state.restId}`);
            }
        );
    }
}

    
    render() {  
        const {classes} = this.props;
        return (
            
            <div>
               <Container maxWidth="md">
                       <Paper elevation={6}>
                             <Box className={classes.spacing1} style={{paddingTop:"0.5rem"}}>
                                   <Typography variant="h4" className={classes.spacing1} ><b>ADD ITEM</b></Typography><br/>
                             </Box>
                       <Container maxWidth="md">

                           <Grid container className={classes.spacing1} spacing={2}>
                             <Grid item md={6}>
                                <TextField name="iname" label="Item Name" variant="outlined"  inputRef={value => (this.inameRef = value)}/>
                              </Grid>

                            
                             <Grid item md={6}>
                             <TextField name="quantity" label="Quantity" variant="outlined" inputRef={value => (this.quantityRef = value)}/>
        
                            </Grid>
                            </Grid>

                            <Grid container className={classes.spacing1} spacing={2}>
                             <Grid item md={6}>
                             <TextField name="cost" label="Cost" variant="outlined" inputRef={value => (this.costRef = value)}/>
                              </Grid>
                             <Grid item md={6}>
                             <TableCell>Category Name :<TextField  select  inputRef={value => (this.catRef = value )}>
                                    {this.state.categoryList.map((cat) =>
                                    <MenuItem key={cat.catId} value={cat.catId}>{cat.categoryName}</MenuItem>)}
                                  </TextField> </TableCell> 
                              </Grid>
                            </Grid>


                           
                            <Grid container className={classes.spacing1} spacing={2}>
                             <Grid item md={6}>
                             <Button variant="contained" color="primary" onClick={()=>this.addItem()} size="large" >SUBMIT 
                             </Button>
                             </Grid>
                             
                              <Grid item md={6}>
                              
                             <Button variant="contained" color="secondary" onClick={()=>this.props.history.goBack()} size="large" >GO BACK
                             </Button>
                            
                              </Grid>
                             </Grid>


                             



                            

                        </Container>
                       </Paper>
                </Container>   

            </div> 
        );
    }
}
 
AddItem.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(useStyles, { withTheme: true })(AddItem);