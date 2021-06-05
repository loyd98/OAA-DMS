package com.ateneo.server.service;

import com.ateneo.server.domain.Document;
import com.ateneo.server.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.util.List;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    // Create
    public Document saveDocument(Document document) {
        Document savedDocument = documentRepository.save(document);

        if (savedDocument.getConnectionId() == null) {
            Long id = System.currentTimeMillis();
            savedDocument.setConnectionId(id);
        }

        return documentRepository.save(savedDocument);
    }

    // Read
    public List<Document> findAllDocumentsAsc() {
        return documentRepository.findAllByOrderByIdAsc();
    }

    public List<Document> findAllDocumentsDesc() {
        return documentRepository.findAllByOrderByIdDesc();
    }

    public Document findDocumentById(Long id) {
        return documentRepository.findById(id).orElse(null);
    }

    public List<Document> searchDocument(String keyword) {
        return documentRepository.search(keyword);
    }

    // Update
    public Document updateDocument(Document document) {
        Document existingDocument = documentRepository.findById(document.getId()).orElse(null);

        existingDocument.setName(document.getName());
        existingDocument.setFiles(document.getFiles());
        existingDocument.setNotes(document.getNotes());

        return documentRepository.save(existingDocument);
    }

    // Delete
    public String deleteDocument(Long id) {
        documentRepository.deleteById(id);
        return "Successfully deleted document with id: " + id;
    }

    public String deleteAllDocuments() {
        documentRepository.deleteAll();
        return "Successfully deleted all documents.";
    }

    public String truncateDocuments() {
        documentRepository.truncate();
        return "Successfully truncated document table.";
    }
}
