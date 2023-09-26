package com.youblogger.model;

public class ItemDTO {
    private String address;  // 주소
    private String product;  // 물품 이름
    private String reason;   // 판매 이유
    private double price;    // 가격

    // 생성자, 게터, 세터 등 필요한 메서드를 추가할 수 있음

    public ItemDTO() {
    }

    public ItemDTO(String address, String product, String reason, double price) {
        this.address = address;
        this.product = product;
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
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
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

    public void setPrice(double price) {
        this.price = price;
    }

    // toString 메서드 (디버깅 등에 유용)
    @Override
    public String toString() {
        return "ItemDTO{" +
                "address='" + address + '\'' +
                ", product='" + product + '\'' +
                ", reason='" + reason + '\'' +
                ", price=" + price +
                '}';
    }
}