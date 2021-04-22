# Design Pattern Desicions

Ce document explique les modèles de conception choisis et la raison du choix. 

## Vue d'ensemble

Notre pattern est basée sur des micro-services, permettant une séparation des responsabilités en différents services au sein d’une même entité.

## Diagramme d'architecture

![Architecture Diagram](https://i.ibb.co/RgdkM77/Untitled-Diagram-1.png "architecture diagram")

Le diagramme ci-dessus représente les éléments majeurs qui compose le système réalisé. Leur fonctionnement et leurs interactions sont expliquées plus en profondeur ci-dessous.

### Marketplace UI

Ceci est tout simplement l’interface graphique par lequel les utilisateurs vont pouvoir acheter et vendre des NFTs sur la plateforme. Il n’y a absolument aucune logique métier ou voir très peu d'interaction directe avec la blockchain.

### Redux

Redux permet une gestion de “states globaux” et de pallier les faiblesses des props qui ne sont accessibles qu’en lecture seule ou des states qui sont liés à un unique composant, et donc seulement localement notamment pour la librairie web3 et l'instance des smarts contracts.

### RESTful API

C’est  dans  ce  service  que  se  trouve toute  la  gestion des NFTs, des transactions et des interactions principales avec la blockchain. En cas de refonte de l'UI (changement de techno front, développement mobile), ce service est toujours fonctionnel, ce qui nous permet d'avoir une certaine flexibilité.

### API Pinata Cloud

Pinata Cloud, grâce à son API, nous permet facilement d'uploader et de gérer les fichiers (images, métadonnées..etc) stockés sur IPFS. 

### IPFS

IPFS applique le principe du téléchargement Bittorrent à tout ce qui constitue le web. Si vous consultez une page web ou un fichier en IPFS, les ressources seront récupérés bloc par bloc chez d’autres utilisateurs d’IPFS. Ce qui permet de ne plus dépendre d'un serveur centralisé ni d'un prestataire susceptible de disparaître du jour au lendemain.

### Matic Network

Le réseau Matic est une solution de couche 2 et permet de bénéficier de faibles frais de transactions notamment pour le mint et les principales transactions.

### Blockchain

La blockchain est là pour s'assurer de l'authenticité des NFTs et de la sécurité des transactions.

## Perspective d'évolution
- Lorsque l’API demande des données, les demandes sont envoyées à IPFS. Une base de donnée pourrait contenir un réplica des métadonnées et données on-chain qui fournit des informations relatives aux NFTs. Les demandes renverraient les données requises à partir du réplica afin de réduire la latence des requêtes.

- Ajouter une couche à Redux, Drizzle, pour maintenir les contrats dans le store est resté "frais en data" sans multiplier les requêtes

- Revenir sur le réseau Mainet 