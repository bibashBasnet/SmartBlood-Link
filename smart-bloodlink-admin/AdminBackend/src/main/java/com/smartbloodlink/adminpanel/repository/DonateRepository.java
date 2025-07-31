package com.smartbloodlink.adminpanel.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.smartbloodlink.adminpanel.model.DonateModel;

public interface DonateRepository extends MongoRepository<DonateModel, String>{
    List<DonateModel> findAll();
}
