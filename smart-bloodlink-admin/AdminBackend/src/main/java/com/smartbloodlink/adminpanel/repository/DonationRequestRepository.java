package com.smartbloodlink.adminpanel.repository;

import com.smartbloodlink.adminpanel.model.DonationRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DonationRequestRepository extends MongoRepository<DonationRequest, String> {
    List<DonationRequest> findByStatus(String status);
    long count();
}
