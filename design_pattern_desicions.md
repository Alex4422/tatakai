# Design Pattern Desicions

## Security Patterns

### Access Restriction
Les fonctions du contrat ont été resteintent selon des critères appropriés. 

La documentation de Solidity recommande l'utilisation de `require()` pour tester des conditions et lancer des exceptions.

![mintNFT() function](https://i.ibb.co/MgxHCCz/code.png "mintNFT() function")

L'utilisation de modifiers rajoutent une couche de sécurité supplémentaire, ils portent des noms explicites afin de faciliter leur réutilisabilité et la lisibilité du code.

![onlyMarketplace() modifier](https://i.ibb.co/jbGZDq2/code2.png "onlyMarketplace() modifier")
![onlyNFTOwner() modifier](https://i.ibb.co/kq9KKPg/code3.png "onlyNFTOwner() modifier")


### Emergency Stop

Tous les contrats ont un mécanisme d'arrêt d'urgence pour arrêter toutes les fonctionnalités sensible au contrat, dès qu'un problème de sécurité est découvert. Ce qui permet de laisser le temps nécessaire pour rechercher une solution adéquate et éventuellement mettre à jour les contrats afin de corriger la faille de sécurité.

![_pause() function](https://i.ibb.co/SPBb0J0/code4.png "_pause() function")

### Secure Ether Transfer

Le tableau suivant donne un aperçu des différences entre les trois méthodes :

| Function       | Amount of Gas Forwarded | Exception Propagation  |
| :------------- |-------------:| -----:|
| send      | 2300 (not adjustable) | `false`on failure |
| call.value      | all remaining gas (adjustable)      |   `false`on failure |
| transfer | 2300 (not adjustable)      |    throws on failure |

Le contrat Marketplace utilise la méthode `transfer()` pour faire des transactions. Cette méthode a été choisie en raison de ses fonctions de sécurité intégrées, qui permettent de `revert()` les transactions ayant échoué et de lancer des exceptions en cas d'échec.

![_pause() function](https://i.ibb.co/8YJyyxt/code5.png "_pause() function")
