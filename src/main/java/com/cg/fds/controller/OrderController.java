package com.cg.fds.controller;

import java.util.List;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.cg.fds.entities.OrderDetails;
import com.cg.fds.exceptions.IdNotFoundException;
import com.cg.fds.exceptions.removeFailedException;
import com.cg.fds.service.ICartService;
import com.cg.fds.service.IOrderService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class OrderController {
	
	@Autowired
	IOrderService orderservice;
	
	@Autowired
	ICartService cartService;
	
	Logger logger=LoggerFactory.getLogger(OrderController.class);

	@PostMapping("/addOrder/{cartId}")
	public ResponseEntity<OrderDetails> addOrder(@PathVariable("cartId") int cartId)
	{
		logger.info("Inside add order method");
		OrderDetails order2 =orderservice.addOrder(cartId);
	   	return new ResponseEntity<OrderDetails>(order2,HttpStatus.OK);
	}
	
	@PutMapping("/updateOrder")
	public ResponseEntity<OrderDetails> updateOrder(@Valid @RequestBody OrderDetails order) throws IdNotFoundException
	{
		logger.info("Inside update order method");
		OrderDetails order1=orderservice.viewOrderById(order.getOrderId());
		if(order1==null)
		{
			throw new IdNotFoundException("Unable to update order due to invalid input !!!");
		}
		else
		{
			OrderDetails order2 =orderservice.updateOrder(order);
			return new ResponseEntity<OrderDetails>(order2,HttpStatus.OK);
		}
	}
	
	@DeleteMapping("/removeOrderByOrderId/{orderId}")
	public  ResponseEntity<String> removeOrder(@PathVariable("orderId") int oid) throws removeFailedException 
	{
		   logger.info("Inside remove order method");
		   OrderDetails order1=orderservice.viewOrderById(oid);
	       if(order1==null)
		   {
	    	   throw new removeFailedException("Order removal failed !!!");
	       }
	       else
	       {
	    	   String msg=orderservice.removeOrderById(order1);
	    	   return new ResponseEntity<String>(msg, HttpStatus.OK);
	       }
	}
	
	@GetMapping("/viewOrderByOrderId/{orderId}")
	public ResponseEntity<OrderDetails> viewOrder(@PathVariable("orderId") int oid) throws IdNotFoundException 
	{
		logger.info("Inside view order by Id method");
		OrderDetails order2 = orderservice.viewOrderById(oid);
		if(order2==null)
		{
			throw new IdNotFoundException("Order id not found !!!");
		}
		else
		{
			return new ResponseEntity<OrderDetails>(order2, HttpStatus.OK);
		}
	
	}
	
	@GetMapping("/viewAllOrdersByRestaurant/{restaurantId}")
	public ResponseEntity<List<OrderDetails>> viewAllOrdersByRestaurant(@PathVariable("restaurantId") int restId) /*throws IdNotFoundException */
	{
		logger.info("Inside view all order by restaurant name method");
		List<OrderDetails> order2 = orderservice.viewAllOrdersByRestaurant(restId);
		/*if(order2.isEmpty())
		{
			throw new IdNotFoundException("Invalid restaurant name !!!");
		}
		else
		{*/
			return new ResponseEntity<List<OrderDetails>>(order2, HttpStatus.OK);

		//}
	}
	
	@GetMapping("/viewAllOrdersByCustomer/{customerId}")
	public ResponseEntity<List<OrderDetails>> viewAllOrdersByCustomer(@PathVariable("customerId") int id) throws IdNotFoundException 
	{
		logger.info("Inside view all order by customer Id method");
		List<OrderDetails> order2 = orderservice.viewAllOrdersByCustomer(id);
		if(order2.isEmpty())
		{
			throw new IdNotFoundException("Invalid customer !!!");
		}
		else
		{
			return new ResponseEntity<List<OrderDetails>>(order2, HttpStatus.OK);
		}
	}
	
	
}
