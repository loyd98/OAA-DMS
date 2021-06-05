package com.ateneo.server.helper;

import com.ateneo.server.domain.*;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class CSVHelper {
    public static String TYPE = "text/csv";

    public static boolean hasCSVFormat(MultipartFile file) {
        if (!TYPE.equals(file.getContentType())) {
            return false;
        }

        return true;
    }

    public static List<Donor> csvToDonors(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

            List<Donor> donors = new ArrayList<>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord csvRecord : csvRecords) {
                Date date;
                Long connectionId;

                if (csvRecord.get("Birth Date").equals("")) {
                    date = null;
                } else {
                    date = Date.valueOf(csvRecord.get("Birth Date"));
                }

                if (csvRecord.get("Connection Id").equals("")) {
                    connectionId = null;
                } else {
                    connectionId = Long.parseLong(csvRecord.get("Connection Id"));
                }

                Donor donor = new Donor(
                        Long.parseLong(csvRecord.get("Id")),
                        csvRecord.get("Account Number"),
                        csvRecord.get("Account Name"),
                        csvRecord.get("Salutation"),
                        csvRecord.get("Donor Name"),
                        csvRecord.get("Cellphone Number"),
                        csvRecord.get("Email Address"),
                        csvRecord.get("Company TIN"),
                        csvRecord.get("Phone 1"),
                        csvRecord.get("Phone 2"),
                        csvRecord.get("Fax Number"),
                        csvRecord.get("Address 1"),
                        csvRecord.get("Address 2"),
                        csvRecord.get("Address 3"),
                        csvRecord.get("Address 4"),
                        csvRecord.get("Address 5"),
                        csvRecord.get("Company Address"),
                        date,
                        csvRecord.get("Notes"),
                        connectionId
                );

                donors.add(donor);
            }

            return donors;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }

    public static List<Donation> csvToDonations(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

            List<Donation> donations = new ArrayList<>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord csvRecord : csvRecords) {
                Date date;
                Long connectionId;
                Double amount;

                if (csvRecord.get("Date").equals("")) {
                    date = null;
                } else {
                    date = Date.valueOf(csvRecord.get("Date"));
                }

                if (csvRecord.get("Connection Id").equals("")) {
                    connectionId = null;
                } else {
                    connectionId = Long.parseLong(csvRecord.get("Connection Id"));
                }

                if (csvRecord.get("Amount").equals("")) {
                    amount = null;
                } else {
                    amount = Double.parseDouble(csvRecord.get("Amount"));
                }

                Donation donation = new Donation(
                        Long.parseLong(csvRecord.get("Id")),
                        csvRecord.get("Account Number"),
                        csvRecord.get("Account Name"),
                        csvRecord.get("OR Number"),
                        date,
                        amount,
                        csvRecord.get("Notes"),
                        csvRecord.get("Need Certificate"),
                        csvRecord.get("Purpose of Donation"),
                        csvRecord.get("OR Files"),
                        csvRecord.get("TY Files"),
                        csvRecord.get("COD Files"),
                        connectionId
                );

                donations.add(donation);
            }

            return donations;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }

    public static List<DonorDonation> csvToConnections(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

            List<DonorDonation> connections = new ArrayList<>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord csvRecord : csvRecords) {
                Long donationId;
                Long connectionId;

                if (csvRecord.get("Donation Id").equals("")) {
                    donationId = null;
                } else {
                    donationId = Long.parseLong(csvRecord.get("Donation Id"));
                }

                if (csvRecord.get("Connection Id").equals("")) {
                    connectionId = null;
                } else {
                    connectionId = Long.parseLong(csvRecord.get("Connection Id"));
                }

                DonorDonation connection = new DonorDonation(
                        Long.parseLong(csvRecord.get("Id")),
                        csvRecord.get("Notes"),
                        csvRecord.get("Donor Account Number"),
                        donationId,
                        connectionId
                        );

                connections.add(connection);
            }

            return connections;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }

    public static List<MOA> csvToMoas(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

            List<MOA> moas = new ArrayList<>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord csvRecord : csvRecords) {

                Date date;
                Long connectionId;

                if (csvRecord.get("Date Signed").equals("")) {
                    date = null;
                } else {
                    date = Date.valueOf(csvRecord.get("Date Signed"));
                }

                if (csvRecord.get("Connection Id").equals("")) {
                    connectionId = null;
                } else {
                    connectionId = Long.parseLong(csvRecord.get("Connection Id"));
                }

                MOA moa = new MOA(
                        Long.parseLong(csvRecord.get("Id")),
                        csvRecord.get("Name"),
                        csvRecord.get("Donor Account Number"),
                        csvRecord.get("Files"),
                        csvRecord.get("Notes"),
                        date,
                        connectionId
                );

                moas.add(moa);
            }

            return moas;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }

    public static List<Scholarship> csvToScholarships(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

            List<Scholarship> scholarships = new ArrayList<>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord csvRecord : csvRecords) {

                Date date;
                Long donationId;
                Long connectionId;

                if (csvRecord.get("Date Established").equals("")) {
                    date = null;
                } else {
                    date = Date.valueOf(csvRecord.get("Date Established"));
                }

                if (csvRecord.get("Donation Id").equals("")) {
                    donationId = null;
                } else {
                    donationId = Long.parseLong(csvRecord.get("Donation Id"));
                }

                if (csvRecord.get("Connection Id").equals("")) {
                    connectionId = null;
                } else {
                    connectionId = Long.parseLong(csvRecord.get("Connection Id"));
                }

                Scholarship scholarship = new Scholarship(
                        Long.parseLong(csvRecord.get("Id")),
                        csvRecord.get("Scholarship Name"),
                        csvRecord.get("Type of Scholarship"),
                        date,
                        csvRecord.get("Criteria"),
                        donationId,
                        connectionId
                );

                scholarships.add(scholarship);
            }

            return scholarships;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }

    public static List<Scholar> csvToScholars(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

            List<Scholar> scholars = new ArrayList<>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord csvRecord : csvRecords) {
                Long connectionId;

                if (csvRecord.get("Connection Id").equals("")) {
                    connectionId = null;
                } else {
                    connectionId =  Long.parseLong(csvRecord.get("Connection Id"));
                }

                Scholar scholar = new Scholar(
                        Long.parseLong(csvRecord.get("Id")),
                        Long.parseLong(csvRecord.get("Scholarship Id")),
                        csvRecord.get("Name"),
                        csvRecord.get("Course"),
                        csvRecord.get("Batch Graduated"),
                        connectionId
                );

                scholars.add(scholar);
            }

            return scholars;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }

    public static List<Document> csvToDocuments(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

            List<Document> documents = new ArrayList<>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord csvRecord : csvRecords) {
                Long connectionId;

                if (csvRecord.get("Connection Id").equals("")) {
                    connectionId = null;
                } else {
                    connectionId =  Long.parseLong(csvRecord.get("Connection Id"));
                }

                Document document = new Document(
                        Long.parseLong(csvRecord.get("Id")),
                        csvRecord.get("Name"),
                        csvRecord.get("Files"),
                        csvRecord.get("Notes"),
                        connectionId
                );

                documents.add(document);
            }

            return documents;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }

}
