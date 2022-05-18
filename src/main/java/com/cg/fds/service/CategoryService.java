package com.cg.fds.service;

import java.util.List;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cg.fds.entities.Category;
import com.cg.fds.repositories.ICategoryRepository;

@Service
@Transactional
public class CategoryService implements ICategoryService {
	
	@Autowired
    ICategoryRepository repository;
	
	Logger logger=LoggerFactory.getLogger(CategoryService.class);
	
	@Override
	public Category addCategory(Category cat) {
		
		logger.info("Inside service add category method");
		repository.save(cat);
		return cat;
	}

	@Override
	public Category updateCategory(Category cat) {
		
		logger.info("Inside service update category method");
		repository.save(cat);
		return cat;
	}

	@Override
	public String removeCategory(Category cat) {
		
		logger.info("Inside service remove category by Id method");
		repository.delete(cat);
		String msg="Category removed successfully...";
		return msg;
	}

	@Override
	public Category viewCategoryById(int id) {
		
		logger.info("Inside service view category by Id method");
		Category c=repository.findById(id).orElse(null);
		return c;
	}

	@Override
	public List<Category> viewAllCategory() {
		
		logger.info("Inside service view all category method");
		List<Category> cat=repository.findAll();
		return cat;
	}

}
