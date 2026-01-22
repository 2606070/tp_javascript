// TP2 - Array Master
// Manipulation de tableaux avec map, filter, reduce

// Dataset des étudiants ;
//  c'est à dire un tableau qui contient les données des étudiants
/*  nom, notes, parcours sont des syntaxes pour les objets JavaScript 

le tableau etudiants est un tableau d'objets JavaScript  il contient des objets avec des propriétés nom, notes et parcours  ce  sont donc des objets JavaScript*/
let etudiants = [
  { nom: "Andry", notes: [12, 15, 14], parcours: "informatique" },
  { nom: "Boby", notes: [8, 10, 9], parcours: "physique" },
  { nom: "Celine", notes: [16, 18, 17], parcours: "informatique" },
  { nom: "Davida", notes: [11, 13, 12], parcours: "informatique" },
  { nom: "Tojo", notes: [14, 12, 15], parcours: "mathematiques" },
  { nom: "Haja", notes: [7, 9, 8], parcours: "mathematiques" },
  { nom: "Benja", notes: [19, 17, 18], parcours: "informatique" },
  { nom: "Njara", notes: [10, 11, 10], parcours: "physique" },
];

// ========================================
// 1) Ajouter la moyenne pour chaque etudiant
// ========================================

console.log("=== 1 : Ajout des moyennes ===");
console.log("");

// on utilise map pour ajouter la moyenne
// chaque etudiant va etre transforme en un nouvel etudiant avec la moyenne
// on calcule la moyenne en faisant la somme des notes divisee par le nombre de notes

/* les etudiantsAvecMoyenne est le tableau des etudiants avec leur moyenne  et on utilise map pour le créer  

map est une méthode qui permet de transformer chaque élément d'un tableau en un nouvel élément.
le map(function(etudiant) { ... }) permet de transformer chaque étudiant en un nouvel étudiant avec la moyenne calculée. */
let etudiantsAvecMoyenne = etudiants.map(function (etudiant) {
  // calculer la somme des notes
  // Notes.length donne le nombre de notes comme 3 par exemple pour Andry qui a 3 notes
  let somme = 0;
  for (let i = 0; i < etudiant.notes.length; i++) {
    /* etudiant.notes.length donne le nombre de notes comme 3 par exemple pour Andry qui a 3 notes  */
    somme = somme + etudiant.notes[i];
  }
  // etudiant.notes.length signifie le nombre de notes dont on dispose

  // calculer la moyenne
  let moyenne = somme / etudiant.notes.length;

  // arrondir a 2 chiffres apres la virgule c'est à dire 0.01, Le round est une fonction qui arrondit un nombre à l'entier le plus proche en utilisant des opérations mathématiques Math.round(moyenne * 100) / 100 permet d'arrondir la moyenne à deux décimales
  moyenne = Math.round(moyenne * 100) / 100;

  // retourner l'etudiant avec sa moyenne
  /* Le return ici en bas permet de renvoyer un nouvel objet contenant les informations de l'étudiant avec la moyenne calculée 
  
  - Return veut dire retourner cet objet avec les nouvelles propriétés */
  return {
    nom: etudiant.nom, // nom: etudiant.nom, signifie que la propriété nom de l'objet retourné prend la valeur de etudiant.nom où l'etudiant est l'objet d'origine dans le tableau.
    notes: etudiant.notes,
    parcours: etudiant.parcours,
    moyenne: moyenne,
  };
});

// afficher les resultats
for (let i = 0; i < etudiantsAvecMoyenne.length; i++) {
  console.log(
    etudiantsAvecMoyenne[i].nom +
      " : moyenne = " +
      etudiantsAvecMoyenne[i].moyenne,
  );
}

// ========================================
// 2) Filtrer les etudiants avec moyenne >= 12
// ========================================

console.log("");
console.log("=== 2 : Etudiants avec moyenne >= 12 ===");
console.log("");

