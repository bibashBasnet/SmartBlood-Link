package com.KathfordStudent.SmartBloodLink.controller;

import com.KathfordStudent.SmartBloodLink.model.DeliveryModel;
import com.KathfordStudent.SmartBloodLink.repository.DeliveryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {

    private final DeliveryRepository deliveryRepository;

    public DeliveryController(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<DeliveryModel> create(@RequestBody DeliveryModel payload) {
        DeliveryModel saved = deliveryRepository.save(payload);
        return ResponseEntity
                .created(URI.create("/delivery/" + saved.getId()))
                .body(saved);
    }

    // GET ALL
    @GetMapping
    public List<DeliveryModel> getAll() {
        return deliveryRepository.findAll();
    }

    // OPTIONAL: GET BY ID (handy for debugging/clients)
    @GetMapping("/{id}")
    public DeliveryModel getById(@PathVariable String id) {
        return deliveryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Delivery not found"));
    }

    // PARTIAL UPDATE (PATCH)
    // Accepts JSON object with any subset of: driver_id, request_id
    @PatchMapping("/{id}")
    public DeliveryModel patch(@PathVariable String id, @RequestBody Map<String, Object> fields) {
        DeliveryModel existing = deliveryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Delivery not found"));

        if (fields.containsKey("driver_id")) {
            Object v = fields.get("driver_id");
            existing.setDriver_id(v == null ? null : v.toString());
        }
        if (fields.containsKey("request_id")) {
            Object v = fields.get("request_id");
            existing.setRequest_id(v == null ? null : v.toString());
        }

        return deliveryRepository.save(existing);
    }

    // OPTIONAL: FULL UPDATE (PUT) if you ever need it
    @PutMapping("/{id}")
    public DeliveryModel update(@PathVariable String id, @RequestBody DeliveryModel payload) {
        DeliveryModel existing = deliveryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Delivery not found"));

        // Overwrite fields
        existing.setDriver_id(payload.getDriver_id());
        existing.setRequest_id(payload.getRequest_id());

        return deliveryRepository.save(existing);
    }
}
