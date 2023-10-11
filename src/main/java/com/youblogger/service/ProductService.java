package com.youblogger.service;

import com.youblogger.model.Product;
import com.youblogger.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public void save(Product product) {
        productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void deleteChat(Long id) {
        productRepository.deleteById(id);
    }

    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public void completeOrder(Long id) {
        Product product = productRepository.findById(id).orElse(null);

        if (product != null) {
            product.setProduct_status("판매 완료");
            productRepository.save(product);
        }
    }
}
