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
import com.cg.fds.entities.Category;
import com.cg.fds.exceptions.IdNotFoundException;
import com.cg.fds.exceptions.removeFailedException;
import com.cg.fds.service.CategoryService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class CategoryController {
	
	@Autowired
	CategoryService service;
	
	Logger logger=LoggerFactory.getLogger(CategoryController.class);
	
	@PostMapping("/addCategory")
	public ResponseEntity<Category> addCategory(@Valid @RequestBody Category category)
	{ 
		logger.info("Inside add category method");
		Category category1=service.addCategory(category);
		return new ResponseEntity<Category>(category1,HttpStatus.OK);
		
	}
	
	@PutMapping("/updateCategory")
	public ResponseEntity<Category> updateCategory(@Valid @RequestBody Category category) throws IdNotFoundException
	{ 
		logger.info("Inside update category method");
		Category category1=service.viewCategoryById(category.getCatId());
		if(category1==null)
		{
			throw new IdNotFoundException("Invalid category for update !!!");
		}
		else
		{
			Category category2=service.updateCategory(category);
			return new ResponseEntity<Category>(category2,HttpStatus.OK);
		}
		
	}
	
	@DeleteMapping("/removeCategory/{categoryId}")
	public ResponseEntity<String> removeCategory(@PathVariable("categoryId") int catId) throws removeFailedException
	{ 
		logger.info("Inside remove category by Id method");
		Category category1=service.viewCategoryById(catId);
		System.err.println(category1);
		if(category1==null)
		{
			throw new removeFailedException("Delete category failed !!!");
		}
		else
		{
			String msg=service.removeCategory(category1);
			return new ResponseEntity<String>(msg,HttpStatus.OK);
		}
	}
	
	@GetMapping("/viewCategory/{categoryId}")
	public ResponseEntity<Category> viewCategory(@PathVariable("categoryId") int id) throws IdNotFoundException
	{
		logger.info("Inside view category by Id method");
		Category category1=service.viewCategoryById(id);
		if(category1==null)
		{
			throw new IdNotFoundException("Category id not found !!!");
		}
		else
		{
			return new ResponseEntity<Category>(category1,HttpStatus.OK);
		}
		
	}
	
	@GetMapping("/viewAllCategory")
	public ResponseEntity<List<Category>> viewAllCategory()
	{ 
		logger.info("Inside view all category method");
		List<Category> category1=service.viewAllCategory();
		return new ResponseEntity<List<Category>>(category1,HttpStatus.OK);
		
	}
	
}
