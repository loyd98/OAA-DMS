package com.ateneo.server.repository;

import com.ateneo.server.domain.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findAllByOrderByIdAsc();
    List<Donation> findAllByOrderByIdDesc();

    @Query(value = "SELECT * FROM donation d INNER JOIN donor_donation m ON m.foreign_donation_id = d.id WHERE m.donor_account_number = ?1", nativeQuery = true)
    List<Donation> findDonationsOfDonor(String accountNumber);

    @Query(value =
            "SELECT * FROM donation WHERE id IN\n" +
                    "(SELECT donation_id FROM donor_donation\n" +
                    "WHERE donor_account_number IN\n" +
                    "(SELECT foreign_donor_account_number\n" +
                    "FROM moa WHERE id = ?1));", nativeQuery = true)
    List<Donation> findDonationsOfMoa(Long moaId);

    @Query(value =
            "SELECT * FROM donation WHERE id =\n" +
            "(SELECT foreign_donation_id FROM scholarship\n" +
            "WHERE id = ?1)", nativeQuery = true)
    List<Donation> findDonationOfScholarship(Long scholarshipId);

    @Query(value =
            "SELECT * FROM donation WHERE id =\n" +
            "(SELECT foreign_donation_id FROM scholarship WHERE id =\n" +
            "(SELECT foreign_scholarship_id FROM scholar\n" +
            "WHERE id = ?1))", nativeQuery = true)
    List<Donation> findDonationOfScholar(Long scholarId);

    @Query(value = "SELECT * FROM donation WHERE donation.id LIKE %?1% OR account_number LIKE %?1% OR account_name LIKE %?1% OR or_number LIKE %?1% OR amount LIKE %?1% OR donation.date LIKE %?1%" , nativeQuery = true)
    List<Donation> search(String keyword);
}
