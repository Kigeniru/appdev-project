package com.mediavillo.repository;

import com.mediavillo.entity.OrderData;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDataRepository extends CrudRepository<OrderData, Integer> {
}


