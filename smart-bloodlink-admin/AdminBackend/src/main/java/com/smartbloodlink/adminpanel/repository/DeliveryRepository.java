package com.smartbloodlink.adminpanel.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.smartbloodlink.adminpanel.model.DeliveryModel;

@Repository
public interface DeliveryRepository extends MongoRepository<DeliveryModel, String> {
}
