package com.ateneo.server.repository;

import com.ateneo.server.domain.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findAllByOrderByIdAsc();
    List<Document> findAllByOrderByIdDesc();

    @Query(value = "SELECT * FROM document WHERE id LIKE %?1% OR name LIKE %?1% OR files LIKE %?1% OR notes LIKE %?1%", nativeQuery = true)
    List<Document> search(String keyword);
}
