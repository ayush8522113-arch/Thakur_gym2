import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import path from "path";

const generatePaymentSlip = async (payment, user, res) => {
  const doc = new PDFDocument({ size: "A4", margin: 40 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${payment._id}.pdf`
  );

  doc.pipe(res);

  /* ======================
     WATERMARK
  ====================== */
  doc
    .fontSize(70)
    .fillColor("#f0f0f0")
    .opacity(0.25)
    .rotate(-35, { origin: [300, 400] })
    .text("PRO FITNESS GYM", 80, 350, { align: "center" })
    .rotate(35, { origin: [300, 400] })
    .opacity(1);

  /* ======================
     TOP HEADER BAR
  ====================== */
  doc.rect(0, 0, 612, 120).fill("#111827");

  const logoPath = path.join("C:/users/admin/gym-backend/assets/logo.png");
  try {
    doc.image(logoPath, 40, 30, { width: 60 });
  } catch {}

  doc
    .fillColor("#ffffff")
    .fontSize(26)
    .text("THAKUR GYM", 120, 35);

  doc
    .fontSize(12)
    .fillColor("#c7c7c7")
    .text("Official Membership Invoice", 120, 70);

  /* ======================
     PAID BADGE
  ====================== */
  doc
    .roundedRect(460, 40, 110, 36, 8)
    .fill("#16a34a");

  doc
    .fillColor("#ffffff")
    .fontSize(16)
    .text("PAID ✓", 488, 50);

  doc.moveDown(6);

  /* ======================
     INVOICE META
  ====================== */
  const invoiceNo = `GYM-${new Date().getFullYear()}-${payment._id
    .toString()
    .slice(-6)
    .toUpperCase()}`;

  doc
    .fillColor("#111")
    .fontSize(11)
    .text(`Invoice No: ${invoiceNo}`)
    .text(`Date: ${new Date(payment.updatedAt).toLocaleString()}`);

  doc.moveDown(1.5);

  /* ======================
     INFO CARDS
  ====================== */
  const card = (title, lines, x, y) => {
    doc
      .roundedRect(x, y, 250, 110, 10)
      .fill("#f9fafb");

    doc
      .fillColor("#111")
      .fontSize(14)
      .text(title, x + 15, y + 15);

    let offsetY = y + 40;
    lines.forEach((l) => {
      doc
        .fillColor("#333")
        .fontSize(12)
        .text(l, x + 15, offsetY);
      offsetY += 20;
    });
  };

  card(
    "Member Details",
    [`Name: ${user.name}`, `Email: ${user.email}`],
    40,
    doc.y
  );

  card(
    "Membership",
    [
      `Plan: ${payment.membershipType.toUpperCase()}`,
      "Duration: 30 Days"
    ],
    322,
    doc.y
  );

  doc.moveDown(8);

  /* ======================
     PAYMENT SUMMARY
  ====================== */
  doc
    .fontSize(18)
    .fillColor("#111")
    .text("Payment Summary");

  doc.moveDown(0.8);

  const row = (label, value) => {
    doc
      .fontSize(12)
      .fillColor("#555")
      .text(label, 60, doc.y);

    doc
      .fontSize(12)
      .fillColor("#111")
      .text(value, 260, doc.y);

    doc.moveDown(0.6);
  };

  row("Order ID", payment.razorpay?.orderId || "N/A");
  row("Payment ID", payment.razorpay?.paymentId || "N/A");
  row("Status", "PAID");

  doc.moveDown(1);

  /* ======================
     AMOUNT CARD
  ====================== */
  doc
    .roundedRect(40, doc.y, 532, 70, 12)
    .fill("#eef2ff");

  doc
    .fillColor("#1e3a8a")
    .fontSize(18)
    .text("Total Amount Paid", 60, doc.y + 22);

  doc
    .fontSize(28)
    .fillColor("#1e40af")
    .text(`₹${payment.amount}`, 420, doc.y + 15);

  doc.moveDown(4);

  /* ======================
     QR CODE
  ====================== */
  const qrData = `Invoice: ${invoiceNo}
User: ${user.email}
Payment ID: ${payment.razorpay?.paymentId}
Amount: ₹${payment.amount}`;

  const qr = await QRCode.toDataURL(qrData);

  doc
    .fontSize(12)
    .fillColor("#111")
    .text("Scan to verify payment");

  doc.image(qr, { width: 120 });

  doc.moveDown(2);

  /* ======================
     FOOTER
  ====================== */
  doc
    .fontSize(10)
    .fillColor("#6b7280")
    .text(
      "This is a system-generated invoice. No signature required.",
      { align: "center" }
    );

  doc
    .moveDown(0.4)
    .text(
      "Thank you for choosing Thakur Gym 💪",
      { align: "center" }
    );

  doc.end();
};

export default generatePaymentSlip;
