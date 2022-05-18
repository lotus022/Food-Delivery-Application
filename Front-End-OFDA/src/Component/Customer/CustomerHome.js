import {
  Button,
  ClickAwayListener,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Box,
  Container,
  IconButton,
  Paper,
  withWidth,
} from "@material-ui/core";
import ExitToAppSharpIcon from "@material-ui/icons/ExitToAppSharp";

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      itemName: "",
      restaurant: [],
      open: false,
      loc: "",
      rName: "",
      cartId: "",
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:9090/getCart/${this.state.id}`)
      .then((response) => {
        const cart = response.data;
        this.setState({ cartId: cart });
      });
  }

  profile = () => {
    alert("In method...");
    this.props.history.push(`/CustomerProfile/${this.state.id}`);
  };

  location = () => {
    alert("In location method...");
  };

  itemName = () => {
  
    this.state.itemName = this.itemRef.value;
    alert(this.state.itemName);
    axios
      .get(
        `http://localhost:9090/viewRestaurantByItemName/${this.state.itemName}`
      )
      .then((response) => {
         const restList = response.data;
        this.setState({ restaurant: restList });
      }).catch(error=>{alert("No item available")});
  };

  navigate = (restName) => {
    
    alert(this.state.cartId);
    this.props.history.push(`/RestaurantPage/${restName}/${this.state.cartId}`);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ loc: this.areaRef.value });
    this.searchLoction();
  };

  searchLoction = () => {
    axios
      .get(`http://localhost:9090/viewNearByRestaurant/${this.areaRef.value}`)
      .then((response) => {
        alert("Search by location done...");
        const restList = response.data;
        this.setState({ restaurant: restList });
      });
  };

  searchRestaurant = () => {
    alert(this.restRef.value);
    axios
      .get(`http://localhost:9090/viewRestaurantByName/${this.restRef.value}`)
      .then((response) => {
        alert("Search by Restaurant name done...");
        const restList = response.data;
        this.setState({ restaurant: restList });
      });
  };

  viewCart = () => {
    this.props.history.push(`/viewCartById/${this.state.cartId}`);
  };

  logout =() => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <Container maxWidth="lg" style={{backgroundColor:"brown"}}>
          <Paper elevation={6}>
            <Box p={2}>
              <div style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.logout}
                >
                  {" "}
                  <ExitToAppSharpIcon></ExitToAppSharpIcon>LOGOUT
                </Button>
              </div>
            </Box>
            <Typography variant="h4"><i><b>Welcome</b></i></Typography>
            <Grid container spacing={2}>
              <Grid item md={6} style={{ padding: "2rem " }}>
                <Paper elevation={4}>
                  <br />
                  <TextField
                    name="age"
                    label="Item name"
                    variant="outlined"
                    inputRef={(value) => (this.itemRef = value)}
                  ></TextField>{" "}
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.itemName()}
                  >
                    Search
                  </Button>
                  <br />
                  <br />
                </Paper>
              </Grid>

              <Grid item md={6} style={{ padding: "2rem " }}>
                <Paper elevation={4}>
                  <br />
                  <TextField
                    id="rName"
                    variant="outlined"
                    label="Restaurant"
                    inputRef={(value) => (this.restRef = value)}
                    type="text"
                  />
                  <br />
                  <br />
                  <Button
                    onClick={() => this.searchRestaurant()}
                    variant="contained"
                    color="primary"
                  >
                    {" "}
                    Search{" "}
                  </Button>
                  <br />
                  <br />
                </Paper>
              </Grid>
            </Grid>
            <br />
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.viewCart}
                style={{ marginRight: "2rem" }}
              >
                {" "}
                View Cart{" "}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClickOpen}
              >
                {" "}
                Search By Location{" "}
              </Button>

              <Button variant="contained" color="primary"  style={{marginLeft:"2rem"}} onClick={this.profile}>
          {" "}
          Profile{" "}
        </Button>
              <br /> <br />
            </div>
            <br />
          </Paper>
        </Container>

       
        
                <br />

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Enter Location</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {" "}
              Dialog created successfully...{" "}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="area"
              label="Location"
              inputRef={(value) => (this.areaRef = value)}
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {" "}
              Cancel{" "}
            </Button>
            <Button onClick={this.handleClose} color="primary">
              {" "}
              Search{" "}
            </Button>
          </DialogActions>
        </Dialog>
        <br />
        <br />

        <Container maxWidth="md">
          <Paper elevation={6}>
            <div>
              <TableContainer>
                <Table>
                  <TableHead style={{ backgroundColor: "skyBlue" }}>
                    <TableRow>
                      <TableCell>
                        <TableHead>Restaurant Id</TableHead>
                      </TableCell>
                      <TableCell>
                        <TableHead>Restaurant Name</TableHead>
                      </TableCell>
                      <TableCell>
                        <TableHead>Area</TableHead>
                      </TableCell>
                      <TableCell>
                        <TableHead>Navigate</TableHead>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.restaurant.map((rest) => (
                      <TableRow key={rest.restaurantId}>
                        <TableCell>{rest.restaurantId}</TableCell>
                        <TableCell>{rest.restaurantName}</TableCell>
                        <TableCell>{rest.address.area}</TableCell>
                        <TableCell>
                        <Button
                variant="contained"
                color="primary"
                onClick={()=>this.navigate(rest.restaurantName)}
              >
                {" "}
                Go TO RESTAURANT{" "}
              </Button>
   
                          </TableCell>
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

export default CustomerHome;
