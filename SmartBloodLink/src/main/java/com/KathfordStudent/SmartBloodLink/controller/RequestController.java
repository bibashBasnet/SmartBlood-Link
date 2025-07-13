package com.KathfordStudent.SmartBloodLink.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody String acceptedBy) {
        Optional<RequestModel> optionalRequest = requestRepository.findById(id);
        if (!optionalRequest.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found");
        }

        RequestModel request = optionalRequest.get();

        request.setAcceptedBy(acceptedBy);

        requestRepository.save(request);
        return ResponseEntity.ok(request);
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
