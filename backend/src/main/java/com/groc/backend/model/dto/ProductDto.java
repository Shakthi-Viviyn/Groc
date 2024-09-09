package com.groc.backend.model.dto;

import com.groc.backend.model.entity.Bill;
import com.groc.backend.model.entity.BillProduct;
import com.groc.backend.model.entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductDto {

    private Long id;
    private String brand;
    private String name;
    private BigDecimal price;
    private BigDecimal quantity;
    private String units;
    private String category;

    public static ProductDto loadBillItem(BillProduct billItem){
        var productDto = new ProductDto();
        Product product = billItem.getProduct();
        productDto.setId(product.getId());
        productDto.setBrand(product.getBrand());
        productDto.setName(product.getName());
        productDto.setPrice(billItem.getPrice());
        productDto.setQuantity(billItem.getQuantity());
        productDto.setUnits(product.getUnits());
        productDto.setCategory(product.getCategory());
        return productDto;
    }

    public Product newProductEntity(){
        return new Product(brand, name, units, category);
    }

    public BillProduct newBillItemEntity(Bill bill, Product product){
        return new BillProduct(quantity, price, bill, product);
    }

    @Override
    public String toString() {
        return "ProductDto{" +
                "id=" + id + '\'' +
                "brand='" + brand + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", units='" + units + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
