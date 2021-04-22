# Avoiding Common Attacks

## Bugs logiques, appels récursifs et réentrance
Des tests unitaires ont été créés pour vérifier que le comportement du contrat est conforme aux attentes. Il suffit de lancer la commande `truffle test`. Les normes et les meilleures pratiques de Solidity ont été prises en compte lors du développement des contrats, en utilisant largement la documentation de Solidity comme guide.

Les appels de fonctions externes ont été sécurisés par l'utilisation de `modifiers`, `require()` pour tester les conditions et lancer des exceptions et `revert()` pour se protéger contre les comportements inattendus et les appels récursifs.

## Tx.origin
`msg.sender` a été utilisée dans les contrats pour faire référence à celui qui appelle la fonction. `tx.origin` n'est pas recommandé car les développeurs d'Ethereum ont déclaré publiquement qu'il n'est pas pertinent et qu'il est peu probable qu'il soit utilisable donc nous ne l'avons pas utilisé dans les contrats.

## Utilisation d'interface
Certaines fonctions prennent comme argument des adresses de contrats. Dans ces cas  là nous passons par des interfaces plutôt que par une adresse brut. Si la fonction est appelée ailleurs dans le code, le compilateur fournira des garanties de sécurité supplémentaires.
