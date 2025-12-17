import { useState } from "react";
import Papa from "papaparse";
import { FileUpload } from "@/components/FileUpload";
import { VoucherPreview } from "@/components/VoucherPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Wifi } from "lucide-react";
import { generateVoucherPDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";

interface VoucherData {
  "Voucher ID": string;
  Duration?: string;
  "Validity Time"?: string;
  "Download Limit(Kbps)"?: string;
  "Upload Limit(Kbps)"?: string;
  [key: string]: string | undefined;
}

const Index = () => {
  const [voucherData, setVoucherData] = useState<VoucherData[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [title, setTitle] = useState<string>("WiFi Voucher");

  const handleFileSelect = (file: File) => {
    setFileName(file.name);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          setVoucherData(results.data as VoucherData[]);
          toast.success(`Loaded ${results.data.length} vouchers from ${file.name}`);
        } else {
          toast.error("No data found in CSV file");
        }
      },
      error: (error) => {
        toast.error(`Error parsing CSV: ${error.message}`);
      },
    });
  };

  const handleGeneratePDF = () => {
    if (voucherData.length === 0) {
      toast.error("Please upload a CSV file first");
      return;
    }

    try {
      const pdf = generateVoucherPDF(voucherData, title);
      pdf.save(`vouchers-${new Date().getTime()}.pdf`);
      toast.success("PDF generated successfully!");
    } catch (error) {
      toast.error("Error generating PDF");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Wifi className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Voucher Generator
          </h1>
          <p className="text-lg text-muted-foreground">
            Upload your CSV file and generate print-ready voucher PDFs
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Upload CSV File
                </CardTitle>
                <CardDescription>
                  Your CSV should include: Voucher ID, Duration, Validity Time, Download Limit, Upload Limit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload onFileSelect={handleFileSelect} />
                {fileName && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Loaded: <span className="font-medium text-foreground">{fileName}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Vouchers: <span className="font-medium text-foreground">{voucherData.length}</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Voucher Settings</CardTitle>
                <CardDescription>
                  Customize the appearance of your vouchers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Header Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="WiFi Voucher"
                  />
                  <p className="text-xs text-muted-foreground">
                    This will appear at the top of each voucher
                  </p>
                </div>

                <Button
                  onClick={handleGeneratePDF}
                  disabled={voucherData.length === 0}
                  className="w-full"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generate PDF
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            {voucherData.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <VoucherPreview data={voucherData} title={title} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3 md:grid-cols-2">
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium text-foreground">Duplicate Copies</p>
                  <p className="text-sm text-muted-foreground">Each voucher appears twice side-by-side</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium text-foreground">Print Optimized</p>
                  <p className="text-sm text-muted-foreground">Black & white design for cost-effective printing</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium text-foreground">Multiple Per Page</p>
                  <p className="text-sm text-muted-foreground">Fits 6-8 vouchers per A4 sheet</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium text-foreground">Instant Download</p>
                  <p className="text-sm text-muted-foreground">Generate and download PDF instantly</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
