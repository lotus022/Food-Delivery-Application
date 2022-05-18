package com.cg.fds.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cg.fds.entities.Restaurant;

@Repository
public interface IRestaurantRepository extends JpaRepository<Restaurant, Integer> {

	@Query("select r from Restaurant r inner join Item i on r.restaurantId = i.restaurant.restaurantId where i.itemName = ?1")
	public List<Restaurant> viewRestaurantByItemName(String itemName);

	@Query(value="select * from restaurant r inner join address a on r.add_id = a.address_id where a.area =:area",nativeQuery = true)
	public List<Restaurant> viewNearByRestaurant(@Param("area") String location);

	public Restaurant findRestaurantByEmail(String username);

	
	public List<Restaurant> findRestaurantByRestaurantName(String name);

}
