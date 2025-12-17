import wifiIcon from "@/assets/wifi-icon.png";
import { Wifi } from "lucide-react";

interface VoucherData {
  "Voucher ID": string;
  Duration?: string;
  "Validity Time"?: string;
  "Download Limit(Kbps)"?: string;
  "Upload Limit(Kbps)"?: string;
  [key: string]: string | undefined;
}

interface VoucherPreviewProps {
  data: VoucherData[];
  title: string;
}

export const VoucherPreview = ({ data, title }: VoucherPreviewProps) => {
  if (data.length === 0) return null;

  const sampleVoucher = data[0];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Preview</h3>
        <p className="text-sm text-muted-foreground">
          Showing sample voucher (each will appear twice side-by-side in the PDF)
        </p>
      </div>
      
      <div className="bg-white border-2 border-gray-800 rounded-lg p-6 max-w-sm">
        <div className="flex items-center gap-2 mb-4">
          <Wifi className="w-4 h-4 text-gray-800" />
          <p className="text-sm font-bold text-gray-800">{title}</p>
        </div>
        
        <div className="space-y-2">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">
              Code: {sampleVoucher["Voucher ID"]}
            </p>
          </div>
          
          {sampleVoucher.Duration && (
            <p className="text-xs text-gray-800">
              Duration: {sampleVoucher.Duration}
            </p>
          )}
          
          {sampleVoucher["Validity Time"] && (
            <p className="text-xs text-gray-800">
              Valid Until: {sampleVoucher["Validity Time"]}
            </p>
          )}
          
          {sampleVoucher["Download Limit(Kbps)"] && (
            <p className="text-xs text-gray-800">
              Download: {sampleVoucher["Download Limit(Kbps)"]} Kbps
            </p>
          )}
          
          {sampleVoucher["Upload Limit(Kbps)"] && (
            <p className="text-xs text-gray-800">
              Upload: {sampleVoucher["Upload Limit(Kbps)"]} Kbps
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
