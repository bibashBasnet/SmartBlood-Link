package com.KathfordStudent.SmartBloodLink.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.KathfordStudent.SmartBloodLink.model.RequestModel;
import com.KathfordStudent.SmartBloodLink.repository.RequestRepository;

@RestController
@RequestMapping("/requests")
public class RequestController {
    @Autowired RequestRepository requestRepository;
    @Autowired private MongoTemplate mongoTemplate;

    @GetMapping
    public List<RequestModel> getAllRequest(){
        return requestRepository.findAll();
    }

    @GetMapping("/getRequest")
    public ResponseEntity<?> getRequest(@RequestParam String id){
        List<RequestModel> list = requestRepository.findAllByCreatedBy(id);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRequest(@RequestBody RequestModel request){
        return ResponseEntity.ok(requestRepository.save(request));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRequest(@PathVariable String id){
        requestRepository.deleteById(id);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<?> patch(@PathVariable String id, @RequestBody Map<String, Object> updates) {
        // Only allow these fields to be updated
        Set<String> allowed = Set.of("status", "acceptedBy");

        Update update = new Update();
        boolean any = false;
        for (Map.Entry<String, Object> e : updates.entrySet()) {
        String k = e.getKey();
        Object v = e.getValue();
        if (allowed.contains(k) && v != null) {
            update.set(k, v);
            any = true;
        }
        }
        if (!any) {
        return ResponseEntity.badRequest().body("No updatable fields provided (allowed: status, acceptedBy).");
        }

        update.currentDate("updatedAt"); // if your model has this field

        // NOTE: MongoTemplate needs _id (not id)
        Query q = new Query(Criteria.where("_id").is(id));
        FindAndModifyOptions opts = FindAndModifyOptions.options().returnNew(true);

        RequestModel updated = mongoTemplate.findAndModify(q, update, opts, RequestModel.class);
        if (updated == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found");
        }
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/getRequestList/{location}")
    public ResponseEntity<?> getRequestList(@PathVariable String location){
        List<RequestModel> list = requestRepository.findAll();
        List<RequestModel> responseList = new ArrayList<>();
        for(RequestModel request : list){
            String []requestLocation = request.getLocation().split("\\s*,\\s*");
            boolean locationMatches = false;
            if (requestLocation.length > 1) {
                locationMatches = requestLocation[1].equalsIgnoreCase(location);
            }
            if(locationMatches && request.getIsFresh() == true){
                responseList.add(request);
            }

        }
        return ResponseEntity.ok(responseList);
    }
}
