package com.ateneo.server.controller;

import com.ateneo.server.domain.*;
import com.ateneo.server.helper.CSVHelper;
import com.ateneo.server.message.ResponseMessage;
import com.ateneo.server.service.*;
import lombok.extern.apachecommons.CommonsLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("csv")
@CommonsLog
public class CSVController {

    @Autowired
    CSVService csvService;

    @Autowired
    DonorService donorService;

    @Autowired
    DonationService donationService;

    @Autowired
    DonorDonationService donorDonationService;

    @Autowired
    MoaService moaService;

    @Autowired
    ScholarshipService scholarshipService;

    @Autowired
    ScholarService scholarService;

    @Autowired
    DocumentService documentService;

    @PostMapping("/upload/donors")
    public ResponseEntity<ResponseMessage> uploadDonorFile(@RequestParam("file") MultipartFile file) {
        String message = "";

        if (CSVHelper.hasCSVFormat(file)) {
            try {
                csvService.saveDonor(file);

                message = "Uploaded the file successfully: " + file.getOriginalFilename();
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
            } catch (Exception e) {
                e.printStackTrace();
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
            }
        }

        message = "Please upload a csv file!";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
    }

    @PostMapping("/upload/donations")
    public ResponseEntity<ResponseMessage> uploadDonationFile(@RequestParam("file") MultipartFile file) {
        String message = "";

        if (CSVHelper.hasCSVFormat(file)) {
            try {
                csvService.saveDonation(file);

                message = "Uploaded the file successfully: " + file.getOriginalFilename();
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
            } catch (Exception e) {
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
            }
        }

        message = "Please upload a csv file!";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
    }

    @PostMapping("/upload/connections")
    public ResponseEntity<ResponseMessage> uploadDonorDonationFile(@RequestParam("file") MultipartFile file) {
        String message = "";

        if (CSVHelper.hasCSVFormat(file)) {
            try {
                csvService.saveConnection(file);

                message = "Uploaded the file successfully: " + file.getOriginalFilename();
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
            } catch (Exception e) {
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
            }
        }

        message = "Please upload a csv file!";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
    }

    @PostMapping("/upload/moas")
    public ResponseEntity<ResponseMessage> uploadMoaFile(@RequestParam("file") MultipartFile file) {
        String message = "";

        if (CSVHelper.hasCSVFormat(file)) {
            try {
                csvService.saveMoa(file);

                message = "Uploaded the file successfully: " + file.getOriginalFilename();
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
            } catch (Exception e) {
                e.printStackTrace();
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
            }
        }

        message = "Please upload a csv file!";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
    }

    @PostMapping("/upload/scholarships")
    public ResponseEntity<ResponseMessage> uploadScholarshipFile(@RequestParam("file") MultipartFile file) {
        String message = "";

        if (CSVHelper.hasCSVFormat(file)) {
            try {
                csvService.saveScholarship(file);

                message = "Uploaded the file successfully: " + file.getOriginalFilename();
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
            } catch (Exception e) {
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
            }
        }

        message = "Please upload a csv file!";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
    }

    @PostMapping("/upload/scholars")
    public ResponseEntity<ResponseMessage> uploadScholarFile(@RequestParam("file") MultipartFile file) {
        String message = "";

        if (CSVHelper.hasCSVFormat(file)) {
            try {
                csvService.saveScholar(file);

                message = "Uploaded the file successfully: " + file.getOriginalFilename();
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
            } catch (Exception e) {
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
            }
        }

        message = "Please upload a csv file!";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
    }

    @PostMapping("/upload/documents")
    public ResponseEntity<ResponseMessage> uploadDocumentFile(@RequestParam("file") MultipartFile file) {
        String message = "";

        if (CSVHelper.hasCSVFormat(file)) {
            try {
                csvService.saveDocument(file);

                message = "Uploaded the file successfully: " + file.getOriginalFilename();
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
            } catch (Exception e) {
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
            }
        }

        message = "Please upload a csv file!";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
    }

    // Export
    @GetMapping("/export/donors")
    public void exportDonorsToCSV(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=donors_" + currentDateTime + ".csv";
        response.setHeader(headerKey, headerValue);

        List<Donor> donors = donorService.findAllDonorsAsc();

        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
        String[] csvHeader = {"Id", "Account Number", "Account Name", "Salutation", "Donor Name", "Cellphone Number", "Email Address", "Company TIN", "Phone 1", "Phone 2", "Fax Number", "Address 1", "Address 2", "Address 3", "Address 4", "Address 5", "Company Address", "Birth Date", "Notes", "Connection Id"};
        String[] nameMapping = {"id", "accountNumber", "accountName", "salutation", "donorName", "cellphoneNumber", "emailAddress", "companyTIN", "phone1", "phone2", "faxNumber", "address1", "address2", "address3", "address4", "address5", "companyAddress", "birthDate", "notes", "connectionId"};

        csvWriter.writeHeader(csvHeader);

        for (Donor donor : donors) {
            csvWriter.write(donor, nameMapping);
        }

        csvWriter.close();
    }

