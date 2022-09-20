// Insertions des éléments dans le PDF
function afficherPDF() {
    // les variables
    var form_nom = document.querySelector('.form-nom').value
    var form_prenom = document.querySelector('.form-prenom').value
    var form_age = document.querySelector('.form-age').value
    var form_mail = document.querySelector('.form-mail').value
    var form_adresse = document.querySelector('.form-adresse').value




    var body = document.querySelector('body')

    tableToArray()



    // Insertion
    body.innerHTML = `
    <div class="piece">
    <div class="logo">
      <img src="src/logo.png" />
    </div>
    <h1>Facture</h1>
    <div class="elements">
      <p>Nom: <strong>${form_nom}</strong></p>
      <p>Prenom: <strong>${form_prenom}</strong></p>
      <p>Age: <strong>${form_age}</strong></p>
      <p>Adresse Mail: <strong>${form_mail}</strong></p>
      <p>Adresse: <strong>${form_adresse}</strong></p>
    </div>
  </div>
  <div class="generateurBtn">
    <button class="submit" onclick="generateurPDF()">Télécharger Le PDF</button>
    <a href="index.html" class="submit"> Générer un autre PDF </a>
  </div>
    `
}

function generateurPDF() {
    // const piece = document.querySelector(".piece")
    // html2pdf()
    //     .from(piece)
    //     .save

    //nom du fichier
    var nom_fichier = prompt("Nom du fichier PDF : ")

    //generer le PDF
    var piece = document.querySelector(".piece")
    var opt = {
        margin: 0,
        filename: `${nom_fichier}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    }
    if (nom_fichier != null) {
        html2pdf().set(opt).from(piece).save()
    } else {
        alert("Veuillez choisir un nom")
    }
}


function addRow() {
    var tbodyRef = document.getElementById("facture-tab").getElementsByTagName("tbody")[0];

    var row = tbodyRef.insertRow(-1);
    row.insertCell(0).appendChild(document.createElement('input'));
    row.insertCell(1).appendChild(document.createElement('input'));
    row.insertCell(2).appendChild(document.createElement('input'));
    row.insertCell(3).appendChild(document.createElement('input'));
    row.insertCell(4).appendChild(document.createElement('input'));
    row.insertCell(5).appendChild(document.createElement('input'));
    row.insertCell(6).appendChild(document.createElement('input'));
}

function removeRow() {
    var tableID = "facture-tab";
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;

    if (confirm("确定删除最后一行?")) {
        if (rowCount > 1) {
            table.deleteRow(-1);
        }
    } else {
        alert("取消删除")
    }
}

function tableToArray() {
    var arrTab = []
    $("table#facture-tab tr").each(function () {
        var arrRow = []
        var tabDate = $(this).find('td')
        if (tabDate.length > 0) {
            tabDate.each(function () {
                arrRow.push($(this).text())
            })
            arrTab.push(arrRow)
        }

    })
    // arr.forEach(e => console.log(e))
    console.log(arrTab)
}
