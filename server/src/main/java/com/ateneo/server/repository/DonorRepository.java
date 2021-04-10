package com.ateneo.server.repository;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DonorRepository extends JpaRepository<Donor, Long> {
    Donor findDonorByAccountNumber(String accountNumber);

    List<Donor> findAllByOrderByIdAsc();
    List<Donor> findAllByOrderByIdDesc();

    @Query(value = "SELECT * FROM donor d INNER JOIN moa m ON m.donor_account_number = d.account_number WHERE m.foreign_donation_id = ?1", nativeQuery = true)
    List<Donor> findDonorsOfDonation(Long donationId);

    @Query(value =
            "SELECT * FROM donor WHERE\n" +
            "account_number =\n" +
            "(SELECT donor_account_number FROM moa\n" +
            "WHERE id = ?1)",nativeQuery = true)
    List<Donor> findDonorsOfMoa(Long moaId);

    @Query(value =
            "SELECT * FROM donor WHERE account_number IN\n" +
            "(SELECT donor_account_number FROM moa\n" +
            "WHERE foreign_donation_id =\n" +
            "(SELECT id FROM donation WHERE id =\n" +
            "(SELECT foreign_donation_id FROM scholarship\n" +
            "WHERE id = ?1)))", nativeQuery = true)
    List<Donor> findDonorsOfScholarship(Long scholarshipId);

    @Query(value =
            "SELECT * FROM donor WHERE account_number IN\n" +
            "(SELECT donor_account_number FROM moa WHERE foreign_donation_id =\n" +
            "(SELECT id FROM donation WHERE id =\n" +
            "(SELECT foreign_donation_id FROM scholarship WHERE id =\n" +
            "(SELECT foreign_scholarship_id FROM scholar\n" +
            "WHERE id = ?1))))", nativeQuery = true)
    List<Donor> findDonorsOfScholar(Long scholarId);

    @Query(value = "SELECT * FROM donor WHERE id LIKE %?1% OR donor_name LIKE %?1% OR account_number LIKE %?1% OR account_name LIKE %?1% OR email_address LIKE %?1%", nativeQuery = true)
    List<Donor> search(String keyword);
}
