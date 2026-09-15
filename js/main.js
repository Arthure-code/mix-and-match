// Le personnage mystère et la banque d'images : ces constantes sont les
// seules valeurs à changer pour un autre personnage ou une autre banque.
const DOSSIER_IMAGES = 'images/';
const EXTENSION = '.jpg';
const NB_VARIANTES = 10;
const PERSONNAGE_MYSTERE = { haut: 3, milieu: 5, bas: 2 };

const refReussite = document.getElementById('reussite');
const refImages = {
    haut: document.getElementById('imageHaut'),
    milieu: document.getElementById('imageMilieu'),
    bas: document.getElementById('imageBas'),
};

for (const refImage of Object.values(refImages)) {
    refImage.addEventListener('click', changerImage);
}

/**
* Passer à la variante suivante de l'image cliquée, puis vérifier le
* personnage. Une seule fonction pour les trois images : e.currentTarget
* est l'image qui porte l'écouteur, et son nom de fichier dit tout.
* @param {Event} e - L'événement de clic
*/
function changerImage(e) {
    const refImage = e.currentTarget;
    const { partie, index } = lirePartieEtIndex(refImage);

    refImage.src = cheminImage(partie, (index + 1) % NB_VARIANTES);
    verifierPersonnage();
}

/**
* Lire, dans le nom de fichier d'une image, la partie du corps et le numéro
* de la variante : « images/bas7.jpg » donne bas et 7.
* @param {HTMLImageElement} refImage - L'image à lire
* @returns {{partie: string, index: number}} La partie et son numéro
*/
function lirePartieEtIndex(refImage) {
    const nomFichier = refImage.getAttribute('src').slice(DOSSIER_IMAGES.length, -EXTENSION.length);
    const partie = nomFichier.replace(/\d+$/, '');
    const index = Number(nomFichier.slice(partie.length));

    return { partie, index };
}

/**
* Composer le chemin d'une image à partir de sa partie et de son numéro.
* @param {string} partie - haut, milieu ou bas
* @param {number} index - Le numéro de la variante
* @returns {string} Le chemin relatif de l'image
*/
function cheminImage(partie, index) {
    return DOSSIER_IMAGES + partie + index + EXTENSION;
}

/**
* Comparer la sélection courante au personnage mystère : le message et les
* bordures vertes n'apparaissent que si les trois parties correspondent, et
* disparaissent dès qu'on s'en éloigne.
*/
function verifierPersonnage() {
    const trouve = Object.keys(PERSONNAGE_MYSTERE).every(
        (partie) => lirePartieEtIndex(refImages[partie]).index === PERSONNAGE_MYSTERE[partie]
    );

    for (const refImage of Object.values(refImages)) {
        refImage.classList.toggle('bonne-selection', trouve);
    }
    refReussite.classList.toggle('cacher', !trouve);
}
