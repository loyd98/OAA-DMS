package com.ateneo.server.repository;

import com.ateneo.server.domain.Donor;
import com.ateneo.server.domain.DonorDonation;
import com.ateneo.server.domain.MOA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface DonorDonationRepository extends JpaRepository<DonorDonation, Long> {
    List<DonorDonation> findAllByOrderByIdAsc();
    List<DonorDonation> findAllByOrderByIdDesc();
    List<DonorDonation> findAllByDonorAccountNumber(String donorAccountNumber);
    List<DonorDonation> findAllByForeignDonationId(Long donationId);

    @Query(value = "SELECT * FROM donor_donation WHERE id LIKE %?1% OR donor_account_number LIKE %?1% OR foreign_donation_id LIKE %?1%", nativeQuery = true)
    List<DonorDonation> search(String keyword);

    @Query(value =
            "SELECT * FROM donor_donation WHERE foreign_donation_id =\n" +
            "(SELECT foreign_donation_id FROM scholarship\n" +
            "WHERE id = ?1)", nativeQuery = true)
    List<DonorDonation> findDonorDonationOfScholarship(Long scholarshipId);

    @Query(value =
            "SELECT * FROM donor_donation WHERE foreign_donation_id =\n" +
            "(SELECT id FROM donation WHERE id =\n" +
            "(SELECT foreign_donation_id FROM scholarship WHERE id =\n" +
            "(SELECT foreign_scholarship_id FROM scholar\n" +
            "WHERE id = ?1)))", nativeQuery = true)
    List<DonorDonation> findDonorDonationOfScholar(Long scholarId);

    @Modifying
    @Transactional
    @Query(value = "TRUNCATE TABLE donor_donation", nativeQuery = true)
    void truncate();
}
