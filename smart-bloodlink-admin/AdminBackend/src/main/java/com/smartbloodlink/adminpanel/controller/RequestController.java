package com.smartbloodlink.adminpanel.controller;

import com.smartbloodlink.adminpanel.dto.RequestDTO;
import com.smartbloodlink.adminpanel.model.RequestModel;
import com.smartbloodlink.adminpanel.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class RequestController {

    @Autowired
    private RequestRepository requestRepository;

    @GetMapping
    public List<RequestDTO> getAllRequests() {
        List<RequestModel> requests = requestRepository.findAll();
        List<RequestDTO> result = new ArrayList<>();

        for (RequestModel r : requests) {
            result.add(new RequestDTO(
                    r.getId(),
                    r.getName(),
                    r.getType(),
                    r.getHospital(),
                    r.getStatus(),
                    r.getTime(),
                    r.getPhone(),
                    r.getEmail(),
                    r.getAmount(),
                    r.getLocation(),
                    r.isFresh(),
                    r.isDelivery(),
                    r.getLatitude(),
                    r.getLongitude()
            ));
        }
        return result;
    }

    @PutMapping("/{id}/approve")
    public RequestModel approveRequest(@PathVariable String id) {
        RequestModel request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus("approved");
        return requestRepository.save(request);
    }

    @PutMapping("/{id}/reject")
    public RequestModel rejectRequest(@PathVariable String id) {
        RequestModel request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus("rejected");
        return requestRepository.save(request);
    }
}
