// Insertions des éléments dans le PDF
function afficherPDF() {
    // les variables
    var form_nom = document.querySelector('.form-nom').value
    var form_prenom = document.querySelector('.form-prenom').value
    var form_age = document.querySelector('.form-age').value
    var form_mail = document.querySelector('.form-mail').value
    var form_adresse = document.querySelector('.form-adresse').value
    var body = document.querySelector('body')

    // Insertion
    body.innerHTML = `
    <div class="piece">
    <div class="logo">
      <img src="logo.png" />
      <p>Demo Facture PDF</p>
    </div>
    <h1>Pièce D'identité Partielle</h1>
    <div class="elements">
      <p>Nom: <strong>${form_nom}</strong></p>
      <p>Prenom: <strong>${form_prenom}</strong></p>
      <p>Age: <strong>${form_age}</strong></p>
      <p>Adresse Mail: <strong>${form_mail}</strong></p>
      <p>Adresse: <strong>${form_adresse}</strong></p>
      <div class="certification">
        <img src="logo.png" />
        <p>Huayi Tech</p>
      </div>
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
    }else{
        alert("Veuillez choisir un nom")
    }


}