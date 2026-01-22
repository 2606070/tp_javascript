// tp5_async.js - Version simple pour débutants

// 1) Fonction wait(ms) - Attendre un certain temps
function wait(ms) {
  return new Promise(function (resolve) {
    // return new promise(function(reslove)) signifie que de la fonction wait rennvoie une peomesse
    setTimeout(function () {
      // le setTimeout permet d'executer une fonction apres un delai en ms
      resolve(); // resolve est appele apres le delai pour indiquer que la promesse est resolue
    }, ms);
  });
}

// 2) Simulation d'un système de login
// Base de données des utilisateurs (très simple)
const users = [
  {
    username: "Miora",
    password: "1234",
    token: "token123",
    data: { name: "Alice", age: 25 },
  },
  {
    username: "Sedra",
    password: "5678",
    token: "token456",
    data: { name: "Bob", age: 30 },
  },
];

// Fonction pour simuler le login, qui retourne une promesse

function simulateLogin(username, password) {
  //function qui simule une connexion a un serveur le simuleLogin prend en parametre un username et un password
  return new Promise(function (resolve, reject) {
    // On fait semblant que ça prend du temps (comme un vrai serveur)
    setTimeout(function () {
      // On cherche l'utilisateur dans notre "base de données"
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          // Si on trouve, on retourne le token
          resolve(users[i].token);
          return;
        }
      }
      // Si on ne trouve pas, on retourne une erreur
      reject(new Error("Mauvais identifiants")); // reject est appele pour indiquer que la promesse a echoue; lE new Error permet de creer un objet erreur avec un message, rôles crucial pour la gestion des erreurs
    }, 1000); // 1 seconde de délai
  });
}

// Fonction pour obtenir les données utilisateur
function getUserData(token) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      for (let i = 0; i < users.length; i++) {
        if (users[i].token === token) {
          resolve(users[i].data);
          return;
        }
      }
      reject(new Error("Token invalide"));
    }, 800); // 0.8 seconde de délai
  });
}

// 3) Fonction principale avec async/await
async function main() {
  // ici on utilise le mot cle async pour indiquer que la fonction main est asynchrone et peut utiliser await a linterieur.

  // le async/await permet d'ecrire du code asynchrone de maniere plus lisible et similaire au code synchrone. le try/catch est utilise pour gerer les erreurs qui peuvent survenir lors de l'execution des operations asynchrones.
  try {
    console.log("Début du programme...");

    // On essaie de se connecter
    console.log("Tentative de connexion...");
    const token = await simulateLogin("alice", "1234");
    console.log("Connexion réussie! Token:", token);

    // On attend un peu
    await wait(500);
    console.log("Récupération des données...");

    // On récupère les données
    const data = await getUserData(token);
    console.log("Données récupérées:", data);

    console.log("Tout s'est bien passé!");
  } catch (error) {
    console.log("Erreur:", error.message);
  }
}
/*On utilise async/await pour simplifier la gestion des promesses et rendre le code plus lisible. ses deux mots clés permettent d'écrire du code asynchrone de manière plus lisible et similaire au code synchrone. Un code synchrone est un code qui s'exécute ligne par ligne, sans interruption. */

// On lance le programme
main();
