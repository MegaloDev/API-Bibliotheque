# API Bibliothèque

## 1. Présentation du projet

**API Bibliothèque** est une API REST développée avec Node.js, Express et MongoDB. Elle permet de gérer les auteurs, les livres et les emprunts d'une bibliothèque.

Le projet a été réalisé dans le cadre du cours **Technologies pour les applications Client-Serveur**.

## 2. Technologies utilisées

- Node.js : environnement d'exécution JavaScript.
- Express.js : création de l'API REST.
- MongoDB : base de données NoSQL.
- Mongoose : communication avec MongoDB.
- JWT (jsonwebtoken) : authentification par token.
- bcryptjs : hachage et vérification des mots de passe.
- Swagger UI : documentation interactive de l'API.
- Postman : tests des endpoints.

## 3. Prérequis

Avant d'installer le projet, il faut disposer de :

- Node.js et npm.
- MongoDB.
- Git (facultatif).

## 4. Installation

Cloner le dépôt :

```bash
git clone https://github.com/MegaloDev/API-Bibliotheque/commit/afc27d03f053f672998abb03af906e041f42a0c8
```

Accéder au projet :

```bash
cd API_Bibliotheque
```

Installer les dépendances :

```bash
npm install
```

## 5. Configuration

Créer un fichier `.env` à la racine du projet en s'inspirant de `.env.example`.

Exemple :

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bibliotheque
JWT_SECRET=votre_secret_jwt
JWT_EXPIRES_IN=1d
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=votre_hash_bcrypt
```

**Important :**
- Remplacer `votre_secret_jwt` par une clé secrète générée de manière aléatoire.
- Remplacer `votre_hash_bcrypt` par le hash bcrypt du mot de passe administrateur.
- Ne jamais publier le fichier `.env` ni partager les secrets.

Pour générer un secret JWT :

```bash
openssl rand -hex 32
```

Pour générer un hash bcrypt :

```bash
node -e "require('bcryptjs').hash('VotreMotDePasse', 10).then(console.log)"
```

## 6. Démarrage du projet

Démarrer MongoDB, puis lancer l'API en mode développement :

```bash
npm run dev
```

Ou en mode normal :

```bash
npm start
```

L'API est accessible à l'adresse :

```text
http://localhost:5000
```

## 7. Documentation Swagger

La documentation interactive est disponible à :

```text
http://localhost:5000/api-docs
```

Elle permet de consulter les endpoints, leurs paramètres, les schémas de données et de tester les requêtes.

Le fichier de documentation OpenAPI se trouve dans :

```text
docs/openapi.yaml
```

## 8. Endpoints de l'API

Toutes les routes ci-dessous sont préfixées par `http://localhost:5000`.

### Authentification

| Méthode | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Connexion administrateur |

### Auteurs

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/api/authors` | Lister les auteurs |
| POST | `/api/authors` | Créer un auteur |
| GET | `/api/authors/:id` | Consulter un auteur |
| PUT | `/api/authors/:id` | Modifier un auteur |
| DELETE | `/api/authors/:id` | Supprimer un auteur |

### Livres

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/api/books` | Lister les livres |
| POST | `/api/books` | Créer un livre |
| GET | `/api/books/:id` | Consulter un livre |
| PUT | `/api/books/:id` | Modifier un livre |
| DELETE | `/api/books/:id` | Supprimer un livre |

### Emprunts

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/api/borrows` | Lister les emprunts |
| POST | `/api/borrows` | Créer un emprunt |
| PATCH | `/api/borrows/:id/return` | Enregistrer le retour d'un livre |

**Authentification :** les routes protégées nécessitent un token JWT dans l'en-tête HTTP :

```text
Authorization: Bearer VOTRE_TOKEN
```

## 9. Tests avec Postman

Les fichiers Postman sont disponibles dans le dossier `postman/` :

- `API_Bibliotheque.postman_collection.json`
- `API_Bibliotheque_Dev.postman_environment.json`
- `API_Bibliotheque_Prod.postman_environment.json`

Pour exécuter les tests :

1. Ouvrir Postman.
2. Importer la collection JSON.
3. Importer l'environnement Dev.
4. Sélectionner l'environnement Dev.
5. Exécuter la collection avec Collection Runner.

La collection contient des tests pour l'authentification, les auteurs, les livres et les emprunts.

## 10. Structure du projet

```text
API_Bibliotheque/
├── docs/
│   └── openapi.yaml
├── postman/
│   ├── API_Bibliotheque.postman_collection.json
│   ├── API_Bibliotheque_Dev.postman_environment.json
│   └── API_Bibliotheque_Prod.postman_environment.json
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── app.js
│   └── server.js
├── tests/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 11. Format des réponses

Les réponses de l'API utilisent une structure JSON commune :

```json
{
  "success": true,
  "data": {},
  "message": "Opération réussie"
}
```

Le champ `success` indique si l'opération a réussi, `data` contient les données retournées et `message` fournit une description du résultat.

---

**Projet : API Bibliothèque**  
**Cours : Technologies pour les applications Client-Serveur**
