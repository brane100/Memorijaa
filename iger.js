// Definicija podatkov za kartice
const podatkeKartic = [
    { id: 1, slikaLice: 'karti/amazon.png', slikaGrb: 'kartaa.jpg' },
    { id: 2, slikaLice: 'karti/audi.png', slikaGrb: 'kartaa.jpg' },
    { id: 3, slikaLice: 'karti/burgerking.png', slikaGrb: 'kartaa.jpg' },
    { id: 4, slikaLice: 'karti/facebook.png', slikaGrb: 'kartaa.jpg' },
    { id: 5, slikaLice: 'karti/ferrari.png', slikaGrb: 'kartaa.jpg' },
    { id: 6, slikaLice: 'karti/google.png', slikaGrb: 'kartaa.jpg' },
    { id: 7, slikaLice: 'karti/mcdonalds.png', slikaGrb: 'kartaa.jpg' },
    { id: 8, slikaLice: 'karti/microsoft.png', slikaGrb: 'kartaa.jpg' },
    { id: 9, slikaLice: 'karti/amazon.png', slikaGrb: 'kartaa.jpg' },
    { id: 10, slikaLice: 'karti/audi.png', slikaGrb: 'kartaa.jpg' },
    { id: 11, slikaLice: 'karti/burgerking.png', slikaGrb: 'kartaa.jpg' },
    { id: 12, slikaLice: 'karti/facebook.png', slikaGrb: 'kartaa.jpg' },
    { id: 13, slikaLice: 'karti/ferrari.png', slikaGrb: 'kartaa.jpg' },
    { id: 14, slikaLice: 'karti/google.png', slikaGrb: 'kartaa.jpg' },
    { id: 15, slikaLice: 'karti/mcdonalds.png', slikaGrb: 'kartaa.jpg' },
    { id: 16, slikaLice: 'karti/microsoft.png', slikaGrb: 'kartaa.jpg' },
];

// Število parov kartic
let pari = podatkeKartic.length / 2;

// Ura
let uraSec = 0;
let uraMin = 0;
let uraInt = undefined;
let uraTek = true;

// Izbrana predhodna kartica
let prkartica = null;

// Ali je trenutno trčenje kartic v teku
let trcanje = false;

// Funkcija, ki nastavi kartic
function postaviKarti() {
    for (let i = 0; i < podatkeKartic.length; i++) {
        const k = podatkeKartic[i];

        const card = document.createElement('div');
        card.className = 'kartica';
        card.id = k.id;

        card.innerHTML = `
    <div class="kartica-vn">
        <div class="kartica-front">
            <img src="${k.slikaLice}">
        </div>
        <div class="kartica-back">
        <img class="poz" src="${k.slikaGrb}">
        </div>
    </div>
`;

        karti.appendChild(card);
        card.addEventListener('click', cardClickHandler);
    }
}

// Pridobi starševski element, ki vsebuje vse div elemente
const karti = document.querySelector('.karti');

// Pridobi vse div elemente s razredom "kartica-vn"
const divElementi = karti.querySelectorAll('.kartica');

const krt = Array.from(divElementi);

const p = document.querySelector('.cont');

// Premešaj kartice
function mesaj(krt) {
    for (let i = krt.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [krt[i], krt[j]] = [krt[j], krt[i]];
    }
    console.log("Končano mešanje.");
}

// Prikaz ure
function uraPov() {
    uraSec++;
    if (uraSec > 59) {
        uraSec = 0;
        uraMin++;
    }
    if (uraMin > 59) {
        uraMin = 0;
    }

    let prikSec = uraSec.toString();
    if (prikSec.length < 2)
        prikSec = "0" + prikSec;
    let prikMin = uraMin.toString();
    if (prikMin.length < 2)
        prikMin = "0" + prikMin;

    document.getElementById("ura").innerHTML =
        prikMin + ":" + prikSec;
}

// Začni/ustavi uro
function uraStartStop() {
    if (uraTek) {
        window.clearInterval(uraInt);
        uraTek = false;
    } else {
        uraInt = window.setInterval(uraPov, 1000);
        uraTek = true;
    }
}

// Ponastavi uro
function uraReset() {
    uraMin = 0;
    uraSec = 0;
    document.getElementById("ura").innerHTML = "00:00";

    if (uraTek) {
        window.clearInterval(uraInt);
        uraInt = window.setInterval(uraPov, 1000);
    }
}

// Prevrni izbrano kartico
function prevrtiKarta(kartica) {
    kartica.classList.add('vrtenje');
    kartica.querySelector('.kartica-vn').classList.toggle('is-flipped');
    setTimeout(function () {
        kartica.classList.remove('vrtenje');
    }, 1000);
}

// Preveri, ali je igra končana
function jeKonec() {
    if (pari === 0) {
        uraStartStop();
        setTimeout(() => {
            alert("Čestitamo! Našli ste vse pare kartic.");
        }, 1000);
        const gumb = document.createElement('button');
        gumb.className = 'gumb';
        gumb.onclick= 'ponastaviIgro()';
        gumb.innerHTML = 'Poskusi ponovno';
    
        p.appendChild(gumb);
        
        // Poslušalec dogodkov za gumb za ponovni zagon
        gumb.addEventListener('click', ponastaviIgro);
    }
}

// Obdelovalec klika na kartico
function cardClickHandler() {
    const kartica = this; //referenco na kartici

    // Zaženi uro, če še ni začela šteti
    if (!uraTek) {
        uraStartStop();
    }


    if (!trcanje && prkartica !== kartica && kartica.id !== null && !kartica.classList.contains('vrtenje')) {
        prevrtiKarta(this);

        if (prkartica === null) {
            prkartica = kartica;
        } else {
            trcanje = true;
            if (prkartica.id % (podatkeKartic.length / 2) === this.id % (podatkeKartic.length / 2)) {
                // Kartici se ujemata, ne prekrij ju ponovno
                prkartica.removeEventListener('click', cardClickHandler);
                this.removeEventListener('click', cardClickHandler);
                prkartica = null;
                trcanje = false;
                pari--;
                console.log("Preostali pari: " + pari)
                jeKonec();
            } else {
                setTimeout(() => {
                    prevrtiKarta(kartica);
                    prevrtiKarta(prkartica);
                    prkartica = null;
                    trcanje = false;
                }, 1000);
            }
        }
    }
}

// Premešaj kartice in prikaži igralno logiko
function StartIgro () {
    mesaj(podatkeKartic);
    postaviKarti();
    uraStartStop();
}

StartIgro();
  
function ponastaviIgro() {
    window.location.href = 'iger.html'
}
  