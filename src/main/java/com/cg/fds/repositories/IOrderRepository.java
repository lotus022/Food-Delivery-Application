package com.cg.fds.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cg.fds.entities.OrderDetails;

@Repository
public interface IOrderRepository extends JpaRepository<OrderDetails, Integer> {

	
	@Query("select o from OrderDetails o where o.customer.customerId=:id")
	public List<OrderDetails> findAllOrdersByCustomer(@Param("id") int id);

	
//	@Query("select o from OrderDetails o where o.restaurant.restaurantId=(select r.restaurantId from Restaurant r where r.restaurantName=:name)")
//	public List<OrderDetails> findAllByRestaurant(@Param("name") String resName);
	
	@Query("select o from OrderDetails o where o.restaurant.restaurantId=(select r.restaurantId from Restaurant r where r.restaurantId=:restId)")
	public List<OrderDetails> findAllByRestaurant(@Param("restId") int restId);

	
}
