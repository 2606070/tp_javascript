/*
Récupération des éléments du DOM c'est à dire les éléments HTML dont j'ai besoin pour mon application de todo list pour commencer je récupère l'input pour écrire la tâche, le bouton ajouter, la liste UL pour afficher les tâches et les boutons de filtre. 
. La fonction getElementById permet de récupérer un élément HTML par son ID qui est unique dans la page. 
. La fonction querySelectorAll permet de récupérer tous les éléments qui correspondent à un sélecteur CSS donné ici tous les boutons avec la classe filter-btn.*/

const input = document.getElementById("tacheInput");
const btnAjouter = document.getElementById("btnAjouter");
const liste = document.getElementById("listeTaches");
const filterButtons = document.querySelectorAll(".filter-btn");

// 1. Fonction pour ajouter une tâche
function ajouterTache() {
  const texte = input.value;

  // Vérif si vide
  if (texte === "") {
    alert("Il faut écrire quelque chose !");
    return;
  }

  // Création du LI
  const li = document.createElement("li");

  // J'utilise innerHTML pour aller plus vite pour créer les boutons spans c'est à dire le contenu HTML et CSS donc je mets tout dedans
  li.innerHTML = `
        <span class="texte-tache">${texte}</span>
        <div class="actions">
            <button class="btn-check">V</button>
            <button class="btn-delete">X</button>
        </div>
    `;

  // Ajout à la liste (UL)
  liste.appendChild(li);

  // Vider l'input vides input est nécessaire parce que sinon on doit effacer manuellement et ça gache du temps
  input.value = "";
}

// Ecouteur sur le bouton Ajouter c'est à dire quand on clique sur le bouton Ajouter
btnAjouter.addEventListener("click", ajouterTache);

// Ajout avec la touche Entrée en utillisant un écouteur sur l'input keypress signifie quand on appuie sur une touche du clavier et function e est l'événement donc e.key est la touche appuyée
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    ajouterTache();
  }
});

// 2. OPTIMISATION : Event Delegation c'est à dire délégation d'événements est une technique pour gérer les événements de manière plus efficace les événements sont gérés par un seul écouteur sur un parent commun plutôt que d'ajouter des écouteurs à chaque élément individuel donc
// Au lieu de mettre un addEventListener sur chaque bouton supprimer/valider
// Je mets un seul écouteur sur le parent (UL)
liste.addEventListener("click", function (event) {
  const itemClique = event.target; // Sur quoi j'ai cliqué ?

  // Si c'est le bouton SUPPRIMER
  if (itemClique.classList.contains("btn-delete")) {
    // On remonte au parent <li> pour le supprimer donc c'est  le plus proche parent qui est un li, le closest remonte dans l'arborescence du  DOM qui est le document HTML c'est important pour supprimer la tâche entière et pas juste le bouton
    const li = itemClique.closest("li");
    li.remove();
  }

  // Si c'est le bouton VALIDER (Done)
  if (itemClique.classList.contains("btn-check")) {
    const li = itemClique.closest("li");
    // On toggle la classe CSS 'termine'
    li.classList.toggle("termine");
  }
});

// 3. Gestion des Filtres: dans le HTML j'ai mis des boutons avec une data-attribute data-filter pour savoir quel filtre appliquer les filtres sont : tout (all), à faire (todo), fait (done)
// J'ajoute un écouteur sur chaque bouton de filtre
filterButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const filtre = e.target.getAttribute("data-filter");
    filtrerTaches(filtre);
  });
});

// Fonction pour filtrer les tâches c'est un paramètre status qui peut être 'all', 'todo', 'done'
// ici la fonction filter permet de filtrer les tâches en fonction de leur statut
function filtrerTaches(status) {
  // Je récupère tous les LI de ma liste
  const taches = liste.querySelectorAll("li"); // le querySelectorAll permet de sélectionner tous les éléments qui correspondent au sélecteur CSS donné ici tous les li dans la liste

  /* taches.forEach permet de parcourir chaque tâche c'est à dire chaque li et d'appliquer une fonction à chacune d'elles ,
  Globalement le forEach est une boucle qui itère sur chaque élément d'une collection dont on peut appliquer une fonction comme ici une fonction fléchée.
   les flèches => sont une syntaxe plus concise pour définir des fonctions anonymes , autrement dit des fonctions sans nom*/

  taches.forEach((tache) => {
    // Est-ce que la tâche est finie ?
    const estFini = tache.classList.contains("termine");

    /* le switch permet de faire des conditions multiples en fonction de la valeur de status ici on a trois cas possibles : all, todo, done; 
    - le all c'est pour tout afficher, 
    - todo c'est pour afficher seulement les tâches non terminées, 
    - done c'est pour afficher seulement les tâches terminées . 
    
    .    Pour le case 'all' on affiche tout en mettant le style display à 'flex' pour que les tâches soient visibles. 
    Pour le case 'todo' on vérifie si la tâche est finie avec estFini si elle l'est on la cache en mettant display à 'none' sinon on l'affiche en mettant display à 'flex'. 
    Pour le case 'done' on fait l'inverse on affiche les tâches finies et on cache les non finies.*/

    switch (status) {
      case "all":
        tache.style.display = "flex";
        break;
      case "todo":
        if (estFini) {
          tache.style.display = "none"; // le tache style display none signifie qu'on cache la tâche
        } else {
          tache.style.display = "flex"; // ON aff
        }
        break;
      case "done":
        if (estFini) {
          tache.style.display = "flex";
        } else {
          tache.style.display = "none"; // On cache si pas fini
        }
        break;
    }
  });
}
