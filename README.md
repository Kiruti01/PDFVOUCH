# CSV to PDF Voucher Generator

A web application that converts CSV data into professionally formatted PDF vouchers. Upload your CSV file and instantly generate print-ready vouchers for bulk distribution.

## Features

- **CSV Upload**: Drag-and-drop or browse to upload CSV files
- **Batch Processing**: Generate multiple vouchers from a single CSV file
- **PDF Generation**: Creates high-quality, print-ready PDF documents
- **Preview**: View vouchers before downloading
- **Customizable Templates**: Configure voucher layout and styling
- **Download Options**: Download individual vouchers or combined PDF

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/csv-pdf-voucher-generator.git
cd csv-pdf-voucher-generator
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Basic Workflow

1. **Prepare Your CSV**: Ensure your CSV file follows the required format (see below)
2. **Upload**: Click the upload button or drag your CSV file into the designated area
3. **Preview**: Review the generated vouchers in the preview panel
4. **Download**: Click "Download All" to get a single PDF with all vouchers, or download individually

### CSV Format

Your CSV file must include the following columns:

```csv
voucher_code,recipient_name,amount,expiry_date,description
VOUCH001,John Doe,50.00,2024-12-31,Gift Voucher
VOUCH002,Jane Smith,100.00,2024-12-31,Service Credit
```

#### Required Columns

- **voucher_code** (string): Unique identifier for the voucher
- **recipient_name** (string): Name of the voucher recipient
- **amount** (number): Voucher value (numeric format)
- **expiry_date** (date): Expiration date (YYYY-MM-DD format)

#### Optional Columns

- **description** (string): Additional voucher details
- **terms** (string): Terms and conditions text
- **issuer** (string): Company or issuer name
- **barcode** (string): Barcode data for QR code generation

### Example CSV

Download the [sample CSV template](./examples/sample_vouchers.csv) to get started quickly.

## Configuration

Customize voucher appearance by editing the configuration file:

```javascript
// config/voucher.config.js
module.exports = {
  pageSize: "A4",
  orientation: "portrait",
  margins: { top: 20, right: 20, bottom: 20, left: 20 },
  font: "Helvetica",
  colors: {
    primary: "#2563eb",
    secondary: "#64748b",
    accent: "#f59e0b",
  },
  logo: "./assets/logo.png",
  includeQRCode: true,
};
```

## API Reference

### Endpoints

#### POST `/api/upload`

Upload CSV file for processing

**Request**

- Content-Type: `multipart/form-data`
- Body: CSV file

**Response**

```json
{
  "success": true,
  "vouchers": 25,
  "sessionId": "abc123"
}
```

#### GET `/api/download/:sessionId`

Download generated PDF

**Parameters**

- `sessionId`: Session identifier from upload response

**Response**

- Content-Type: `application/pdf`
- Binary PDF data

## Technologies Used

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express
- **PDF Generation**: PDFKit / jsPDF
- **CSV Parsing**: PapaParse
- **File Upload**: Multer

## Development

### Project Structure

```
├── src/
│   ├── components/      # React components
│   ├── utils/          # Helper functions
│   ├── services/       # API services
│   └── config/         # Configuration files
├── server/
│   ├── routes/         # API routes
│   ├── controllers/    # Route controllers
│   └── middleware/     # Express middleware
├── public/             # Static assets
└── tests/              # Test files
```

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

## Troubleshooting

### Common Issues

**CSV Upload Fails**

- Ensure your CSV uses UTF-8 encoding
- Check that all required columns are present
- Verify file size is under 10MB

**PDF Generation Errors**

- Validate date formats (must be YYYY-MM-DD)
- Ensure amount values are numeric
- Check that special characters are properly escaped

**Preview Not Displaying**

- Clear browser cache
- Disable browser extensions
- Try a different browser

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Email: support@example.com
- Documentation: [Wiki](https://github.com/yourusername/csv-pdf-voucher-generator/wiki)

## Roadmap

- [ ] Email delivery of vouchers
- [ ] Multiple template options
- [ ] Batch printing optimization
- [ ] Integration with payment systems
- [ ] Mobile app version
- [ ] Multi-language support

## Acknowledgments

- PDF generation powered by PDFKit
- CSV parsing by PapaParse
- Icons from Heroicons

---

Made with ❤️ for easy voucher generation
