import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css"; // Core styles
// import "@react-pdf-viewer/default-layout/lib/styles/index.css"; // Layout styles

const PDFViewerComponent = ({ documentUrl }) => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js">
        <Viewer fileUrl={documentUrl} />
      </Worker>
    </div>
  );
};

export default PDFViewerComponent;