// on utilise filter pour garder seulement ceux qui ont 12 ou plus,
// le filter(function(etudiant) { ... }) permet de filtrer les étudiants en ne gardant que ceux qui ont une moyenne supérieure ou égale à 12
/* etudiantsFiltres est le tableau des étudiants qui ont une moyenne supérieure ou égale à 12  et on utilise filter pour le créer*/
let etudiantsFiltres = etudiantsAvecMoyenne.filter(function (etudiant) {
  if (etudiant.moyenne >= 12) {
    return true;
  } else {
    return false;
  }
});

// afficher les etudiants filtres
console.log(
  "Nombre d'etudiants avec moyenne >= 12 : " + etudiantsFiltres.length,
);
console.log("");

for (let i = 0; i < etudiantsFiltres.length; i++) {
  console.log(
    "- " + etudiantsFiltres[i].nom + " (" + etudiantsFiltres[i].moyenne + ")",
  );
}

// ========================================
// 3) Trier par moyenne decroissante
// ========================================

console.log("");
console.log("=== 3 : Tri par moyenne decroissante ===");
console.log("");

// on copie le tableau pour pas modifier l'original
// EtudiantsTries est le tableau des étudiants triés par moyenne décroissante
let etudiantsTries = [];
for (let i = 0; i < etudiantsAvecMoyenne.length; i++) {
  etudiantsTries.push(etudiantsAvecMoyenne[i]); // push permet d'ajouter un élément à la fin du tableau
}

// on trie avec sort
etudiantsTries.sort(function (a, b) {
  // le sort (function(a, b) { ... }) permet de trier les étudiants en comparant leurs moyennes
  // si b.moyenne > a.moyenne, b vient avant a (decroissant)
  return b.moyenne - a.moyenne;
  // x.qqchose signifie qu'on accède à la propriété qqchose de l'objet x
  // donc ici b.moyenne signifie qu'on accède à la propriété moyenne de l'objet b
});

// afficher le classement
console.log("Classement des etudiants :");
console.log("");

for (let i = 0; i < etudiantsTries.length; i++) {
  let position = i + 1;
  console.log(
    position +
      ". " +
      etudiantsTries[i].nom +
      " - Moyenne : " +
      etudiantsTries[i].moyenne, // position + ". " + etudiantsTries[i].nom + " - Moyenne : " + etudiantsTries[i].moyenne signifie qu'on affiche le rang de l'étudiant suivi de son nom et de sa moyenne
  );
}

// ========================================
// 4) Grouper par parcours
// ========================================

console.log("");
console.log("=== 4 : Groupement par parcours ===");
console.log("");

// on utilise reduce pour grouper
// fonction reduce(function(resultat, etudiant) { ... }, {}) permet de regrouper les étudiants par parcours
/* parParcours est un objet où chaque clé est un parcours et la valeur est un tableau d'étudiants dans ce parcours  et on utilise reduce pour le créer .

Le reduce fonctionne comme suit :
- resultat est l'objet qui accumule les résultats
- etudiant est l'étudiant en cours
- on retourne resultat à la fin de chaque itération */
let parParcours = etudiantsAvecMoyenne.reduce(function (resultat, etudiant) {
  // si pas de parcours, on met "non defini"
  let parcours = etudiant.parcours;
  if (parcours == undefined) {
    parcours = "non defini";
  }

  // si le parcours existe pas encore dans resultat, on le cree
  if (resultat[parcours] == undefined) {
    resultat[parcours] = [];
  }

  // on ajoute l'etudiant dans son parcours
  resultat[parcours].push(etudiant);

  return resultat;
}, {});

// afficher les groupes
let lesParcours = Object.keys(parParcours);

for (let i = 0; i < lesParcours.length; i++) {
  let nomParcours = lesParcours[i];
  let etudiantsDuParcours = parParcours[nomParcours];

  console.log("Parcours : " + nomParcours.toUpperCase());
  console.log("Nombre d'etudiants : " + etudiantsDuParcours.length);

  for (let j = 0; j < etudiantsDuParcours.length; j++) {
    console.log(
      "   - " +
        etudiantsDuParcours[j].nom +
        " (moyenne: " +
        etudiantsDuParcours[j].moyenne +
        ")",
    );
  }
  console.log("");
}
