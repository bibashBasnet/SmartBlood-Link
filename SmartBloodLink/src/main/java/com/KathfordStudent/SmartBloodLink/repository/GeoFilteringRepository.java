package com.KathfordStudent.SmartBloodLink.repository;

import java.util.List;

import org.springframework.data.geo.Distance;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.KathfordStudent.SmartBloodLink.model.BloodBankModel;
import com.mongodb.client.model.geojson.Point;

public interface GeoFilteringRepository extends MongoRepository<BloodBankModel, String>{
    List<BloodBankModel> findByLocationNear(Point location, Distance distance);
    List<BloodBankModel> findAll();
}
