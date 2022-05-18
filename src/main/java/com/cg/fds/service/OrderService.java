package com.cg.fds.service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.fds.controller.OrderController;
import com.cg.fds.entities.FoodCart;
import com.cg.fds.entities.Item;
import com.cg.fds.entities.OrderDetails;
import com.cg.fds.entities.Restaurant;
import com.cg.fds.repositories.ICartRepository;
import com.cg.fds.repositories.IItemRepository;
import com.cg.fds.repositories.IOrderRepository;

@Service
@Transactional
public class OrderService implements IOrderService{
	
	@Autowired
	IOrderRepository repository;
	
	@Autowired
	ICartRepository repo2;
	
	@Autowired
	IItemRepository repo3;	
	
	@Autowired
	CartService service;
	
	Logger logger=LoggerFactory.getLogger(OrderService.class);
	

	@Override
	public OrderDetails addOrder(int cartId) {
		
		logger.info("Inside service add order method");
		OrderDetails order=new OrderDetails();
		FoodCart cart=repo2.findById(cartId).orElse(null);
		List<Item> orderList=new ArrayList<Item>();
		
		List<Item> item1=cart.getItemList();
		int list_size=item1.size();
		for(int i=0;i<list_size;i++)
		{
			Item item=item1.get(i);
			orderList.add(item);
		}
		Restaurant rest=item1.get(0).getRestaurant();
		order.setCustomer(cart.getCustomer());
		order.setRestaurant(rest);
		order.setList(orderList);
		order.setOrderDate(LocalDateTime.now());
		order.setOrderStatus("Pending");
		repository.save(order);
		service.clearCart(cartId);		
		return order;
	}

	@Override
	public OrderDetails updateOrder(OrderDetails order) {
		
		logger.info("Inside service update order method");
		OrderDetails order1=repository.save(order);
		return order1;
	}

	@Override
	public String removeOrderById(OrderDetails order) {
	
        logger.info("Inside service remove order method");
		repository.delete(order);
		return "Order removed successfully...";
	}

	@Override
	public OrderDetails viewOrderById(int id) {
		
		logger.info("Inside service view order by Id method");
		OrderDetails order=repository.findById(id).orElse(null);
		System.out.println("View list in order :"+order.getList());
		order.setList(order.getList());
		return order;
	}
	
	@Override
	public List<OrderDetails> viewAllOrdersByCustomer(int id) {
	
		logger.info("Inside service view all order by customer Id method");
		List<OrderDetails> list = repository.findAllOrdersByCustomer(id);
		System.out.println(list);
		return list;
	}

	/*@Override
	public List<OrderDetails> viewAllOrders(int id) {
	
		List<OrderDetails> list = repository.findAll(id);
		
		return list;
	}*/

	@Override
	public List<OrderDetails> viewAllOrdersByRestaurant(int restId) {
		
		logger.info("Inside service view all order by restaurant name method");
		List<OrderDetails> list = repository.findAllByRestaurant(restId);
		System.out.println(list);
		return list;
	}
	
}

	
	
