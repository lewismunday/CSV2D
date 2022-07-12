// var csvParsedArray = [];
// $(document).on("click", "#btnUploadFile", function () {
//   if ($("#fileToUpload").get(0).files.length == 0) {
//     alert("Please upload the file first.");
//     return;
//   }
//   let fileUpload = $("#fileToUpload").get(0);
//   let files = fileUpload.files;
//   if (files[0].name.toLowerCase().lastIndexOf(".csv") == -1) {
//     alert("Please upload only CSV files");
//     return;
//   }
//     let reader = new FileReader();
//     let bytes = 50000;
//     // Read first line of CSV and log to console
//     reader.onloadend = function (evt) {
//         let lines = evt.target.result;
//         if (lines && lines.length > 0) {
//             console.log('lines');
//     } else{
//         console.log('no lines');
//     };
    
// }});

window.onload = () => {
    let picker = document.getElementById('csv-btn');

    picker.onchange = () => {
        let selected = picker.files[0];

        let reader = new FileReader();
        reader.addEventListener('loadend', () => {
            let data = reader.result.split("\r\n");
            for (let i in data){
                data[i] = data[i].split(",");
            }

            data = JSON.stringify(data);
            picker.value = '';
            console.log(data);
        });
        reader.readAsText(selected);
    }
}