package com.cg.fds.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.cg.fds.entities.FoodCart;
import com.cg.fds.entities.Item;
import com.cg.fds.exceptions.distinctRestaurantException;
import com.cg.fds.exceptions.removeFailedException;
import com.cg.fds.service.ICartService;
import com.cg.fds.service.IItemService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class CartController {

	@Autowired
	ICartService CService;
	
	@Autowired
	IItemService IService;
	
	@PostMapping("/addItemToCart/{cartId}/{itemId}")
	public ResponseEntity<FoodCart> addItemToCart(@PathVariable int cartId,@PathVariable int itemId) throws distinctRestaurantException{
		
		FoodCart cart1 = CService.addItemToCart(cartId,itemId);
		if(cart1==null)
		{
			throw new distinctRestaurantException("You cannot add items from different restuarant...");
		}
		FoodCart cart2=new FoodCart();
		cart2.setCartId(cart1.getCartId());
		cart2.setCustomer(cart1.getCustomer());
		return new ResponseEntity<FoodCart>(cart2, HttpStatus.OK);
		
	}
	
	@PutMapping("/increaseQuantity/{cartId}/{itemId}")
	public ResponseEntity<List<Item>> increaseQuantity(@PathVariable("cartId") int cart_id,@PathVariable("itemId") int item_id){
		
		List<Item> list=CService.increaseQuantity(cart_id,item_id);
		return new ResponseEntity<List<Item>>(list, HttpStatus.OK);
	}
	
	@PutMapping("/reduceQuantity/{cartId}/{itemId}")
	public ResponseEntity<FoodCart>  reduceQuantity(@PathVariable("cartId") int cart_id,@PathVariable("itemId") int item_id) throws removeFailedException{
		
		FoodCart cart=CService.reduceQuantity(cart_id,item_id);
		
		if(cart==null)
		{
			throw new removeFailedException("Item not present in cart !!!");
		}
		return new ResponseEntity<FoodCart>(cart, HttpStatus.OK);
	}
	
	@DeleteMapping("/removeItem/{cartId}/{itemId}")
	public ResponseEntity<String> removeItem(@PathVariable int cartId, @PathVariable int itemId) throws removeFailedException{
		
		FoodCart cart=CService.getCartById(cartId);
		if(cart==null)										//change this
		{
			throw new removeFailedException("Item Id is not present in cart !!!");
		}
		else
		{
			Item item=IService.viewItemById(itemId);
			String msg=CService.removeItem(cart, item);
			return new ResponseEntity<String>(msg, HttpStatus.OK);
		}	
	}
	
	@DeleteMapping("/clearCart/{cartId}")
	public ResponseEntity<String>  clearCart(@PathVariable int cartId){
		
		String msg=CService.clearCart(cartId);
		return new ResponseEntity<String>(msg, HttpStatus.OK);
	}
	
	@GetMapping("/getCart/{custId}")
	public ResponseEntity<Integer>  getCart(@PathVariable int custId){
		
		int cartId=CService.getCart(custId);
		return new ResponseEntity<Integer>(cartId, HttpStatus.OK);
	}
	
	@GetMapping("/viewAllItems/{cartId}")
	public ResponseEntity<List<Item>>  viewAllItems(@PathVariable int cartId){
		
		List<Item> list=CService.viewAllItems(cartId);
		return new ResponseEntity<List<Item>>(list, HttpStatus.OK);
	}
	
}
