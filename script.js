// Insertions des éléments dans le PDF
function afficherPDF() {
if(confirm("确定"))

    // les variables
    var form_nom = document.querySelector('.form-nom').value
    // var form_prenom = document.querySelector('.form-prenom').value
    // var form_age = document.querySelector('.form-age').value
    var form_code_postal = document.querySelector('.form-code-postal').value
    var form_adresse = document.querySelector('.form-adresse').value
    var form_ville = document.querySelector('.form-ville').value


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
      <p><strong>${form_nom}</strong></p>
      <p><strong>${form_adresse}</strong></p>
      <p><strong>${form_code_postal}  ${form_ville}</strong></p>
      
    </div>
  </div>
  <div class="generateurBtn">
    <button class="submit" onclick="generateurPDF()">Télécharger Le PDF</button>
    <a href="index.html" class="submit"> Générer un autre PDF </a>
  </div>
    `
}

function generateurPDF() {
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

    var inputRef = document.createElement('input')
    inputRef.type = "text"
    inputRef.class = "ref"
    row.insertCell(0).appendChild(inputRef);

    var inputDesignation = document.createElement('input')
    inputDesignation.type = "text"
    inputDesignation.class = "designation"
    row.insertCell(1).appendChild(inputDesignation);

    var inputQte = document.createElement('input')
    inputQte.type = "text"
    inputQte.class = "qte"
    row.insertCell(2).appendChild(inputQte);

    var inputUnite = document.createElement('input')
    inputUnite.type = "text"
    inputUnite.class = "unite"
    row.insertCell(3).appendChild(inputUnite);

    var inputPUHT = document.createElement('input')
    inputPUHT.type = "text"
    inputPUHT.class = "puht"
    row.insertCell(4).appendChild(inputPUHT);

    var inputRemise = document.createElement('input')
    inputRemise.type = "text"
    inputRemise.class = "remise"
    row.insertCell(5).appendChild(inputRemise);

    var inputTotal = document.createElement('input')
    inputTotal.type = "text"
    inputTotal.class = "total"
    row.insertCell(6).appendChild(inputTotal);

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

function tableToArray() {               //TODO
    var arrTab = []
    $("#facture-tab tbody tr").each(function () {
        var arrRow = []
        var tabDate = $(this).find('td').find('input')
        tabDate.each(function () {
            arrRow.push($(this).val())
        })
        arrTab.push(arrRow)
    })
    console.log(arrTab)
}

// function numDoc(obj) {
//     var date = document.getElementById("date").value
//     console.log(date)
//     var ref_clt = document.getElementById("refclt").value
//     numdoc.value = date + ref_clt
// }




