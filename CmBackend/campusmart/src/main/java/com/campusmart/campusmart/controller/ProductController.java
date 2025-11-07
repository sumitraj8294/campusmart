package com.campusmart.campusmart.controller;

import com.campusmart.campusmart.model.Product;
import com.campusmart.campusmart.model.User;
import com.campusmart.campusmart.repository.ProductRepository;
import com.campusmart.campusmart.repository.UserRepository;
import com.campusmart.campusmart.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ Add a product
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody Product product) {

        try {
            // Check auth header
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body(Map.of("error", "Missing or invalid Authorization header"));
            }

            // Extract email from token
            String token = authHeader.substring(7);
            String email = jwtUtil.getEmailFromToken(token);

            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }

            // Set product owner
            product.setUser(userOpt.get());
            Product saved = productRepository.save(product);

            return ResponseEntity.ok(saved);

        } catch (io.jsonwebtoken.JwtException jwtEx) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid or expired token"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // ✅ Fetch user’s own products
    @GetMapping("/my")
    public ResponseEntity<?> getMyProducts(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
            }

            String token = authHeader.substring(7);
            String email = jwtUtil.getEmailFromToken(token);

            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }

            List<Product> myProducts = productRepository.findByUser(userOpt.get());
            return ResponseEntity.ok(myProducts);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // ✅ Delete a product
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id) {
        try {
            String token = authHeader.substring(7);
            String email = jwtUtil.getEmailFromToken(token);
            Optional<User> userOpt = userRepository.findByEmail(email);

            if (userOpt.isEmpty()) return ResponseEntity.status(404).body("User not found");

            Optional<Product> productOpt = productRepository.findById(id);
            if (productOpt.isEmpty()) return ResponseEntity.status(404).body("Product not found");

            Product product = productOpt.get();
            if (!product.getUser().getId().equals(userOpt.get().getId())) {
                return ResponseEntity.status(403).body("Unauthorized to delete this product");
            }

            productRepository.delete(product);
            return ResponseEntity.ok("Product deleted successfully");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // ✅ Fetch all products (show seller info)
    @GetMapping("/all")
public ResponseEntity<?> getAllProducts() {
    try {
        List<Product> allProducts = productRepository.findAll();

        // ✅ FIX: Use HashMap instead of Map.of() for type safety
        List<Map<String, Object>> productsWithSeller = new ArrayList<>();

        for (Product p : allProducts) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", p.getId());
            map.put("title", p.getTitle());
            map.put("description", p.getDescription());
            map.put("category", p.getCategory());
            map.put("price", p.getPrice());
            map.put("imageUrl", p.getImageUrl());
            map.put("sellerName", p.getUser() != null ? p.getUser().getName() : "Unknown Seller");
            map.put("sellerEmail", p.getUser() != null ? p.getUser().getEmail() : "Not Available");
            productsWithSeller.add(map);
        }

        return ResponseEntity.ok(productsWithSeller);
    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
    }
}


    // ✅ Simple ping endpoint (testing)
    @GetMapping("/ping")
    public String ping() {
        return "Product API running ✅";
    }
}
