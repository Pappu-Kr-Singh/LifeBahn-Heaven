import React from "react";
import axios from "axios";

const DownloadDocument = ({ rawUrl }) => {
  const handleDownload = async () => {
    try {
      // Fetch the raw file content using axios
      const response = await axios.get(rawUrl, {
        responseType: "arraybuffer", // Get the file as binary data
      });

      // Create a Blob with the correct MIME type for PDF
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a temporary link element to trigger download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "document.pdf"; // Set the default filename with .pdf extension
      link.click(); // Trigger the download
    } catch (error) {
      console.error("Error downloading document:", error);
      alert("There was an error downloading the document.");
    }
  };

  return (
    <button onClick={handleDownload} className="download_btn">
      Download PDF
    </button>
  );
};

export default DownloadDocument;
