function updateTime() {
    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    document.getElementById("time").textContent = time;
}

updateTime();
setInterval(updateTime, 1000);
/* =====================================================
   ENDOSENSE AI
   DOWNLOAD REPORT AS PDF
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const downloadButton =
        document.getElementById("downloadReport");

    const report =
        document.getElementById("endoReport");


    /* Make sure both elements exist */

    if (!downloadButton || !report) {
        return;
    }


    /* ==========================
       DOWNLOAD BUTTON
    =========================== */

    downloadButton.addEventListener("click", function () {


        /* Change button text */

        downloadButton.disabled = true;

        downloadButton.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i>' +
            '<span>Generating PDF...</span>';


        /* ==========================
           PDF SETTINGS
        =========================== */

        const pdfOptions = {

            margin: 0,

            filename:
                "EndoSense_AI_Report.pdf",


            image: {

                type: "jpeg",

                quality: 0.98

            },


            html2canvas: {

                scale: 2,

                useCORS: true,

                backgroundColor: "#E6D3A3"

            },


            jsPDF: {

                unit: "mm",

                format: "a4",

                orientation: "portrait"

            }

        };


        /* ==========================
           CREATE PDF
        =========================== */

        html2pdf()

            .set(pdfOptions)

            .from(report)

            .save()


            /* ==========================
               FINISHED
            =========================== */

            .then(function () {

                downloadButton.disabled = false;

                downloadButton.innerHTML =
                    '<i class="fa-solid fa-download"></i>' +
                    '<span>Download PDF</span>';

            })


            /* ==========================
               ERROR
            =========================== */

            .catch(function (error) {

                console.error(
                    "PDF generation error:",
                    error
                );


                downloadButton.disabled = false;

                downloadButton.innerHTML =
                    '<i class="fa-solid fa-download"></i>' +
                    '<span>Download PDF</span>';


                alert(
                    "There was a problem generating your PDF."
                );

            });

    });

});
