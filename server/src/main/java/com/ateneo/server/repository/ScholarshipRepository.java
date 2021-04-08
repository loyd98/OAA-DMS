package com.ateneo.server.repository;

import com.ateneo.server.domain.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {
    List<Scholarship> findAllByOrderByIdAsc();
    List<Scholarship> findAllByOrderByIdDesc();

    List<Scholarship> findAllByForeignDonationId(Long foreignDonationId);

    @Query(value = "" +
            "SELECT * FROM scholarship WHERE donation_id IN\n" +
            "(SELECT donation_id FROM donor d \n" +
            "INNER JOIN moa m \n" +
            "ON d.account_number = m.donor_account_number \n" +
            "WHERE d.account_number = ?1)", nativeQuery = true)
    List<Scholarship> findScholarshipsOfDonor(String donorAccountNumber);

    @Query(value =
            "SELECT * from scholarship WHERE\n" +
            "foreign_donation_id = \n" +
            "(SELECT foreign_donation_id FROM moa\n" +
            "WHERE id = ?1)", nativeQuery = true)
    List<Scholarship> findScholarshipsOfMoa(Long moaId);

    @Query(value = "SELECT * FROM scholarship WHERE id LIKE %?1% OR scholarship_name LIKE %?1% OR foreign_donation_id LIKE %?1% OR scholarship.type_of_scholarship LIKE %?1%", nativeQuery = true)
    List<Scholarship> search(String keyword);
}
