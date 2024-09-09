package com.groc.backend.repository;

import com.groc.backend.model.dto.SpendByMonthDto;

import java.util.List;

public interface BillRepositoryNativeFunc {

    List<SpendByMonthDto> findSpendFromPastYear(Long userId);

}
