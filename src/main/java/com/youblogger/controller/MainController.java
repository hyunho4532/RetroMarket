package com.youblogger.controller;

import com.youblogger.ItemService;
import com.youblogger.model.ItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @Autowired
    private ItemService itemService;

    @PostMapping("/api/registerItem")
    public ResponseEntity<String> registerItem(@RequestBody ItemDTO itemDTO) {
        try {
            itemService.registerItem(itemDTO);
            return new ResponseEntity<>("물품 등록이 성공적으로 등록되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("물품 등록 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}