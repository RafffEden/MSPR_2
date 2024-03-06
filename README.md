# MSPR TPRE523

Produire et maintenir une solution I.A

## 🎯 Contexte & cahier des charges
Dans le cadre de la formation Développeur IA de l'École EPSI à Rennes, il nous est demandé de réaliser des mises en situation professionnelle dans lesquelles on nous demande en équipe de réaliser des projets. 

Pour ce projet, il nous ait demandé de produire une application exploitant un modèle de machine learning.

#### Situation
WildLens est une association française engagée dans la protection animale dans les régions sauvages. Elle collecte des fonds pour financer ses actions et mène des campagnes de sensibilisation en forêt pour informer le public sur les enjeux de la conservation de la faune sauvage.

L’association souhaite tirer parti des nouvelles technologies pour sensibiliser davantage le public sur la nature qui nous entoure. WildLens veut développer une application d'identification des traces de pas pour sensibiliser le public à la préservation de la faune sauvage de façon ludique, en leur montrant les empreintes laissées par ces animaux dans leur habitat naturel. Chaque utilisateur pourra ainsi scanner les empreintes qu’il croise, afin de connaître l’animal qui l’a laissée et accéder à quelques informations intéressantes.

Cette application permettra en outre de recueillir des données précises sur les animaux, telles que leur fréquence de passage et leur emplacement, qui pourraient être utiles pour suivre leur évolution et établir des plans de préservation efficaces.

#### Cahier des charges 

- un back-end conteneurisé
- un front-end
- Présence des 3 fonctionnalités attendues :
      - Classification d’une photo
      - Affichage des informations sur l’espèce reconnue
      - Recueil des données de prise de photo
- Travail sur un outil de versioning
- Livraison d’une documentation

## 🤼‍♀️ Cas d'utilisation 

- L'utilisateur peut prendre une photo afin d'obtenir une prédiction sur sa classe
- L'utilisateur peut ensuite obtenir des informations complémentaires en fonction de la classe de l'image
- 

## Point sur le jeu de données

le jeu de données et les classes à prédire ont été modifié par rapport au cahier des charges. En effet le jeu de données sur les empreintes d'animaux n'était pas assez fournis et les images n'était pas formatées ( présence de watermark ).

Notre modèle n'était donc pas bien entraîné, ce pourquoi nous avons décidé de changer pour un jeu de données de fruits et légumes disponible ici : https://www.kaggle.com/datasets/kritikseth/fruit-and-vegetable-image-recognition

Ce jeu de donnée nous permet d'entrainer notre modèle de manière plus fiable et donc d'obtenir une prédiction plus satisfaisante.

## 📊 Diagrammes de conception

![Diagramme de conception](/Diagramme_conception.png "Diagramme de conception")

- Les images du jeu de données d'entraînement sont d'abord traitées avec un script python, utilisant la librairie pandas, afin d'obtenir un dataset ( Data.csv ) exploitable par le modèle de machine learning. Les données sont ensuite séparées en jeux de test et d'entrainement pour alimenter le modèle.

- L'API peut quand à elle récupérer la nouvelle image envoyée par l'utilisateur pour en faire une prédiction grâce au modèle et donner le résultat à l'utilisateur, accompagné des informations complémentaires liées à la prédiction issues de infos_espèces.CSV.

- L'utilisateur envoi quand à lui une nouvelle image à prédire grâce à l'application front end.

## 📂 Arborescence du projet
L'arborescence du projet ce compose comme suit :
```bash
.
├── Diagramme_conception.png
├── Dockerfile
├── README.md
├── app.py
├── common
│   ├── image-loader.js
│   ├── imagenet.js
│   └── ndarray-browser-min.js
├── doc
│   ├── accuracy_resnet.png
│   └── example.png
├── requirement.txt
├── static
│   ├── Cert
│   │   ├── cert.pem
│   │   └── key.pem
│   ├── Design
│   │   ├── logo_blanc.png
│   │   ├── logo_vert.png
│   │   └── wildaware-high-resolution-color-logo.png
│   ├── __pycache__
│   │   └── train.cpython-312.pyc
│   ├── infos_especes.csv
│   ├── script.js
│   ├── style.css
│   └── train.py
├── templates
│   └── index.html
└── uploads
    └── uploaded_image.png
```
## ✅ Pré-requis 
Afin que ce projet fonctionne voici mes listes des pre-requis necessaire: 
- Python 3.8 minimum 
- Flask
- Pandas
- torch
- torchvision
- utillc
- matplotlib
- python-dotenv

Vous trouverez plus bas comment obtenir les pre-requis manquants au bon fonctionnement.
## ⚙️ Installation
### Pour Git 
#### Windows 
Installer git via le lien suivant :
https://git-scm.com/download/win

Ouvrez git-bash qui vient de s'installer et grâce aux commandes suivantes rendez-vous dans le dossier ou vous voulez mettre ce projet :
```bash
ls
cd [destination]
```
ls permet de lister les fichiers et dossiers que contient le fichier dans lequel vous vous trouvez.
cd vous permet de vous rendre dans le dossier de destination par exemple :
```bash
cd Documents
```
Cette ligne vous permet de vous rendre dans le dossier *Documents*. 

