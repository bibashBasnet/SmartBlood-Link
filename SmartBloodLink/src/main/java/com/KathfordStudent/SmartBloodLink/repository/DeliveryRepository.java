package com.KathfordStudent.SmartBloodLink.repository;

import com.KathfordStudent.SmartBloodLink.model.DeliveryModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryRepository extends MongoRepository<DeliveryModel, String> {
}
