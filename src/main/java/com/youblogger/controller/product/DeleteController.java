package com.youblogger.controller.product;

import com.youblogger.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DeleteController {

    @Autowired
    private ProductService productService;

    @DeleteMapping("/deleteChat/{chatId}")
    public ResponseEntity<String> deleteChat(@PathVariable Long chatId) {
        productService.deleteChat(chatId);
        return ResponseEntity.ok("Product deleted successful!");
    }
}
