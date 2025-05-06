import React, { useState } from 'react';
import { Download, File, FileText, Image, ClipboardCheck, Share2, Loader2 } from 'lucide-react';
import { VisualizationResult } from '../../types';

interface ChartExportsProps {
  chartData: VisualizationResult;
}

const ChartExports: React.FC<ChartExportsProps> = ({ chartData }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);
  
  const handleExport = async (format: 'png' | 'pdf' | 'csv') => {
    setIsExporting(true);
    setExportSuccess(null);
    
    try {
      // Simulate export process with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, this would use the chart library's export functionality
      // For ag-charts, this would involve:
      // 1. For PNG/PDF: Using ag-charts' exportChart method
      // 2. For CSV: Processing the data manually into CSV format
      
      setExportSuccess(`Chart exported as ${format.toUpperCase()}`);
      setTimeout(() => setExportSuccess(null), 3000);
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };
  
  const exportAsCSV = () => {
    // Create CSV content from chart data
    const headers = ["Label", "Value"];
    const rows = chartData.chartData.x.map((label, index) => [
      label, 
      chartData.chartData.y[index]
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${chartData.chartData.title || 'chart'}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };
  
  const copyToClipboard = () => {
    const text = `${chartData.chartData.title}\n\n${chartData.insight}\n\nData:\n`;
    
    const dataText = chartData.chartData.x.map((label, index) => 
      `${label}: ${chartData.chartData.y[index]}`
    ).join('\n');
    
    navigator.clipboard.writeText(text + dataText);
    setExportSuccess('Copied to clipboard');
    setTimeout(() => setExportSuccess(null), 3000);
  };
  
  return (
    <div className="mt-4">
      {isExporting ? (
        <div className="flex items-center justify-center py-2">
          <Loader2 className="h-5 w-5 text-gray-500 animate-spin mr-2" />
          <span className="text-sm text-gray-600">Exporting...</span>
        </div>
      ) : exportSuccess ? (
        <div className="flex items-center justify-center py-2 text-sm text-green-600">
          <ClipboardCheck className="h-4 w-4 mr-2" />
          {exportSuccess}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => handleExport('png')}
            className="flex items-center text-sm bg-white border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors"
          >
            <Image className="h-4 w-4 mr-1.5" />
            PNG
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center text-sm bg-white border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors"
          >
            <File className="h-4 w-4 mr-1.5" />
            PDF
          </button>
          <button
            onClick={exportAsCSV}
            className="flex items-center text-sm bg-white border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-4 w-4 mr-1.5" />
            CSV Data
          </button>
          <button
            onClick={copyToClipboard}
            className="flex items-center text-sm bg-white border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors"
          >
            <Share2 className="h-4 w-4 mr-1.5" />
            Copy Text
          </button>
        </div>
      )}
    </div>
  );
};

export default ChartExports;