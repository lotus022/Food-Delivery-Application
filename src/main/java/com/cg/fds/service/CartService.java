package com.cg.fds.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.fds.entities.FoodCart;
import com.cg.fds.entities.Item;
import com.cg.fds.repositories.ICartRepository;
import com.cg.fds.repositories.IItemRepository;

@Service
@Transactional
public class CartService implements ICartService{

	@Autowired
	ICartRepository repository;
	
	@Autowired
	IItemRepository repository2;
	
	@Override
	public FoodCart addItemToCart(int cartId, int itemId) {
		
		FoodCart cart=repository.findById(cartId).orElse(null);
		FoodCart cart1=new FoodCart();
		Item item=repository2.findById(itemId).orElse(null);
		int size=cart.getItemList().size();
		if(size==0)
		{
			cart.getItemList().add(item);
		    cart1=repository.save(cart);			
		}
		else
		{
			int new_rid=item.getRestaurant().getRestaurantId();
			int old_rid=cart.getItemList().get(0).getRestaurant().getRestaurantId();
			if(new_rid==old_rid)
			{
				//item.setQuantity(1);
				cart.getItemList().add(item);
			    cart1=repository.save(cart);
			}
			else
			{
				return null;
			}
		}
		return cart1;
	}

	@Override
	public List<Item> increaseQuantity(int cart_id,int item_id) {
		
		FoodCart cart=repository.findById(cart_id).orElse(null);
		addItemToCart(cart_id, item_id);
		System.out.println("In increase check");
		System.err.println(cart);
		return cart.getItemList();
//		List<Item> list = cart.getItemList();
//		List<Item> newList = new ArrayList<Item>();
//		for(int i=0;i<list.size();i++)
//		{
//			Item item=list.get(i);
//			if(newList.get(i).getItemId()!=item.getItemId())
//			{
//				newList.add(item);
//			}
//		}
//	    return newList;
//		int size=list.size();
//		int cnt=0;
//		for(int i=0;i<size;i++)
//		{
//			int id=list.get(i).getItemId();
//			if(item_id==id)
//			{
//				cnt++;
//			}
//		}
//		
//		if(cnt>0)
//		{
//			for(int i=0;i<quantity;i++)
//			{
//				addItemToCart(cart_id, item_id);
//			}
//			return cart;
//		}
//		else
//		{
//			return null;
//		}
//	
	}

	@Override
	public FoodCart reduceQuantity(int cart_id,int item_id) {
		
		FoodCart cart=repository.findById(cart_id).orElse(null);
		List<Item> list=cart.getItemList();	
		Item item=repository2.findById(item_id).orElse(null);
		list.remove(item);
//		for(int i=0;i<quantity;i++)
//		{
//			removeItem(cart, item);
//		}
		return cart;
	}

	@Override
	public String removeItem(FoodCart cart, Item item) {
		List<Item> list=cart.getItemList();
		int id=item.getItemId();
		
		for(int i=0;i<list.size();i++)
		{
			int sid=list.get(i).getItemId();
			if(sid==id)
			{
				reduceQuantity(cart.getCartId(), id);
			}
		}
		
		
		
//		int isPresent=0,index=0;
//		for(int i=0;i<list.size();i++)
//		{
//			if(id==list.get(i).getItemId())
//			{
//				isPresent=1;
//				index=i;
//				break;
//			}
//			
//		}
//		if(isPresent==1)
//		{
//			list.remove(index);
//		}
//		cart.setItemList(list);
//		repository.save(cart);
		return "Item removed successfully...";
	}
	
	@Override
	public String clearCart(int cartId) {
		FoodCart cart=repository.findById(cartId).orElse(null);
		List<Item> item=cart.getItemList();
		item.clear();
		return "Cart cleared....";
	}

	@Override
	public FoodCart getCartById(int cartId) {
		System.out.println(cartId);
		FoodCart cart=repository.findById(cartId).orElse(null);
		System.out.println(cart);
		return cart;
	}

	@Override
	public Item getItemById(int itemId) {
		return repository2.findById(itemId).orElse(null);
	}

	@Override
	public int getCart(int custId) {

		int cartId=repository.findcartByCustomerId(custId);
		return cartId;
	}

	@Override
	public List<Item> viewAllItems(int cartId) {

		FoodCart cart=getCartById(cartId);
		List<Item> list=cart.getItemList();
		return list;
	}

}
