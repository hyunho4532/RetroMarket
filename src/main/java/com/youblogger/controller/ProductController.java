package com.youblogger.controller;

import com.youblogger.model.Product;
import com.youblogger.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/data")
    public List<Product> getData() {
        return productService.getAllProducts();
    }

    @PutMapping("/data/product/{productId}")
    public ResponseEntity<Product> completeOrder(@PathVariable Long productId) {
        Product product = productService.findById(productId);

        if (product != null) {
            product.setProduct_status("판매 완료"); // Assuming the status field name is "productStatus"
            productService.save(product); // Save the updated product
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/api/products")
    @CrossOrigin(origins = "http://localhost:8080")
    public List<Product> getProductsByCategory(@RequestParam("category") String category) {
        return productService.getProductsByCategory(category);
    }
}
