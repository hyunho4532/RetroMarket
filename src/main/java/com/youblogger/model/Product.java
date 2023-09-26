package com.youblogger.model;

import javax.persistence.*;

@Entity
@Table(name = "product_table")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(length = 1000)
    private String address;  // 주소

    @Column(length = 1000)
    private String product_name;  // 물품 이름

    @Column(length = 1500)
    private String reason;   // 판매 이유

    @Column(length = 20)
    private int price;    // 가격

    public Product() {

    }

    public Product(String address, String product_name, String reason, int price) {
        this.address = address;
        this.product_name = product_name;
        this.reason = reason;
        this.price = price;
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

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    // toString 메서드 (디버깅 등에 유용)
    @Override
    public String toString() {
        return "ItemDTO{" +
                "address='" + address + '\'' +
                ", product_name='" + product_name + '\'' +
                ", reason='" + reason + '\'' +
                ", price=" + price +
                '}';
    }
}