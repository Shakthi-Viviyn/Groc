package com.groc.backend.model.projection;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface ProductPriceProjection {
    Long getProductId();
    Long getStoreId();
    LocalDate getDate();
    BigDecimal getPrice();
}
