package com.ateneo.server.helper;

import com.ateneo.server.domain.Donation;

import java.awt.*;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.List;

import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.*;

import javax.servlet.http.HttpServletResponse;

public class DonationPdfExporter {
    private List<Donation> donationList;
    private Double totalAll;

    public DonationPdfExporter(List<Donation> donationList, Double totalAll) {
        this.donationList = donationList;
        this.totalAll = totalAll;
    }

    private void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.BLUE);
        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);

        cell.setPhrase(new Phrase("Account Number", font));

        table.addCell(cell);

        cell.setPhrase(new Phrase("Account Name", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("OR Number", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Amount", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Date", font));
        table.addCell(cell);
    }

    private void writeTableData(PdfPTable table) {
        for (Donation donation : donationList) {
            table.addCell(String.valueOf(donation.getAccountNumber()));
            table.addCell(donation.getAccountName());
            table.addCell(donation.getOrNumber());
            DecimalFormat formatter = new DecimalFormat("#0.00");
            table.addCell(formatter.format(donation.getAmount()));
            if (donation.getDate() != null) {
                table.addCell(donation.getDate().toString());
            } else {
                table.addCell("");
            }
        }
    }

    public void export(HttpServletResponse response) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setSize(18);
        font.setColor(Color.BLUE);

        Paragraph p = new Paragraph("Donations", font);
        p.setAlignment(Paragraph.ALIGN_CENTER);

        document.add(p);

        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100f);
        table.setWidths(new float[] {1.5f, 3.5f, 3.0f, 3.0f, 1.5f});
        table.setSpacingBefore(10);

        writeTableHeader(table);
        writeTableData(table);

        document.add(table);

        DecimalFormat formatter = new DecimalFormat("#0.00");
        Paragraph total = new Paragraph("Total: " + formatter.format(this.totalAll));
        total.setAlignment(Paragraph.ALIGN_RIGHT);

        document.add(total);

        document.close();

    }
}
