package com.groc.backend.repository;

import java.util.List;

public interface BillRepositoryNativeFunc {

    List<?> findSpendFromPastYear(Long userId);

}
