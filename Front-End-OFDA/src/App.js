
//import { Route, Router } from 'react-router';
import {BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom'
import './App.css';
import AddCustomer from './Component/Customer/AddCustomer';
import Login from './Component/Login/CustLogin'
import AddRestaurant from './Component/Restaurant/AddRestaurant';
import CustomerHome from './Component/Customer/CustomerHome';
import Profile from './Component/Customer/Profile'; 
import UpdateCustomer from './Component/Customer/UpdateCustomer';
import RestLogin from './Component/Login/RestLogin';
import RestaurantHomePage from './Component/Restaurant/RestaurantHomePage';
import CartPage from './Component/Cart/CartPage';
import RestaurantPage from './Component/Restaurant/RestaurantPage';
import RestaurantProfile from './Component/Restaurant/Profile';
import UpdateProfile from './Component/Restaurant/UpdateProfile';
import ViewAllCustByRest from './Component/Restaurant/ViewAllCustByRest';
import AddItem from './Component/Item/AddItem';
import AddCategory from './Component/Category/AddCategory';
import UpdateItem from './Component/Item/UpdateItem';
import ViewItembyRestName from './Component/Item/ViewItembyRestName';
import AddOrder from './Component/Order/AddOrder'
import AddBill from './Component/Bill/AddBill'
import ViewBillBtwDates from './Component/Bill/ViewBillBtwDates';


function App() {
  return ( 
        <div className="App">
      <Router>
          <Switch>              
              <Route path="/"  exact component={Login}></Route>
              <Route path="/RegisterCustomer" component={AddCustomer}></Route>
              <Route path="/addrestaurant" component={AddRestaurant}></Route>
              <Route path="/CustomerHome/:id"  component={CustomerHome}></Route>
              <Route path="/CustomerProfile/:id" component={Profile}></Route>
              <Route path="/updateCustomer/:id" component={UpdateCustomer}></Route>


              <Route path="/RestaurantLogin" component={RestLogin}></Route>
              <Route path="/RegisterRestaurant" component={AddRestaurant}></Route>
              <Route path="/RestaurantProfile/:id" component={RestaurantProfile}></Route>
              <Route path="/UpdateProfile/:id" component={UpdateProfile}></Route>
              <Route path="/RestaurantPage/:name/:cartId" component={RestaurantPage}></Route>
              <Route path="/RestaurantHome/:id"  component={RestaurantHomePage}></Route>
              <Route path="/ViewAllCustByRest/:name"  component={ViewAllCustByRest}></Route>
              
              
              <Route path="/AddCategory"  component={AddCategory}></Route>

              
              <Route path="/AddItemToRestaurant/:id"  component={AddItem }></Route>
              <Route path="/ViewAllItemsByRestaurant/:name"  component={ViewItembyRestName}></Route>
              <Route path="/UpdateItem/:id"  component={UpdateItem}></Route>


              <Route path="/viewCartById/:id" component={CartPage}></Route>
             

              <Route path="/AddOrder/:id" component={AddOrder}></Route>

              <Route path="/AddBill/:id" component={AddBill}></Route>
              <Route path="/ViewBillBtwDate/:id" component={ViewBillBtwDates}></Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
