package com.ateneo.server.repository;

import com.ateneo.server.domain.MOA;
import com.ateneo.server.domain.Scholar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoaRepository extends JpaRepository<MOA, Long> {
    List<MOA> findAllByOrderByIdAsc();
    List<MOA> findAllByOrderByIdDesc();
    List<MOA> findAllByForeignDonorAccountNumber(String accountNumber);

    @Query(value = "SELECT * FROM moa WHERE id LIKE %?1% OR foreign_donor_account_number LIKE %?1%", nativeQuery = true)
    List<MOA> search(String keyword);

    @Query(value = "SELECT * FROM moa\n" +
            "WHERE foreign_donor_account_number IN\n" +
            "(SELECT donor_account_number FROM \n" +
            "donor_donation WHERE donation_id = ?1)", nativeQuery = true)
    List<MOA> findMoasOfDonation(Long donationId);

    @Query(value =
            "SELECT * FROM moa\n" +
            "WHERE foreign_donor_account_number IN\n" +
            "(SELECT donor_account_number FROM donor_donation\n" +
            "WHERE foreign_donation_id IN\n" +
            "(SELECT foreign_donation_id FROM scholarship\n" +
            "WHERE id IN\n" +
            "(SELECT foreign_scholarship_id FROM scholar\n" +
            "WHERE id = ?1)))", nativeQuery = true)
    List<MOA> findMoasOfScholar(Long scholarId);
}
