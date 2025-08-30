package com.KathfordStudent.SmartBloodLink.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.KathfordStudent.SmartBloodLink.model.OtpTokenModel;

public interface OtpTokenRepository extends MongoRepository<OtpTokenModel, String> {
    Optional<OtpTokenModel> findTopByUserIdAndPurposeAndUsedFalseOrderByExpiresAtDesc(String userId, String purpose);
}
