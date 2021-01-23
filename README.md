# suivi-poste-proxy

> Serveur Proxy pour [suivi-poste-cli](https://github.com/rigwild/suivi-poste-cli)

Un serveur proxy pour permettre aux utilisateurs de [suivi-poste-cli](https://github.com/rigwild/suivi-poste-cli) de ne pas avoir à s'inscrire sur [developer.laposte.fr](https://developer.laposte.fr).

L'IP de l'utilisateur est masquée 🤫.

## Installation

```sh
git clone https://github.com/rigwild/suivi-poste-proxy.git
cd suivi-poste-proxy
yarn
```

## Configuration

```
cp .env.example .env
nano .env
```

## Usage

```
yarn start
```

## Endpoints

Disponible ici: [suivi-poste-proxy.rigwild.dev](https://suivi-poste-proxy.rigwild.dev)

### `GET /_proxy/<tracking_numbers>[?lang=<lang>]`

[`/_proxy/4P36275770836`](https://suivi-poste-proxy.rigwild.dev/_proxy/4P36275770836)

[`/_proxy/4P36275770836?lang=fr_FR`](https://suivi-poste-proxy.rigwild.dev/_proxy/4P36275770836?lang=fr_FR)

[`/_proxy/4P36275770836,4P36275770837,4P36275770838`](https://suivi-poste-proxy.rigwild.dev/_proxy/4P36275770836,4P36275770837,4P36275770838)

[`/_proxy/4P36275770836,4P36275770837,4P36275770838?lang=fr_FR`](https://suivi-poste-proxy.rigwild.dev/_proxy/4P36275770836,4P36275770837,4P36275770838?lang=fr_FR)

## Note

Il faut s'inscrire sur le portail [developer.laposte.fr](https://developer.laposte.fr) pour générer une clef d'[API suivi La Poste](https://developer.laposte.fr/products/suivi/latest).

## Associés
 - [suivi-poste](https://github.com/rigwild/suivi-poste) - API pour ce module
 - [suivi-poste-cli](https://github.com/rigwild/suivi-poste-cli) - CLI pour ce module

## Licence
[Licence MIT](./LICENSE)
