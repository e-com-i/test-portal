import { address, companyInfo, ProprietorInfo } from "@/lib/constants";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { DisplayPriceInRupees } from "./DisplayPriceInRupees";
import { pricewithDiscount } from "./PriceWithDiscount";

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
  const totalPrice = parseFloat(data.grand_total);
  const totalQty = parseInt(data.order_items_count);
  const orderDate = new Date(data.order_date);

  const doc = new jsPDF();

  // Colors
  const primaryColor: [number, number, number] = [41, 128, 185]; // Blue
  const secondaryColor: [number, number, number] = [52, 73, 94]; // Dark gray
  const lightGray: [number, number, number] = [240, 240, 240];

  // Header Background
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 25, 'F');

  // Company Information
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(companyInfo?.companyName, 14, 12);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(address?.firstLine, 14, 18);
  doc.text(address?.secondLine, 14, 22);
  doc.text(`GST No: ${companyInfo?.gstNumber || "N/A"}`, 14, 26);

  // Invoice Title (Right)
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 210 - 14, 18, { align: "right" });

  doc.setTextColor(0, 0, 0);

  // Invoice details
  const currentDate = new Date();
  const invoiceNumber = `INV-${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${ProprietorInfo?.name}`, 14, 35);
  doc.text(`Phone: ${ProprietorInfo?.contact}`, 14, 41); // spaced properly

  // Invoice number, date, status (right)
  doc.text(`Invoice #: ${invoiceNumber}`, 210 - 14, 35, { align: "right" });
  doc.text(`Order Date: ${orderDate.toLocaleDateString()}`, 210 - 14, 41, { align: "right" });
  doc.text(`Status: ${data.order_status}`, 210 - 14, 47, { align: "right" });

  // Bill To section
  doc.setFillColor(...lightGray);
  doc.rect(14, 55, 182, 8, 'F');

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...secondaryColor);
  doc.text("BILL TO:", 18, 61);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(data.fullName, 18, 71);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  let yPos = 77;

  if(data.address) {
    doc.text(`Address: ${data.address}`, 18, yPos);
    yPos += 6;
  }

  doc.text(`Phone: ${data.countryCode} ${data.phone}`, 18, yPos);
  yPos += 6;
  doc.text(`Email: ${data.email}`, 18, yPos);

  // Items table
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
      `${DisplayPriceInRupees(
                                                pricewithDiscount(
                                                  item.productId.price,
                                                  item.productId.discount
                                                )
                                              )}`,
      `₹${(item.quantity * pricewithDiscount(
                                                  item.productId.price,
                                                  item.productId.discount
                                                )).toFixed(2)}`,
    ]);
  });

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
      0: { halign: 'center', cellWidth: 15 },
      1: { halign: 'left', cellWidth: 55 },
      2: { halign: 'center', cellWidth: 20 },
      3: { halign: 'center', cellWidth: 25 },
      4: { halign: 'right', cellWidth: 35 },
      5: { halign: 'right', cellWidth: 35 },
    },
    margin: { left: 14, right: 14 },
  });

  // Summary box
  const finalY = (doc as any).lastAutoTable?.finalY || tableStartY + 50;
  const summaryStartY = finalY + 10;
  const summaryBoxWidth = 70;
  const summaryBoxX = 210 - 14 - summaryBoxWidth;

  doc.setFillColor(...lightGray);
  doc.rect(summaryBoxX, summaryStartY, summaryBoxWidth, 18, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(summaryBoxX, summaryStartY, summaryBoxWidth, 18);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Total Items:", summaryBoxX + 5, summaryStartY + 8);
  doc.text(totalQty.toString(), summaryBoxX + summaryBoxWidth - 5, summaryStartY + 8, { align: "right" });

  doc.setFillColor(...primaryColor);
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

  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.line(14, footerY + 22, 196, footerY + 22);

  const fileName = `Invoice_${data.fullName.replace(/\s+/g, '_')}_${orderDate.toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