    @GetMapping("/export/donations")
    public void exportDonationsToCSV(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=donations_" + currentDateTime + ".csv";
        response.setHeader(headerKey, headerValue);

        List<Donation> donations = donationService.findAllDonationsAsc();

        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
        String[] csvHeader = {"Id", "Account Number", "Account Name", "OR Number", "Date", "Amount", "Notes", "Need Certificate", "Purpose of Donation", "OR Files", "TY Files", "COD Files", "Connection Id"};
        String[] nameMapping = {"id", "accountNumber", "accountName", "orNumber", "date", "amount", "notes", "needCertificate", "purposeOfDonation", "orFiles", "tyFiles", "codFiles", "connectionId"};

        csvWriter.writeHeader(csvHeader);

        for (Donation donation : donations) {
            csvWriter.write(donation, nameMapping);
        }

        csvWriter.close();
    }

    @GetMapping("/export/connections")
    public void exportConnectionsToCSV(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=connections_" + currentDateTime + ".csv";
        response.setHeader(headerKey, headerValue);

        List<DonorDonation> connections = donorDonationService.findAllDonorDonationAsc();

        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
        String[] csvHeader = {"Id", "Notes", "Donor Account Number", "Donation Id", "Connection Id"};
        String[] nameMapping = {"id", "notes", "donorAccountNumber", "foreignDonationId", "connectionId"};

        csvWriter.writeHeader(csvHeader);

        for (DonorDonation connection : connections) {
            csvWriter.write(connection, nameMapping);
        }

        csvWriter.close();
    }

    @GetMapping("/export/moas")
    public void exportMoasToCSV(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=moas_" + currentDateTime + ".csv";
        response.setHeader(headerKey, headerValue);

        List<MOA> moas = moaService.findAllMoasAsc();

        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
        String[] csvHeader = {"Id", "Name", "Donor Account Number", "Files", "Notes", "Date Signed", "Connection Id"};
        String[] nameMapping = {"id", "name", "foreignDonorAccountNumber", "files", "notes", "dateSigned", "connectionId"};

        csvWriter.writeHeader(csvHeader);

        for (MOA moa : moas) {
            csvWriter.write(moa, nameMapping);
        }

        csvWriter.close();
    }

    @GetMapping("/export/scholarships")
    public void exportScholarshipsToCSV(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=scholarships_" + currentDateTime + ".csv";
        response.setHeader(headerKey, headerValue);

        List<Scholarship> scholarships = scholarshipService.findAllScholarshipsAsc();

        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
        String[] csvHeader = {"Id", "Scholarship Name", "Type of Scholarship", "Date Established", "Criteria", "Donation Id", "Connection Id"};
        String[] nameMapping = {"id", "scholarshipName", "typeOfScholarship", "dateEstablished", "Criteria", "foreignDonationId", "connectionId"};

        csvWriter.writeHeader(csvHeader);

        for (Scholarship scholarship : scholarships) {
            csvWriter.write(scholarship, nameMapping);
        }

        csvWriter.close();
    }

    @GetMapping("/export/scholars")
    public void exportScholarsToCSV(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=scholars_" + currentDateTime + ".csv";
        response.setHeader(headerKey, headerValue);

        List<Scholar> scholars = scholarService.findAllScholarAsc();

        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
        String[] csvHeader = {"Id", "Scholarship Id", "Name", "Course", "Batch Graduated", "Connection Id"};
        String[] nameMapping = {"id", "foreignScholarshipId", "name", "course", "batchGraduated", "connectionId"};

        csvWriter.writeHeader(csvHeader);

        for (Scholar scholar : scholars) {
            csvWriter.write(scholar, nameMapping);
        }

        csvWriter.close();
    }

    @GetMapping("/export/documents")
    public void exportDocumentsToCSV(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=documents_" + currentDateTime + ".csv";
        response.setHeader(headerKey, headerValue);

        List<Document> documents = documentService.findAllDocumentsAsc();

        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
        String[] csvHeader = {"Id", "Name", "Files", "Notes", "Connection Id"};
        String[] nameMapping = {"id", "name", "files", "notes", "connectionId"};

        csvWriter.writeHeader(csvHeader);

        for (Document document : documents) {
            csvWriter.write(document, nameMapping);
        }

        csvWriter.close();
    }
}
