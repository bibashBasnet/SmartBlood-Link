package com.KathfordStudent.SmartBloodLink.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public RequestModel createRequest(@RequestBody RequestModel request){
        return requestRepository.save(request);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRequest(@PathVariable String id){
        requestRepository.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public RequestModel updateRequest(@PathVariable String id, @RequestBody RequestModel request){
        request.setId(id);
        return requestRepository.save(request);
    }
}