Rendez-vous donc dans le dossier de votre choix et entrez la commande :
```bash
git clone https://github.com/RafffEden/MSPR_TPRE523.git
```
Cette commande va télécharger le projet dans votre dossier ensuite tapé :
```bash
cd MSPR_TPRE523
```
Pour accéder au dossier du projet.

#### Linux 
Ouvrez un terminal et entrez les instructions suivantes :
```bash
sudo apt-get update
sudo apt install git-all
```
### Pour Python 
Pour pouvoir utiliser ce projet, il est nécessaire d'avoir un environnement python, voici comment l'installer. 

#### Windows
Se rendre sur le lien suivant et télécharger la version la plus récente de python :
https://www.python.org/downloads/

Pensez au moment de lancer l'installation à cocher la case *Ajouter à la variable PATH* !

#### Linux 
Ouvrez un terminal et entrez les instructions suivantes :
```bash
sudo apt-get update
```
puis 

```bash 
sudo apt-get install python
```
### Pour les paquets
Rendez-vous dans le dossier via un terminal (Linux) ou git-bash (Windows) dans lequel vous avez cloné ce dépôt et entrez les commandes : 
```bash
pip install --upgrade pip
pip install -r requirement.txt 
```
Normalement, l'ensemble des paquets requis pour le projet devrait s'installer.

Si ce n'est pas le cas voici un lien qui peut vous aidez :
https://pip.pypa.io/en/stable/installation/

### Générer des certificats 
#### Sous Windows
- Installer OpenSSL : Si vous n'avez pas encore installé OpenSSL sur votre machine Windows, vous pouvez le télécharger depuis le site web d'OpenSSL (https://www.openssl.org/) ou utiliser un gestionnaire de packages comme Chocolatey (choco install openssl).

- Ouvrir l'invite de commandes : Appuyez sur Win + R, tapez cmd, puis appuyez sur Entrée pour ouvrir l'invite de commandes.

- Naviguer vers le répertoire d'installation d'OpenSSL (optionnel) : Si OpenSSL n'est pas dans le PATH de votre système, vous devrez naviguer vers le répertoire d'installation d'OpenSSL en utilisant la commande cd. Par exemple, si OpenSSL est installé dans C:\OpenSSL-Win64\, vous pouvez y accéder en utilisant :

```bash
cd C:\OpenSSL-Win64\
```

- Exécuter la commande OpenSSL : Une fois dans le répertoire d'installation d'OpenSSL ou si OpenSSL est dans le PATH de votre système, vous pouvez exécuter la commande openssl req pour générer le certificat et la clé privée. Voici la commande :

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```

- Cette commande générera une clé privée RSA de 4096 bits (key.pem) et un certificat auto-signé (cert.pem) valable pendant 365 jours.

- Fournir les informations : OpenSSL vous demandera de fournir certaines informations pour générer le certificat. Vous pouvez remplir les informations requises.

- Génération du certificat et de la clé : Après avoir fourni les informations nécessaires, OpenSSL générera les fichiers de certificat (cert.pem) et de clé privée (key.pem) dans le répertoire actuel (ou dans le répertoire spécifié si vous avez navigué vers un emplacement différent).

#### Sous Linux 
Afin que l'application fonctionne, il est necessaire de créer des certificats pour cela entrer dans console BASH la commande suivant au niveau du projet :
```bash
openssl req -x509 -newkey rsa:4096 -keyout Cert/key.pem -out Cert/cert.pem -days 365
```
Suivez les instructions demander et retener bien le PEM pass phrase elle vous sera demander à chaque execution.

## Execution du projet 

### Execution avec Docker 
Lancer le docker que vous avez build avec le dockerfile du projet pour cela ouvrez un terminal et tapper : 

```bash 
docker run [nom_image]
``` 
avec nom_image le nom que vous avez tapper dans le docker build.
Pour accéder à l'application, entrez dans le naviagteur l'ip du docker pour cela aller sur Docker Desktop et chercher votre image comme ceci : 

![Capture Docker](/capture_terminal.png.png "Capture d'écran Docker Desktop")

Vous trouverez la ligne *Running on [addresse IP]* et il vous suffit de taper cette addresse dans votre navigateur et d'autoriser le site si jamais votre navigateur vous bloque à l'ouverture 

### Exectution avec Python 
Pour lancer directement avec python sans passer par docker, il vous faudra avoir votre environnement prêt avec les prérequis plus haut et tapper la commande dans le terminal au niveau du projet :

```bash
python app.py
```

l'application devrait ce lancer et vous demander un PEM pass phrase qui est le mots de passe que vous avez utilisé quand vous avez génére les certificats puis l'application vous dit :

![Capture terminal](/capture_terminal.png "Capture d'écran du terminal d'execution")

maintenant, tappez dans votre navigateur l'addresse en 192.168 afin d'accéder à l'application.


## 🧑‍💻 Auteur(s)
TARLET Tom
MONTEIRO MATOS Rafael
