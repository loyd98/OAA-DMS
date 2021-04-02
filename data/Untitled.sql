use oaa_sms;

SELECT * FROM donation AS d INNER JOIN moa AS m ON d.id = m.foreign_donation_id WHERE m.donor_account_number = "123456";