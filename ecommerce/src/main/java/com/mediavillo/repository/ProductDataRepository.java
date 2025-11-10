package com.mediavillo.repository;

import com.mediavillo.entity.ProductData;
import org.springframework.data.repository.CrudRepository;

public interface ProductDataRepository extends CrudRepository<ProductData, Integer> {
}
