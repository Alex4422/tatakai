# Test Explication

Ce document explique les tests écrits et pourquoi on les a écrit.

## Introduction

Nous avons 2 fichiers de test :

- Marketplace.test.js
- Faucet.test.js

### Marketplace.test.js

```sh
describe("Swap Token")
```
**Scénario :** Swap Token
**Description :** Ce scénario simule un swap entre ETH/TAK (Le TAK est la monnaie d'échange de la plateforme). 
**Raison :** Vérifier que le swap fonctionne, que les balances sont bien mis à jour.

```sh
it("should swap token")
```

- On vérifie les balances de la marketplace en ETH et en TAK, pareillement pour l'utilisateur voulant effectué le swap.
- On effectue le swap
- On vérifie si les balances ont bien été mis à jour.
```sh
describe("Mint NFT")
```
**Scénario :** Mint NFT
**Description :** Ce scénario simule un simple mint et un premier achat dun utilisateur quelconque de ce NFT qui vient d'être minter par la marketplace, puis un achat qui provient de la revente de ce dernier.
**Raison :** Vérifier que le mint fonctionne et est réservé uniquement au propriétaire de la marketplace.

```sh
it("should mint NFT")
```
- Le propriétaire de la marketplace effectue le mint d'un NFT
- On vérifie si l'event à bien été émis.


```sh
it("should revert if not admin)
```
- Un utilisateur effectue le mint d'un NFT
- On vérifie si un la fonction revert().

```sh
describe("Buy and transfer NFT")
```
**Scénario :** Buy and transfer NFT
**Description :** Ce scénario simule achat d'un utilisateur quelconque de ce NFT qui vient d'être minter par la marketplace (dans le test précedent), puis un achat qui provient de la revente de ce dernier.
**Raison :** Vérifier l'achat/revente de NFT fonctionne, que le NFT change bien de propriétaire et que les balances sont mis à jour.

```sh
it("should buy and transfer NFT from marketplace")
```
- On vérifie l'achat en controlant les balances en Tak Token avant et après l'achat
- On vérifie que le NFT a bien changer de propriétaire. 
- On s'assure également que l'event qui provient de l'achat de NFT a bien été émis.

```sh
it("should buy and transfer NFT from user")
```
- On vérifie que ce nouveau propriétaire a bien la possibilité de remettre en vente son NFT en simulant un achat qui provient d'un autre utilisateur comme dans le précedent test.

### Faucet.test.js

```sh
describe("Request TAK Token")
```
**Scénario :** Request TAK Token
**Description :** Ce scénario simule une demande de Tak Token via un faucet. Il nous permet d'être sûr que 
**Raison :** Vérifier que la demande de Tak via le faucet fonctionne et est uniquement possible pour le propriétaire de la marketplace et non pour les utilisateurs.
```sh
it("should revert if user request tak token")
```
- On vérifie si la fonction `requestToken()` revert si elle est utilisé par un utilisateur lambda.
```sh
it("should revert if user not waited")
```
- On vérifie si la fonction `requestToken()` revert si la personne n'a pas attendu 30 minutes après la première demande.

