module.exports = {
  ordering: {
    donors: [
      // width refers to column width
      // { key: '#', name: '#', width: '20px' },
      { key: 'id', name: '#', width: '20px' },
      { key: 'connectionId', name: 'Donor ID', width: '60px' },
      { key: 'accountNumber', name: 'Account Number', width: '90px' },
      { key: 'accountName', name: 'Account Name', width: '80px' },
      { key: 'salutation', name: 'Salutation', width: '70px' },
      { key: 'donorName', name: 'Donor Name', width: '70px' },
      { key: 'cellphoneNumber', name: 'Cellphone No.', width: '80px' },
      { key: 'emailAddress', name: 'Email', width: '100px' },
      { key: 'companyTIN', name: 'Company TIN', width: '100px' },
      { key: 'phone1', name: 'Phone 1', width: '100px' },
      { key: 'phone2', name: 'Phone 2', width: '100px' },
      { key: 'faxNumber', name: 'Fax No.', width: '100px' },
      { key: 'address1', name: 'Address 1', width: '100px' },
      { key: 'address2', name: 'Address 2', width: '100px' },
      { key: 'address3', name: 'Address 3', width: '100px' },
      { key: 'address4', name: 'Address 4', width: '100px' },
      { key: 'address5', name: 'Address 5', width: '100px' },
      { key: 'birthDate', name: 'Birth Date', width: '100px' },
      { key: 'companyAddress', name: 'Company Address', width: '100px' },
      // Auditing fields
      { key: 'createdBy', name: 'Created By', width: '100px' },
      { key: 'creationDate', name: 'Creation Date', width: '100px' },
      { key: 'lastModifiedBy', name: 'Last Modified By', width: '100px' },
      { key: 'lastModifiedDate', name: 'Last Modified Date', width: '100px' },
    ],
    donations: [
      // width refers to column width
      // { key: '#', name: '#', width: '20px' },
      { key: 'id', name: '#', width: '20px' },
      { key: 'connectionId', name: 'Donation ID', width: '60px' },
      { key: 'accountNumber', name: 'Donor Account No.', width: '70px' },
      { key: 'accountName', name: 'Account Name', width: '70px' },
      { key: 'orNumber', name: 'OR Number', width: '70px' },
      { key: 'date', name: 'Date', width: '60px' },
      { key: 'amount', name: 'Amount', width: '70px' },
      { key: 'notes', name: 'Notes', width: '70px' },
      { key: 'needCertificate', name: 'Need Certificate', width: '100px' },
      { key: 'purposeOfDonation', name: 'Purpose of Donation', width: '100px' },
      // Auditing fields
      { key: 'createdBy', name: 'Created By', width: '100px' },
      { key: 'creationDate', name: 'Creation Date', width: '100px' },
      { key: 'lastModifiedBy', name: 'Last Modified By', width: '100px' },
      { key: 'lastModifiedDate', name: 'Last Modified Date', width: '100px' },
      //
      { key: 'orFiles', name: 'OR Files', width: '100px' },
      { key: 'tyFiles', name: 'TY Files', width: '100px' },
      { key: 'codFiles', name: 'COD Files', width: '100px' },
    ],
    scholarships: [
      { key: 'id', name: '#', width: '20px' },
      { key: 'connectionId', name: 'Scholarship ID', width: '60px' },
      { key: 'foreignDonationId', name: 'Donation\'s ID', width: '60px' },
      { key: 'scholarshipName', name: 'Scholarship Name', width: '70px' },
      { key: 'typeOfScholarship', name: 'Type of Scholarship', width: '70px' },
      { key: 'dateEstablished', name: 'Date Established', width: '70px' },
      { key: 'criteria', name: 'Criteria', width: '70px' },
      // Auditing fields
      { key: 'createdBy', name: 'Created By', width: '100px' },
      { key: 'creationDate', name: 'Creation Date', width: '100px' },
      { key: 'lastModifiedBy', name: 'Last Modified By', width: '100px' },
      { key: 'lastModifiedDate', name: 'Last Modified Date', width: '100px' },
    ],
    scholars: [
      { key: 'id', name: '#', width: '20px' },
      { key: 'connectionId', name: 'Scholar ID', width: '60px' },
      { key: 'foreignScholarshipId', name: 'Scholarship ID', width: '70px' },
      { key: 'name', name: 'Name', width: '70px' },
      { key: 'course', name: 'Course', width: '70px' },
      { key: 'batchGraduated', name: 'Batch Graduated', width: '70px' },
      // Auditing fields
      { key: 'createdBy', name: 'Created By', width: '100px' },
      { key: 'creationDate', name: 'Creation Date', width: '100px' },
      { key: 'lastModifiedBy', name: 'Last Modified By', width: '100px' },
      { key: 'lastModifiedDate', name: 'Last Modified Date', width: '100px' },
    ],
    moas: [
      { key: 'id', name: '#', width: '20px' },
      { key: 'connectionId', name: 'MOA ID', width: '60px' },
      { key: 'name', name: 'MOA Name', width: '70px' },
      { key: 'foreignDonorAccountNumber', name: 'Donor Account Number', width: '70px' },
      { key: 'files', name: 'Files', width: '70px' },
      { key: 'notes', name: 'Notes', width: '70px' },
      { key: 'dateSigned', name: 'Date Signed', width: '60px' },
      // Auditing fields
      { key: 'createdBy', name: 'Created By', width: '70px' },
      { key: 'creationDate', name: 'Creation Date', width: '70px' },
      { key: 'lastModifiedBy', name: 'Last Modified By', width: '70px' },
      { key: 'lastModifiedDate', name: 'Last Modified Date', width: '70px' },
    ],
    connections: [
      { key: 'id', name: '#', width: '20px' },
      { key: 'connectionId', name: 'Connection ID', width: '65px' },
      { key: 'donorAccountNumber', name: 'Donor Account Number', width: '70px' },
      { key: 'foreignDonationId', name: 'Donation ID', width: '70px' },
      { key: 'notes', name: 'Notes', width: '70px' },
      // Auditing fields
      { key: 'createdBy', name: 'Created By', width: '70px' },
      { key: 'creationDate', name: 'Creation Date', width: '70px' },
      { key: 'lastModifiedBy', name: 'Last Modified By', width: '70px' },
      { key: 'lastModifiedDate', name: 'Last Modified Date', width: '70px' },
    ],
    documents: [
      { key: 'id', name: '#', width: '20px' },
      { key: 'connectionId', name: 'Document ID', width: '60px' },
      { key: 'name', name: 'Name', width: '70px' },
      { key: 'files', name: 'Files', width: '70px' },
      { key: 'notes', name: 'Notes', width: '70px' },
      // Auditing fields
      { key: 'createdBy', name: 'Created By', width: '70px' },
      { key: 'creationDate', name: 'Creation Date', width: '70px' },
      { key: 'lastModifiedBy', name: 'Last Modified By', width: '70px' },
      { key: 'lastModifiedDate', name: 'Last Modified Date', width: '70px' },
    ],
  },
  tables: [
    'Donors',
    'Donations',
    'Connections',
    'MOAs',
    'Scholarships',
    'Scholars',
    'Documents',
  ],
  innerTables: {
    donors: ['donations', 'moas', 'scholarships', 'scholars'],
    donations: ['donors', 'moas', 'scholarships', 'scholars'],
    moas: ['donors', 'donations', 'scholarships', 'scholars'],
    scholarships: ['donors', 'donations', 'moas', 'scholars'],
    scholars: ['donors', 'donations', 'moas', 'scholarships'],
    documents: [],
  },
  defaultTable: 'donors',
  URL: 'http://localhost:8080',
};
