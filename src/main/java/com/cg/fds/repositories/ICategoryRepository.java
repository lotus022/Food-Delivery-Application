package com.cg.fds.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.fds.entities.Category;

public interface ICategoryRepository extends JpaRepository<Category, Integer> {

}
