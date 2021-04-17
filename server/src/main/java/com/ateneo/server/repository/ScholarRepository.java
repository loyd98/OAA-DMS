package com.ateneo.server.repository;

import com.ateneo.server.domain.Scholar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScholarRepository extends JpaRepository<Scholar, Long> {
    List<Scholar> findAllByOrderByIdAsc();
    List<Scholar> findAllByOrderByIdDesc();
    List<Scholar> findAllByForeignScholarshipId(Long scholarshipId);

    @Query(value =
            "SELECT * FROM scholar WHERE scholarship_id IN\n" +
            "(SELECT id FROM scholarship WHERE donation_id IN\n" +
            "(SELECT donation_id FROM donor d \n" +
            "INNER JOIN donor_donation m \n" +
            "ON d.account_number = m.donor_account_number \n" +
            "WHERE d.account_number = ?1))", nativeQuery = true)
    List<Scholar> findScholarsOfDonor(String donorAccountNumber);

    @Query(value =
            "SELECT * FROM scholar WHERE\n" +
            "foreign_scholarship_id IN\n" +
            "(SELECT id FROM scholarship\n" +
            "WHERE foreign_donation_id = ?1)", nativeQuery = true)
    List<Scholar> findScholarsOfDonation(Long donationId);

    @Query(value =
            "SELECT * FROM scholar\n" +
            "WHERE foreign_scholarship_id IN\n" +
            "(SELECT id FROM scholarship\n" +
            "WHERE foreign_donation_id IN\n" +
            "(SELECT foreign_donation_id FROM\n" +
            "donor_donation d INNER JOIN moa m\n" +
            "ON d.donor_account_number = \n" +
            "m.foreign_donor_account_number\n" +
            "WHERE m.id = ?1))", nativeQuery = true)
    List<Scholar> findScholarsOfMoa(Long moaId);

    @Query(value = "SELECT * FROM scholar WHERE id LIKE %?1% OR foreign_scholarship_id LIKE %?1% OR scholar.name LIKE %?1% OR course LIKE %?1% OR batch_graduated LIKE %?1%", nativeQuery = true)
    List<Scholar> search(String keyword);
}
