package com.ateneo.server.repository;

import com.ateneo.server.domain.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DonorRepository extends JpaRepository<Donor, Long> {
    Donor findByAccountName(String accountName);
    List<Donor> findAllByOrderByIdAsc();
    List<Donor> findAllByOrderByIdDesc();
    List<Donor> findAllByOrderByAccountNameAsc();
    List<Donor> findAllByOrderByAccountNameDesc();

    @Query("SELECT d FROM Donor d WHERE CONCAT(d.id, ' ', d.accountNumber, ' ', d.accountName, ' ', d.emailAddress) LIKE %?1%")
    List<Donor> search(String keyword);
}
