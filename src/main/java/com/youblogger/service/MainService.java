package com.youblogger.service;

import com.youblogger.model.Product;
import com.youblogger.repository.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainService {

    private final MainRepository mainRepository;

    @Autowired
    public MainService(MainRepository mainRepository) {
        this.mainRepository = mainRepository;
    }

    public void registerItem(Product product) {
        mainRepository.save(product);
    }
}