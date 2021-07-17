# Tatakai Marketplace

![Tatakai Logo](./client/src/assets/logo_full_bgnoir.png "Tatakai Logo")

## Sommaire

- [Introduction](https://github.com/lorcannrauzduel/tatakai/blob/main/README.md#introduction)
- [Fonctionnalités](https://github.com/lorcannrauzduel/tatakai/blob/main/README.md#fonctionnalit%C3%A9s)
- [Installation & Lancement](https://github.com/lorcannrauzduel/tatakai/blob/main/README.md#installation--lancement)
   - [Lancer un client Ethereum](https://github.com/lorcannrauzduel/tatakai/blob/main/README.md#lancer-un-client-ethereum)
   - [Déployer les contrats](https://github.com/lorcannrauzduel/tatakai/blob/main/README.md#d%C3%A9ployer-les-contrats)
   - [Installer les dépendances](https://github.com/lorcannrauzduel/tatakai/blob/main/README.md#installer-les-d%C3%A9pendances)
   - [Lancer les tests](https://github.com/lorcannrauzduel/tatakai/blob/main/README.md#lancer-les-tests)
   - [Lancer la DApp](https://github.com/lorcannrauzduel/tatakai/blob/main/README.md#lancer-la-dapp)
- [Demo](https://github.com/lorcannrauzduel/tatakai/blob/main/README.md#demo)
- [Documentation](https://github.com/lorcannrauzduel/tatakai/blob/main/README.md#documentation)
- [Technologies](https://github.com/lorcannrauzduel/tatakai/blob/main/README.md#technologies)
- [Perspective d'évolution](https://github.com/lorcannrauzduel/tatakai/blob/main/README.md#perspective-d%C3%A9volution)


## Introduction

Tatakai propose l’achat-vente de NFT à l’effigie de combattant professionnels pluridisciplinaire avec une gamification autour de leur actualité via une scoremap exclusive et innovante.

## Fonctionnalités

- Mint de NFTs
- Achat-vente de NFTs avec ERC-20 (TAK)
- Swap ETH/TAK

## Installation & Lancement

### Lancer un client Ethereum
L'utilisation de Ganache est **recommandé**, téléchargez [Ganache] et lancez l'application. Cela lancera une blockchain local sur le port 7545.

Ou vous pouvez utiliser Ganache-CLI (s'il n'est pas encore installé) avec `npm install -g ganache-cli` puis `ganache-cli` qui fonctionnera sur le port 8545.

### Déployer les contrats
Déployer les contrats sur Ganache.

```sh
truffle deploy --network develop
```

### Installer les dépendances
Lancez les commandes suivantes dans le terminal :
```sh
cd server
npm install
cd ..
cd client
npm install
```

### Lancer les tests
```sh
truffle test
```

[![Units Test](https://i.ibb.co/7pTfH8r/units-test.png)](https://i.ibb.co/7pTfH8r/units-test.png)

### Lancer la DApp
Dans un premier terminal, lancez les commandes suivantes pour démarrer le serveur :
```sh
cd server
node index.js
```
Puis, dans un second terminal, lancez les commandes suivantes pour démarrer React :
```sh
cd client
npm start
```

## Demo

[https://tatakai-marketplace.herokuapp.com]

   [https://tatakai-marketplace.herokuapp.com]: <https://tatakai-marketplace.herokuapp.com>

## Documentation

Informations générales:
- [avoiding_common_attacks.md] : Ce document explique les mesures de sécurité qui ont été prises.
- [deployed_addresses.md] : Ce document renseigne les addresses de nos smart contrats déployés.
- [design_pattern_desicions.md] : Ce document explique les modèles de conception choisis et la raison du choix.
- [tests_explication.md] : Ce document explique les tests écrits et pourquoi on les a écrit.

Smart Contrat :
- [CardItem.md] : Readme du contrat CardItem.sol
- [Faucet.md] : Readme du contrat Faucet.sol
- [Marketplace.md] : Readme du contrat Marketplace.sol
- [TakToken.md] : Readme du contrat TakToken.sol

   [avoiding_common_attacks.md]: <https://github.com/lorcannrauzduel/tatakai/blob/main/avoiding_common_attacks.md>
   [deployed_addresses.md]: <https://github.com/lorcannrauzduel/tatakai/blob/main/deployed_addresses.md>
   [design_pattern_desicions.md]: <https://github.com/lorcannrauzduel/tatakai/blob/main/design_pattern_desicions.md>
   [tests_explication.md]: <https://github.com/lorcannrauzduel/tatakai/blob/main/tests_explication.md>
   
   [CardItem.md]: <https://github.com/lorcannrauzduel/tatakai/blob/main/docs/CardItem.md>
   [Faucet.md]: <https://github.com/lorcannrauzduel/tatakai/blob/main/docs/Faucet.md>
   [Marketplace.md]: <https://github.com/lorcannrauzduel/tatakai/blob/main/docs/Marketplace.md>
   [TakToken.md]: <https://github.com/lorcannrauzduel/tatakai/blob/main/docs/TakToken.md>

## Technologies

- [Truffle Suite] - Framework de développement Ethereum. Il permet d'interfacer des smart contracts avec du code JavaScript et l'ensemble de l'écosystème NodeJS.
- [React] - Bibliothèque JavaScript open-source qui est utilisée pour construire des interfaces utilisateur spécifiquement pour des applications d'une seule page. 
- [Material UI] - Librairie de composants React qui implémentent les guidelines de Google en terme de Material Design que l’on retrouve dans les interface des applications Google comme Gmail, Google Photos ou encore dans les applications Android.
- [Node.js] - Environnement d'exécution permettant d’utiliser le JavaScript côté serveur. 
- [Express] - Framework pour construire des applications web basées sur Node.js
- [IPFS] - Protocole P2P permettant de décentraliser l'hébergement de fichiers.
- [Pinata Cloud] - API qui permet de stocker et de gérer des fichiers sur IPFS.
- [Matic Network] - Solution de seconde couche d’Ethereum.


   [Pinata Cloud]: <https://pinata.cloud/>
   [IPFS]: <https://ipfs.io/>
   [Matic Network]: <https://matic.network/>
   [Node.js]: <http://nodejs.org>
   [Express]: <http://expressjs.com>
   [React]: <https://fr.reactjs.org/>
   [Truffle Suite]: <https://www.trufflesuite.com/>
   [Material UI]: <https://material-ui.com/>
   [Ganache]: <https://truffleframework.com/ganache>

## Perspective d'évolution

- Mise en place de la gamification sous forme de pari. Sur une période donnée, l'utilisateur aura la possibilité de parier sur les prochains matchs de trois de ses combattants qu'il possède dans son deck. Ainsi il mettra ses cartes en jeu, lui donnant le droit de parier sur ses combattants, il sera alors en mesure de spécifier plus précisément sur les combats à venir (victoire par KO, numéro de round, ...) pour augmenter son indice de difficulté. Si le joueur possède des cartes rares/légendaires ou unique, son indice de difficulté sera augmenté en fonction. A l'issu de la période de pari, une grille de récompense offrira les gains associés en fonction du classement de l'utilisateur. Il pourra ainsi remporter des cartes uniques ou encore simplement des TAK Token.

## Auteurs
- [Lorcann RAUZDUEL]
- [Stéphane Spassevitch]
- [Sandy Ludosky]

   [Lorcann RAUZDUEL]: <https://www.linkedin.com/in/lorcann-rauzduel-271738163/>
   [Sandy Ludosky]: <https://www.linkedin.com/in/sandyludosky/>
   [Stéphane Spassevitch]: <https://github.com/Makariudo>
