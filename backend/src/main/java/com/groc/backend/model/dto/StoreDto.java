package com.groc.backend.model.dto;

import com.groc.backend.model.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StoreDto {

    private Long id;
    private String name;
    private String location;

    public static StoreDto loadStore(Store store) {
        StoreDto dto = new StoreDto();
        dto.setId(store.getId());
        dto.setName(store.getName());
        dto.setLocation(store.getLocation());
        return dto;
    }

    public Store newStoreEntity() { return new Store(name, location); }

    @Override
    public String toString() {
        return "StoreDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                '}';
    }
}
