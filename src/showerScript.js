function calculerCout() {
  const prixKWh = parseFloat(document.getElementById('prixKWh').value);
  const litreMinute = parseFloat(document.getElementById('litreMinute').value);
  const prixM3 = parseFloat(document.getElementById('prixM3').value);
  const nbDouchesInput = document.getElementById('nbDouches').value;
  const nbDuree = parseFloat(document.getElementById('nbDuree').value);

  if (isNaN(prixKWh) || isNaN(litreMinute) || isNaN(prixM3) || nbDouchesInput.trim() === "" || isNaN(nbDuree)) {
      alert("Veuillez remplir tous les champs correctement.");
      return;
  }

  const nbDouches = nbDouchesInput.split('+').map(Number).reduce((a, b) => a + b, 0);

  const prixLitreEau = prixM3 / 1000; // Prix d'1 litre d'eau
  const coutEauMinute = litreMinute * prixLitreEau;
  const coutGazMinute = 0.04652 * prixKWh; // Estimation de 0,04652 kWh consommé par minute
  const resultats = document.getElementById('resultat');
  resultats.innerHTML = '';

  let durees = [1, 5, 10, 15, 20, nbDuree];
  durees = [...new Set(durees)].sort((a, b) => a - b);

  durees.forEach(minute => {
      const coutGazTotal = (coutGazMinute * minute).toFixed(2);
      const coutEauTotal = (coutEauMinute * minute).toFixed(2);
      const coutAnnuel = (nbDouches * 52 * (parseFloat(coutGazTotal) + parseFloat(coutEauTotal))).toFixed(2);
      
      const highlightClass = minute === nbDuree ? 'bg-emerald-300' : '';

      resultats.innerHTML += `
          <tr class="${highlightClass}">
              <td class="border p-2 text-center">${minute}</td>
              <td class="border p-2 text-center">${coutGazTotal} €</td>
              <td class="border p-2 text-center">${coutEauTotal} €</td>
              <td class="border p-2 text-center">${coutAnnuel} €</td>
          </tr>`;
  });
}

document.addEventListener("DOMContentLoaded", function () {
    const kofiButton = document.getElementById("kofi");

    kofiButton.addEventListener("click", function () {
        console.log('click');
        
        if (window.umami) {
            umami.track("Ko-fi Donation Click");
        }
    });
});