// Google Sheet -> Extensions -> Apps Script -> paste this -> Deploy -> New deployment
// Type: Web app | Execute as: Me | Who has access: Anyone  -> copy the URL (ends with /exec) into site-config.js
const SHEET = 'Requests', FOLDER_ID = '', NOTIFY = ''; // NOTIFY = your email for instant alerts (optional)

function doGet() { return ContentService.createTextOutput('Gold Line form endpoint is working'); } // open the /exec URL in browser to test

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET) || ss.insertSheet(SHEET);
  const links = (d.photos || []).map((p, i) => {
    const blob = Utilities.newBlob(Utilities.base64Decode(p.data.split(',')[1]), 'image/jpeg', (d.name || 'photo') + '-' + (i + 1) + '.jpg');
    const f = FOLDER_ID ? DriveApp.getFolderById(FOLDER_ID).createFile(blob) : DriveApp.createFile(blob);
    f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return f.getUrl();
  });
  if (!sh.getLastRow()) sh.appendRow(['Date','Source','Category','Equipment','Segment','Brand','Fee','Standard fee','Emergency fee','Problem','Name','Phone','Email','Address','Availability','Emergency','Photos']);
  sh.appendRow([new Date(), d.source || '', d.category, d.equipment, d.segment, d.brand, d.diagnostic_fee, d.standard_fee, d.emergency_fee, d.problem, d.name, d.phone, d.email, d.address, d.availability, d.emergency ? 'YES' : '', links.join('\n')]);
  if (NOTIFY) MailApp.sendEmail(NOTIFY, 'New request: ' + d.equipment, JSON.stringify(d, null, 2).slice(0, 5000));
  return ContentService.createTextOutput('ok');
}
