document.addEventListener('DOMContentLoaded', () => {
    const pdfInput = document.getElementById('pdf-input');
    const pdfContainer = document.getElementById('pdf-container');

    pdfInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file.type !== 'application/pdf') {
            alert('Please select a PDF file.');
            return;
        }

        // Clear previous content
        pdfContainer.innerHTML = '';

        // Load PDF
        const pdfData = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

        // Convert each PDF page to HTML
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.0 });
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderContext = {
                canvasContext: ctx,
                viewport: viewport,
            };

            await page.render(renderContext).promise;
            pdfContainer.appendChild(canvas);
        }
    });
});
