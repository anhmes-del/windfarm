INSERT INTO users (username, full_name, role, password_hash) VALUES
('admin', 'System Admin', 'ADMIN', '$2b$mockhash'),
('pm_ves', 'VES Project Manager', 'PM', '$2b$mockhash'),
('dc_ree', 'REE Document Controller', 'DOC_CONTROLLER', '$2b$mockhash'),
('qaqc_te', 'TE QAQC Engineer', 'QAQC', '$2b$mockhash'),
('reviewer_owner', 'Owner Reviewer', 'REVIEWER', '$2b$mockhash');

INSERT INTO transmittals (transmittal_no, sender, receiver, submitted_date, subject, status) VALUES
('VES-TRM-CIV-0001', 'VES', 'REE', '2026-03-10', 'Foundation IFC package', 'OPEN'),
('REE-TRM-ELE-0007', 'REE', 'TE', '2026-03-15', 'Cable routing IFA set', 'OPEN'),
('TE-TRM-QA-0010', 'TE', 'Owner', '2026-03-25', 'Monthly QA dossier', 'CLOSED');

INSERT INTO documents (
  document_no, revision, title, doc_date, sender, receiver, type_of_document, discipline,
  issue_purpose, transmittal_no, status, due_date, reply_date, overdue_days, file_path, extracted_text, created_by
) VALUES
('VES-WF-CIV-DRG-00045', 'C02', 'WTG Foundation GA Drawing', '2026-03-10', 'VES', 'REE', 'Drawing', 'Civil', 'IFC', 'VES-TRM-CIV-0001', 'REVIEW', '2026-03-20', NULL, 36, 'storage/VES-WF-CIV-DRG-00045.pdf', 'Foundation drawing package', 2),
('REE-WF-ELE-MST-00112', 'B01', '33kV Cable Pulling Method Statement', '2026-03-14', 'REE', 'TE', 'Method Statement', 'Electrical', 'IFA', 'REE-TRM-ELE-0007', 'COMMENTED', '2026-03-21', '2026-03-22', 0, 'storage/REE-WF-ELE-MST-00112.pdf', 'Cable pulling sequence and HSE controls', 3),
('TE-WF-QA-MPR-00003', 'A00', 'Monthly Progress Report - March 2026', '2026-03-31', 'TE', 'Owner', 'Monthly Progress Report', 'Project Control', 'IFI', 'TE-TRM-QA-0010', 'CLOSED', '2026-04-05', '2026-04-03', 0, 'storage/TE-WF-QA-MPR-00003.pdf', 'Progress KPI, procurement status, look-ahead plan', 4),
('VES-WF-PRC-PLN-00008', 'A01', 'Main Equipment Procurement Plan', '2026-04-05', 'VES', 'REE', 'Procurement Plan', 'Procurement', 'IFR', 'VES-TRM-CIV-0001', 'SUBMITTED', '2026-04-12', NULL, 13, 'storage/VES-WF-PRC-PLN-00008.xlsx', 'Turbine, transformer, cable procurement tracking', 2),
('REE-WF-MOM-MGT-00021', 'A00', 'Coordination Meeting MOM Week 14', '2026-04-08', 'REE', 'VES', 'MOM', 'Management', 'IFI', 'REE-TRM-ELE-0007', 'APPROVED', '2026-04-10', '2026-04-09', 0, 'storage/REE-WF-MOM-MGT-00021.docx', 'MOM with action owners and due dates', 3);
