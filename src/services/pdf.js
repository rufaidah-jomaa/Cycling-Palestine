import fs from "fs";
import PDFDocument from "pdfkit";
import path from "path"; // Import the path module
import { fileURLToPath } from "url"; // Import fileURLToPath from url module

// Define __filename and __dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontPath = path.join(__dirname, "fonts", "Cairo-VariableFont_slnt,wght.ttf");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}


function generateHeader(doc) {
  doc
    .image("cycling-logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("ACME Inc.", 110, 57)
    .fontSize(10)
    .text("ACME Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal * 100),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(invoice.shipping.phone, 300, customerInformationTop + 30)
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Final price",
    "Unit price",
    "Quantity",
    "Name"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font(fontPath);

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      formatCurrency(item.finalPrice * 100),
      formatCurrency(item.unitPrice * 100),
      item.quantity,
      item.productName
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    console.log( formatCurrency(invoice.subtotal*100)),
    formatCurrency(invoice.subtotal*100)
  );

  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .font(fontPath)
    .text(
      "يجب ان يتم الدفع عند الاستلام. نشكرك لمعاملتك معنا.",
      50,
      780,
      { align: "center", width: 500 },
      {direction:"rtl"}
    );
}

function generateTableRow(
  doc,
  y,
  lineTotal,
  description,
  unitCost,
  quantity,
  item // تم تغيير ترتيب العناصر
) {
  const reversedWords = item.split(" ").reverse().join(" ");
  doc
    .fontSize(10)
    .text(reversedWords, 50, y, { direction: 'rtl' })
    .text(description, 150, y)
    .text(quantity, 200, y, { width: 90, align: "right" })
    .text(unitCost, 300, y, { width: 90, align: "right" })
    .text(lineTotal, 450, y, { width: 90, align: "right" })
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "NIS " + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

export default createInvoice;
