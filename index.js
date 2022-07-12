function CSVToArray(strData, strDelimiter) {
  strDelimiter = strDelimiter || ",";
  let objPattern = new RegExp(
      "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
      "gi"
  );
  let arrData = [[]];
  let arrMatches = null;
  while ((arrMatches = objPattern.exec(strData))) {
    let strMatchedDelimiter = arrMatches[1];
    let strMatchedValue = [];
    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      arrData.push([]);
    }
    if (arrMatches[2]) {
      strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      strMatchedValue = arrMatches[3];
    }
    arrData[arrData.length - 1].push(strMatchedValue);
  }
  return arrData;
}

const fileSelector = document.getElementById('file-selector');

fileSelector.addEventListener('change', (event) => {
  // Grabs file and check if CSV
  const fileList = event.target.files[0];
  if (event.target.files.length > 1){
    alert('Please select only 1 file.')
    return;
  }
  if (fileList.type && !fileList.type.startsWith('text/csv')) {
    alert('File is not a csv.');
    return;
  }

  const reader = new FileReader();
  const bytes = 50000

  reader.addEventListener('load', (event) => {
    let lines = event.target.result;
    if (lines && lines.length > 0) {
      let line_array = CSVToArray(lines)
      if (lines.length === bytes) {
        line_array = line_array.splice(0, line_array.length - 1);
      }
      let objectArray = line_array.toString().split(',')

      let dict = {}
      let previousElement;

      for (let i = 0; i < objectArray.length; i++){
        if (i % 2 === 0) {
          previousElement = objectArray[i]
          dict[previousElement] = null;
        } else {
          dict[previousElement] = objectArray[i]
          dict[previousElement] = objectArray[i]
        }
      }

      document.getElementById('obj-display').value = JSON.stringify(dict);
    }
    fileList.src = event.target.result;
  });
  reader.readAsText(fileList)
});


async function copyText() {
  /* Get the text field */
  let copyText = document.getElementById("obj-display");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value).then(function() {
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

document.getElementById('radio-btn-multi').disabled = true;
