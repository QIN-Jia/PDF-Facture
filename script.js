const INPUT_LIST = [
  "ref",
  "designation",
  "qte",
  "unite",
  "puht",
  "remise",
  "total",
  "total-with-tva",
];

// Insertions des éléments dans le PDF
function afficherPDF() {
  if (confirm("确定"))
    // les variables
    var form_nom = document.querySelector(".form-nom").value;
  // var form_prenom = document.querySelector('.form-prenom').value
  // var form_age = document.querySelector('.form-age').value
  var form_code_postal = document.querySelector(".form-code-postal").value;
  var form_adresse = document.querySelector(".form-adresse").value;
  var form_ville = document.querySelector(".form-ville").value;

  var body = document.querySelector("body");

  tableToArray();

  // Insertion
  body.innerHTML = `
    <div class="piece">
    <div class="logo">
      <img src="src/logo.png" />
    </div>
    <h1>Facture</h1>
    <div class="elements">
      <p><strong>${form_nom}</strong></p>
      <p><strong>${form_adresse}</strong></p>
      <p><strong>${form_code_postal}  ${form_ville}</strong></p>
      
    </div>
  </div>
  <div class="generateurBtn">
    <button class="submit" onclick="generateurPDF()">Télécharger Le PDF</button>
    <a href="index.html" class="submit"> Générer un autre PDF </a>
  </div>
    `;
}

function generateurPDF() {
  //nom du fichier
  var nom_fichier = prompt("Nom du fichier PDF : ");

  //generer le PDF
  var piece = document.querySelector(".piece");
  var opt = {
    margin: 0,
    filename: `${nom_fichier}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  if (nom_fichier != null) {
    html2pdf().set(opt).from(piece).save();
  } else {
    alert("Veuillez choisir un nom");
  }
}

function addRow() {
  var tbodyRef = document
    .getElementById("facture-tab")
    .getElementsByTagName("tbody")[0];

  var row = tbodyRef.insertRow(-1);

  INPUT_LIST.forEach((e, i) => {
    const ref = document.createElement("input");
    ref.classList.add(e);
    row.insertCell(i).appendChild(ref);
  });
}

function removeRow() {
  var tableID = "facture-tab";
  var table = document.getElementById(tableID);
  var rowCount = table.rows.length;

  if (confirm("Assurez-vous de supprimer la dernière ligne ?")) {
    if (rowCount > 1) {
      table.deleteRow(-1);
    }
  } else {
    alert("Suppression annulée.");
  }
}

function parseRow(row) {
  const parsed = {};
  row.cells.forEach((cell) => {
    const { className, value } = cell.firstElementChild;
    parsed[className] = parseFloat(value) || 0;
  });
  return parsed;
}

function calculateTotal(parsedRow) {
  const { qte, unite, puht, remise } = parsedRow;
  return qte * unite * puht - remise;
}

function calculateTotals() {
  const tbodyRef = document
    .getElementById("facture-tab")
    .getElementsByTagName("tbody")[0];
  const rows = tbodyRef.querySelectorAll("tr");
  const tva = parseFloat(document.querySelector("input.form-tva")?.value) / 100;

  Array.from(rows).forEach((row, index) => {
    const total = calculateTotal(parseRow(row));
    const totalHT = total * (1 - tva);
    row.querySelector("input.total-with-tva").value = total;
    row.querySelector("input.total").value = totalHT.toFixed(2);
  });
}

function tableToArray() {
  //TODO
  var arrTab = [];
  $("#facture-tab tbody tr").each(function () {
    var arrRow = [];
    var tabDate = $(this).find("td").find("input");
    tabDate.each(function () {
      arrRow.push($(this).val());
    });
    arrTab.push(arrRow);
  });
  console.log(arrTab);
}

// function numDoc(obj) {
//     var date = document.getElementById("date").value
//     console.log(date)
//     var ref_clt = document.getElementById("refclt").value
//     numdoc.value = date + ref_clt
// }
