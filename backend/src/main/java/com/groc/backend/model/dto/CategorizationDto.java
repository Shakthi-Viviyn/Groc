package com.groc.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategorizationDto {
    private String name;
    private String category;
    private Float similarity;

    public CategorizationDto(String name){
        this.name = name;
    }
}
