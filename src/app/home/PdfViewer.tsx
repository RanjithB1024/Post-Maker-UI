'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set the workerSrc for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type PdfViewerProps = {
  fileUrl: string;
};

export default function PdfViewer({ fileUrl }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div>
        {JSON.stringify(fileUrl)}
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {numPages &&
          Array.from({ length: numPages }, (_, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
      </Document>
    </div>
  );
}
