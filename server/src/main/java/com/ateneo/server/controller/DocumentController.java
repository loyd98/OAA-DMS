package com.ateneo.server.controller;

import com.ateneo.server.domain.Document;
import com.ateneo.server.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/document")
public class DocumentController {
    @Autowired
    private DocumentService documentService;

    // Create
    @PostMapping("/add")
    public Document addDocument(@RequestBody Document document) {
        return documentService.saveDocument(document);
    }

    // Read
    @GetMapping("/asc")
    public List<Document> getAllDocumentsAsc() {
        return documentService.findAllDocumentsAsc();
    }

    @GetMapping("/desc")
    public List<Document> getAllDocumentsDesc() {
        return documentService.findAllDocumentsDesc();
    }

    @GetMapping("{id}")
    public Document getDocumentById(@PathVariable Long id) {
        return documentService.findDocumentById(id);
    }

    @GetMapping("/search")
    public List<Document> search(@RequestParam("q") String keyword) {
        return documentService.searchDocument(keyword);
    }

    // Update
    @PatchMapping("/update")
    public Document updateDocument(@RequestBody Document document) {
        return documentService.updateDocument(document);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteDocumentById(@PathVariable Long id) {
        return documentService.deleteDocument(id);
    }

    @DeleteMapping
    public String deleteAllDocuments() {
        return documentService.deleteAllDocuments();
    }
}
