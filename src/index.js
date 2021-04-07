

document.getElementById("app").innerHTML = `
<h1>5584 Parcel Inventory</h1>
<div>
  
  <input type="file" />
  <input type="button" value="upload CSV" id="upload" /> 
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
      cells.push("       ", "       ");

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
