document.getElementById("convert").addEventListener("click", async function () {
  const pdfFile = document.getElementById("pdfFile").files[0];
  if (!pdfFile) {
    alert("Please select a PDF file.");
    return;
  }

  const pdfData = await pdfFile.arrayBuffer();
  const htmlOutput = document.getElementById("htmlOutput");
  
  pdf(pdfData, { worker: false }, function (err, htmlText) {
    if (err) {
      console.error(err);
      alert("Failed to convert the PDF.");
    } else {
      htmlOutput.innerHTML = htmlText;
    }
  });
});

