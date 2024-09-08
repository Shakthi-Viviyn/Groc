package com.groc.backend.model.dto;

import com.groc.backend.model.entity.Bill;
import com.groc.backend.model.entity.BillProduct;
import com.groc.backend.model.entity.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDto {
    private String brand;
    private String name;
    private double price;
    private double quantity;
    private String units;
    private String category;

    public static ProductDto loadBillItem(BillProduct billItem) {
        var productDto = new ProductDto();
        Product product = billItem.getProduct();
        productDto.setBrand(product.getBrand());
        productDto.setName(product.getName());
        productDto.setPrice(billItem.getPrice());
        productDto.setQuantity(billItem.getQuantity());
        productDto.setUnits(billItem.getUnits());
        productDto.setCategory(product.getCategory());
        return productDto;
    }

    public Product newProductEntity(){
        return new Product(brand, name, "Dairy");
    }

    public BillProduct newBillItemEntity(Bill bill, Product product){
        return new BillProduct(quantity, units, price, bill, product);
    }

    @Override
    public String toString() {
        return "ProductDto{" +
                "brand='" + brand + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", units='" + units + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
