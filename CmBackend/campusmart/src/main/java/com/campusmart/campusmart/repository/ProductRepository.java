package com.campusmart.campusmart.repository;

import com.campusmart.campusmart.model.Product;
import com.campusmart.campusmart.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByUser(User user);
}
