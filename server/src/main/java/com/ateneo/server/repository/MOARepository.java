package com.ateneo.server.repository;

import com.ateneo.server.domain.MOA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MOARepository extends JpaRepository<MOA, Long> {
    List<MOA> findAllByOrderByIdAsc();
    List<MOA> findAllByOrderByIdDesc();
    List<MOA> findAllByDonorAccountNumber(String donorAccountNumber);
    List<MOA> findAllByForeignDonationId(Long donationId);

    @Query(value = "SELECT * FROM moa WHERE id LIKE %?1% OR moa.name LIKE %?1% OR donor_account_number LIKE %?1% OR foreign_donation_id LIKE %?1%", nativeQuery = true)
    List<MOA> search(String keyword);

    @Query(value =
            "SELECT * FROM moa WHERE foreign_donation_id =\n" +
            "(SELECT foreign_donation_id FROM scholarship\n" +
            "WHERE id = 1)", nativeQuery = true)
    List<MOA> findMoasOfScholarship(Long scholarshipId);
}
