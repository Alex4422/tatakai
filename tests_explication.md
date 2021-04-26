# Test Explication

Ce document explique les tests écrits et pourquoi on les a écrit.

## Introduction

Nous avons 2 fichiers de test :

- Faucet.test.js
- Marketplace.test.js

Nous avons effectués des tests end-to-end (de bout en bout) afin de vérifier que nos contrats fonctionnent comme prévue du début jusqu'à la fin.
[![Units Test](https://i.ibb.co/0y8mXy9/units-test.png)](https://i.ibb.co/0y8mXy9/units-test.png)

### Faucet.test.js
**Request TAK Token**
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
```sh
describe("Request TAK Token")
```
**Description :** Simulation d'une demande de Tak Token via un faucet.
**Raison :** Vérifier que la demande de Tak via le faucet fonctionne et est uniquement possible pour le propriétaire de la marketplace et non pour les utilisateurs.
```sh
it("should revert if user request tak token")
```
- On vérifie si la fonction `requestToken()` revert si elle est utilisé par un utilisateur lambda.
```sh
it("should revert if user not waited")
```
- On vérifie si la fonction `requestToken()` revert si la personne n'a pas attendu 30 minutes après la première demande.


### Marketplace.test.js

**Swap Token**
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

```sh
describe("Swap Token")
```
**Description :** Simulation d'un swap entre ETH/TAK (Le TAK étant la monnaie d'échange de la plateforme). 
**Raison :** Vérifier que le swap fonctionne, que les balances sont bien mis à jour.

```sh
it("should swap token")
```

- On vérifie les balances de la marketplace en ETH et en TAK, pareillement pour l'utilisateur voulant effectué le swap.
- On effectue le swap
- On vérifie si les balances ont bien été mis à jour.


**Mint NFT**
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

```sh
describe("Mint NFT")
```
**Description :** Simulation d'un mint.
**Raison :** Vérifier que le mint fonctionne et est réservé uniquement au propriétaire de la marketplace.

```sh
it("should mint NFT")
```
- Le propriétaire de la marketplace effectue le mint d'un NFT.
- On vérifie si l'event `ItemCreated` à bien été émis.


```sh
it("should revert if not admin)
```
- Un utilisateur quelconque effectue le mint d'un NFT.
- On vérifie si un la fonction `revert()`.

```sh
describe("Setting NFT Price")
```
**Setting NFT Price**
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
```sh
it("should set nft price")
```
- Un utilisateur affecte un nouveau prix à son NFT dont il est propriétaire.
- On vérifie que l'event `SetNewPrice` a bien été émis.

```sh
it("should revert if setPrice() caller is not nft owner")
```
- Un utilisateur affecte un nouveau prix à un NFT dont il n'est propriétaire.
- On vérifie si la fonction `revert()`.

```sh
it("should get new price")
```
- On récupère le nouveau prix qui a été affecté par son propriétaire.
- On vérifie si le prix a bien été affecté et que la valeur est correcte.

**Buy and transfer NFT**
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
```sh
describe("Buy and transfer NFT")
```
**Description :** Simulaton de mise en vente NFT, achat puis revente.
**Raison :** Vérifier que la mise en vente de NFT, et l'achat/revente de NFT fonctionne, que le NFT change bien de propriétaire et que les balances sont mis à jour.

```sh
it("should put card on sale")
```
- Le propriétaire du NFT met en vente sa carte.
- On vérifie que l'event `PutOnSale` a bien été émis.

```sh
it("should revert if putOnSale() called a second time")
```
- Le propriétaire du NFT remet en vente sa carte.
- On vérifie que la fonction `revert()`

```sh
it("should revert if putOnSale() caller is not nft owner")
```
- Un utilisateur quelconque met en vente une carte dont il n'est pas propriétaire.
- On vérifie que la fonction `revert()`

```sh
it("should buy and transfer NFT from marketplace")
```
- Un utilisateur quelconque achète le NFT.
- On vérifie l'achat en controlant les balances en Tak Token avant et après l'achat
- On vérifie que le NFT a bien changer de propriétaire. 
- On vérifie que l'event `BuyTransaction` a bien été émis.

```sh
it("should re-put card on sale")
```
- Le nouveau propriétaire du NFT remet en vente la carte.
- On vérifie que l'event `PutOnSale` a bien été émis.

```sh
it("should buy and transfer NFT from user")
```
- Un utilisateur quelconque rachète le NFT.
- On vérifie l'achat en controlant les balances en Tak Token avant et après l'achat
- On vérifie que le NFT a bien changer de propriétaire. 
- On vérifie que l'event `BuyTransaction` a bien été émis.

```sh
it("should check if card has been remove on sale")
```
- On vérifie que la carte n'est plus en vente après le dernier achat.

```sh
it("should revert if removeOnSale() caller is not nft owner")
```
- Un utilisateur quelconque retire de la vente une carte dont il n'est pas propriétaire.
- On vérifie que la fonction `revert()`


```sh
it("should revert if user trying buy a card not for sale")
```
- Un utilisateur quelconque essaie d'acheter la carte qui n'est plus en vente.
- On vérifie que la fonction `revert()`.

