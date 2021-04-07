

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>
  <input type="file" />
  <input type="button" value="upload" id="upload" /> 
  <div id="table-wrapper">
  </div>
</div>
`;

const uploadButton = document.querySelector("#upload");
const fileUpload = document.querySelector("input");

function upload() {
  let file = fileUpload.files[0];

  let reader = new FileReader();

  reader.readAsText(file);
  reader.onload = function (e) {
    // replace double quotes and extract each row as an array item

    // console.log(reader.result);
    const table = document.createElement("table");
    table.setAttribute("contenteditable", "");
    let rows = reader.result
      .replace(/(")|(\r)/g, "")
      .trim()
      .split("\n");
    // let cells = rows.map((item, i) => {
    //   return item.split(",");
    // });
    // should be carrier code
    // each row is sub array
    // console.log(cells[0][0]);

    for (let i = 0; i < rows.length; i++) {
      let cells = rows[i].split(",");
      console.log(cells[0]);
      cells.splice(19, 2);
      cells.splice(12, 5);
      cells.splice(6, 4);
      cells.splice(1, 4);

      if (cells.length > 1) {
        let row = table.insertRow(-1);
        for (let j = 0; j < cells.length; j++) {
          let cell = row.insertCell(-1);
          cell.innerHTML = cells[j];
        }
      }
    }
    const tableContainer = document.getElementById("table-wrapper");
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
  };
}

uploadButton.addEventListener("click", upload);
