package com.ateneo.server.repository;

import com.ateneo.server.domain.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {
    Scholarship findScholarshipByConnectionId(Long connectionId);
    List<Scholarship> findAllByOrderByIdAsc();
    List<Scholarship> findAllByOrderByIdDesc();

    List<Scholarship> findAllByForeignDonationId(Long foreignDonationId);

    @Query(value = "" +
            "SELECT * FROM scholarship WHERE donation_id IN\n" +
            "(SELECT donation_id FROM donor d \n" +
            "INNER JOIN donor_donation m \n" +
            "ON d.account_number = m.donor_account_number \n" +
            "WHERE d.account_number = ?1)", nativeQuery = true)
    List<Scholarship> findScholarshipsOfDonor(String donorAccountNumber);

    @Query(value =
            "SELECT * FROM scholarship\n" +
            "WHERE foreign_donation_id IN\n" +
            "(SELECT foreign_donation_id\n" +
            "from donor_donation d \n" +
            "INNER JOIN moa m\n" +
            "ON d.donor_account_number\n" +
            "= m.foreign_donor_account_number\n" +
            "WHERE m.id = ?1)", nativeQuery = true)
    List<Scholarship> findScholarshipsOfMoa(Long moaId);

    @Query(value =
            "SELECT * FROM scholarship WHERE connection_id =\n" +
            "(SELECT foreign_scholarship_id FROM scholar\n" +
            "WHERE id = ?1)", nativeQuery = true)
    List<Scholarship> findScholarshipsOfScholar(Long scholarId);

    @Query(value = "SELECT * FROM scholarship WHERE id LIKE %?1% OR scholarship_name LIKE %?1% OR foreign_donation_id LIKE %?1% OR scholarship.type_of_scholarship LIKE %?1%", nativeQuery = true)
    List<Scholarship> search(String keyword);

    @Modifying
    @Transactional
    @Query(value = "TRUNCATE TABLE scholarship", nativeQuery = true)
    void truncate();
}
