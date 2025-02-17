package com.groc.backend.model.projection;

import java.math.BigDecimal;

public interface MonthMetricsProjection {
    Long getNumBills();
    BigDecimal getTotalAmount();
}
