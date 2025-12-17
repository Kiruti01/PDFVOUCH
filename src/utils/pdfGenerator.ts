import jsPDF from "jspdf";
import wifiIcon from "@/assets/wifi-icon.png";

interface VoucherData {
  "Voucher ID": string;
  Duration?: string;
  "Validity Time"?: string;
  "Download Limit(Kbps)"?: string;
  "Upload Limit(Kbps)"?: string;
  [key: string]: string | undefined;
}

export const generateVoucherPDF = (data: VoucherData[], title: string) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const margin = 10;
  const voucherWidth = (pageWidth - margin * 3) / 2; // Two vouchers side by side
  const voucherHeight = 40;
  const spacing = 5;

  const xPositions = [margin, margin + voucherWidth + margin]; // Left and right positions

  let currentY = margin;
  let currentPage = 1;

  data.forEach((voucher) => {
    // Draw two copies side by side
    xPositions.forEach((xPos) => {
      // Check if we need a new page
      if (currentY + voucherHeight > pageHeight - margin) {
        doc.addPage();
        currentY = margin;
        currentPage++;
      }

      // Draw border
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.rect(xPos, currentY, voucherWidth, voucherHeight);

      // Draw WiFi icon
      const iconSize = 4; // 4mm
      doc.addImage(wifiIcon, 'PNG', xPos + 3, currentY + 3, iconSize, iconSize);
      
      // Draw title/header
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(title, xPos + 3 + iconSize + 2, currentY + 7);

      // Draw voucher ID (main focus)
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      const codeText = `Code: ${voucher["Voucher ID"]}`;
      const codeWidth = doc.getTextWidth(codeText);
      doc.text(codeText, xPos + (voucherWidth - codeWidth) / 2, currentY + 15);

      // Draw details
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      let detailY = currentY + 22;

      if (voucher.Duration) {
        doc.text(`Duration: ${voucher.Duration}`, xPos + 3, detailY);
        detailY += 5;
      }

      if (voucher["Validity Time"]) {
        doc.text(`Valid Until: ${voucher["Validity Time"]}`, xPos + 3, detailY);
        detailY += 5;
      }

      if (voucher["Download Limit(Kbps)"]) {
        doc.text(
          `Download: ${voucher["Download Limit(Kbps)"]} Kbps`,
          xPos + 3,
          detailY
        );
        detailY += 4;
      }

      if (voucher["Upload Limit(Kbps)"]) {
        doc.text(
          `Upload: ${voucher["Upload Limit(Kbps)"]} Kbps`,
          xPos + 3,
          detailY
        );
      }
    });

    // Move to next row after drawing both copies
    currentY += voucherHeight + spacing;
  });

  return doc;
};
