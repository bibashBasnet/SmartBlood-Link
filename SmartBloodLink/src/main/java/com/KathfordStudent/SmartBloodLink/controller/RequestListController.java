package com.KathfordStudent.SmartBloodLink.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.KathfordStudent.SmartBloodLink.dto.RequestStatusUpdateDTO;
import com.KathfordStudent.SmartBloodLink.model.RequestListModel;
import com.KathfordStudent.SmartBloodLink.repository.RequestListRepository;

@RestController
@RequestMapping("/requestList")
public class RequestListController {
    @Autowired RequestListRepository requestListRepository;

    @GetMapping("/get")
    public ResponseEntity<?> getRequest(){
        List<RequestListModel> list = requestListRepository.findAll();
        return ResponseEntity.ok(list);
    }

    @PatchMapping("/updateRequestStatus/{id}")
public ResponseEntity<?> updateRequestStatus(@PathVariable String id, @RequestBody RequestStatusUpdateDTO dto) {
    Optional<RequestListModel> optionalRequest = requestListRepository.findById(id);

    if (!optionalRequest.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found");
    }

    RequestListModel request = optionalRequest.get();

    if (dto.getStatus() != null) {
        request.setStatus(dto.getStatus());
        requestListRepository.save(request);
        return ResponseEntity.ok(request);
    } else {
        return ResponseEntity.badRequest().body("Status field is required");
    }
}
}
