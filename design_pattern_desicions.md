# Design Pattern Desicions

Ce document explique les modèles de conception choisis et la raison du choix. 

## Vue d'ensemble

Notre pattern est basée sur des micro-services, permettant une séparation des responsabilités en différents services au sein d’une même entité.

## Diagramme d'architecture

![Architecture Diagram](https://i.ibb.co/HPkBSyW/Architecture-Diagram-3.png "architecture diagram")

Le diagramme ci-dessus représente les éléments majeurs qui compose le système réalisé. Leur fonctionnement et leurs interactions sont expliquées plus en profondeur ci-dessous.

### Marketplace UI

Ceci est tout simplement l’interface graphique par lequel les utilisateurs vont pouvoir acheter et vendre des NFTs sur la plateforme. Il n’y a absolument aucune logique métier ou voir très peu d'interaction directe avec la blockchain.

### RESTful API

C’est  dans  ce  service  que  se  trouve toute  la  gestion des NFTs,  des transactions et des interactions principales avec la blockchain. 

### IPFS

Les images et les métadonnées des NFTs sont stockés sur IPFS, un stockage décentralisé.

### Blockchain

La blockchain est là pour s'assurer de l'authenticité des NFTs et de la sécurité des transactions.

## Perspective d'évolution
- Lorsque l’API demande des données, les demandes sont envoyées à IPFS. Une base de donnée pourrait contenir un réplica des métadonnées et données on-chain qui fournit des informations relatives aux NFTs. Les demandes renverraient les données requises à partir du réplica afin de réduire la latence des requêtes.
- 