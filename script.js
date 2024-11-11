let valutaKurser = []

async function body_onload() {
  let data = await fetch("data.json");
  valutaKurser = await data.json();
  loadKurser();
}


function loadKurser() {
  console.log(valutaKurser["omregningskurser"])
  console.log(typeof (valutaKurser))
  console.log(valutaKurser[1])
  let valuta_select = document.getElementById("valuta_select");

  valutaKurser["omregningskurser"].forEach((element, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.innerText = element.valutakode + " : " + element.valutabeskrivelse
    valuta_select.appendChild(option);
  });

  document.getElementById("beregn").addEventListener("click", function () {
    let resultat = document.getElementById("resutatMelding")
    let inpBelop = document.getElementById("inpBelop").valueAsNumber
    let valuta = Number(document.getElementById("valuta_select").value)
    let kurs = valutaKurser["omregningskurser"][valuta]["valutakurs"]
    let realKurs = Number(kurs.replace(",", "."));


    let omregningsenhet = valutaKurser["omregningskurser"][valuta]["omregningsenhet"]
    let valutaKode = valutaKurser["omregningskurser"][valuta]["valutakode"]
    resultat.innerText = "For " + inpBelop + " " + valutaKode + " må du betale " + Math.floor((inpBelop / omregningsenhet * realKurs), 2) + " NOK"
  })
}



