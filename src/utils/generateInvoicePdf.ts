import { address, companyInfo, ProprietorInfo } from "@/lib/constants";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";


interface OrderData {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  address: string;
  order_date: string;
  order_items_count: string;
  grand_total: string;
  order_status: string;
}

export const generateInvoicePdf = (cartItem: CartItem[], data: OrderData) => {
  // Extract values from data object
  const totalPrice = parseFloat(data.grand_total);
  const totalQty = parseInt(data.order_items_count);
  const orderDate = new Date(data.order_date);
  
  const doc = new jsPDF();

  // Colors
 // Colors
  const primaryColor: [number, number, number] = [41, 128, 185]; // Blue
  const secondaryColor: [number, number, number] = [52, 73, 94]; // Dark gray
  const lightGray: [number, number, number] = [240, 240, 240];

  // Header Background
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 25, 'F');

  // Company Information (Left side)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(companyInfo?.companyName, 14, 12);

  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(address?.firstLine, 14, 18);
  doc.text(address?.secondLine, 14, 22);
doc.text(`GST No: ${companyInfo?.gstNumber || "N/A"}`, 14, 26); // add gst 
  // Invoice Title (Right side)
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 210 - 14, 18, { align: "right" });

  // Reset text color
  doc.setTextColor(0, 0, 0);

  // Invoice Details Section
  const currentDate = new Date();
  const invoiceNumber = `INV-${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${ProprietorInfo?.name}`, 14, 35);
  doc.text(`Phone: ${ProprietorInfo?.contact}`, 14, 35);
  // doc.text("Email: store@example.com", 14, 41);

  // Invoice number, date and status (Right aligned)
  doc.text(`Invoice #: ${invoiceNumber}`, 210 - 14, 35, { align: "right" });
  doc.text(`Order Date: ${orderDate.toLocaleDateString()}`, 210 - 14, 41, { align: "right" });
  doc.text(`Status: ${data.order_status}`, 210 - 14, 47, { align: "right" });

  // Bill To Section
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(14, 55, 182, 8, 'F');
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("BILL TO:", 18, 61);

  // Customer Information - using data object
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(data.fullName, 18, 71);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  let yPos = 77;

  if (data.address) {
    doc.text(`Address: ${data.address}`, 18, yPos);
    yPos += 6;
  }

  doc.text(`Phone: ${data.countryCode} ${data.phone}`, 18, yPos);
  yPos += 6;
  doc.text(`Email: ${data.email}`, 18, yPos);

  // Items Table
  const tableStartY = yPos + 15;
  
  const tableColumn = [
    "S.No",
    "Product Name",
    "Unit",
    "Quantity",
    "Unit Price (₹)",
    "Total (₹)",
  ];
  
  const tableRows: (string | number)[][] = [];

  cartItem.forEach((item, index) => {
    tableRows.push([
      index + 1,
      item.productId.name,
      item.productId.unit,
      item.quantity,
      `₹${item.productId.price.toFixed(2)}`,
      `₹${(item.quantity * item.productId.price).toFixed(2)}`,
    ]);
  });

  // Add table using autoTable plugin
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: tableStartY,
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 9,
      halign: 'center'
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 15 }, // S.No
      1: { halign: 'left', cellWidth: 55 },   // Product Name
      2: { halign: 'center', cellWidth: 20 }, // Unit
      3: { halign: 'center', cellWidth: 25 }, // Quantity
      4: { halign: 'right', cellWidth: 35 },  // Unit Price
      5: { halign: 'right', cellWidth: 35 },  // Total
    },
    margin: { left: 14, right: 14 },
  });

  // Summary Section
  const finalY = (doc as any).lastAutoTable?.finalY || tableStartY + 50;
  
  // Summary box
  const summaryStartY = finalY + 10;
  const summaryBoxWidth = 70;
  const summaryBoxX = 210 - 14 - summaryBoxWidth;

  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(summaryBoxX, summaryStartY, summaryBoxWidth, 18, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(summaryBoxX, summaryStartY, summaryBoxWidth, 18);

  // Summary text - using data from the order
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Total Items:", summaryBoxX + 5, summaryStartY + 8);
  doc.text(totalQty.toString(), summaryBoxX + summaryBoxWidth - 5, summaryStartY + 8, { align: "right" });

  // Total (highlighted) - using grand_total from data
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(summaryBoxX, summaryStartY + 15, summaryBoxWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL:", summaryBoxX + 5, summaryStartY + 20);
  doc.text(`₹${totalPrice.toFixed(2)}`, summaryBoxX + summaryBoxWidth - 5, summaryStartY + 20, { align: "right" });

  // Footer
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  
  const footerY = summaryStartY + 35;
  doc.text("Payment Terms:", 14, footerY);
  doc.setFont("helvetica", "italic");
  doc.text("Payment due within 15 days from invoice date.", 14, footerY + 6);
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Thank you for your business!", 105, footerY + 16, { align: "center" });

  // Footer line
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(1);
  doc.line(14, footerY + 22, 196, footerY + 22);

  // Save the PDF with customer name and order date
  const fileName = `Invoice_${data.fullName.replace(/\s+/g, '_')}_${orderDate.toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};