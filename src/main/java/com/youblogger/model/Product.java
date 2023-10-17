package com.youblogger.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Product {

    @Id
    private Long id;

    @Column(length = 1000)
    private String address;  // 주소

    @Column(length = 1000)
    private String product_name;  // 물품 이름

    @Column(length = 500)
    private String category;

    @Column(length = 1500)
    private String reason;   // 판매 이유

    @Column(length = 300)
    private String product_image;

    @Column(length = 20)
    private String product_state;

    @Column(length = 20)
    private String product_status;

    @Column(length = 20)
    private int price;    // 가격

    @Column(length = 100)
    private String today_date;

    public Product() {

    }

    public Product(Long id, String address, String product_name, String category, String reason, String product_image,
                   String product_state, String product_status, int price, String today_date) {
        this.id = id;
        this.address = address;
        this.product_name = product_name;
        this.category = category;
        this.reason = reason;
        this.product_image = product_image;
        this.product_state = product_state;
        this.product_status = product_status;
        this.price = price;
        this.today_date = today_date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // 게터와 세터 메서드
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getProduct() {
        return product_name;
    }

    public void setProduct(String product_name) {
        this.product_name = product_name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getProduct_image() {
        return product_image;
    }

    public void setProduct_image(String product_image) {
        this.product_image = product_image;
    }

    public String getProduct_state() {
        return product_state;
    }

    public void setProduct_state(String product_state) {
        this.product_state = product_state;
    }

    public String getProduct_status() {
        return product_status;
    }

    public void setProduct_status(String product_status) {
        this.product_status = product_status;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getTodayDate() {
        return today_date;
    }

    public void setTodayDate(String today_date) {
        this.today_date = today_date;
    }

    // toString 메서드 (디버깅 등에 유용)
    @Override
    public String toString() {
        return "ItemDTO{" +
                "address='" + address + '\'' +
                ", product_name='" + product_name + '\'' +
                ", reason='" + reason + '\'' +
                ", product_image'" + product_image + '\'' +
                ", price='" + price + '\'' +
                ", today_date=" + today_date +
                '}';
    }
}