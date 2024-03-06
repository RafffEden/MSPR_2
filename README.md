# Titre du projet
MSPR TPRE21 E61 Créer un modèle de données d'une solution I.A en utilisant des méthodes de Data sciences

## 🎯 Contexte & cahier des charges
Dans le cadre de la formation Développeur IA de l'École EPSI à Rennes, il nous est demandé de réaliser des mises en situation professionnelle dans lesquelles on nous demande en équipe de réaliser des projets. 

Pour ce projet, il nous ait demandé de réaliser un processus ETL répondant au besoin d'une solution IA 

#### Situation
WildLens est une association française engagée dans la protection animale dans les régions sauvages. Elle collecte des fonds pour financer ses actions et mène des campagnes de sensibilisation en forêt pour informer le public sur les enjeux de la conservation de la faune sauvage.

L’association souhaite tirer parti des nouvelles technologies pour sensibiliser davantage le public sur la nature qui nous entoure. WildLens veut développer une application d'identification des traces de pas pour sensibiliser le public à la préservation de la faune sauvage de façon ludique, en leur montrant les empreintes laissées par ces animaux dans leur habitat naturel. Chaque utilisateur pourra ainsi scanner les empreintes qu’il croise, afin de connaître l’animal qui l’a laissée et accéder à quelques informations intéressantes.

Cette application permettra en outre de recueillir des données précises sur les animaux, telles que leur fréquence de passage et leur emplacement, qui pourraient être utiles pour suivre leur évolution et établir des plans de préservation efficaces.

#### Cahier des charges 

- Préparation d'un jeu de données d'entrainement-validation-test 
- Modélisation et création des bases de données 
- Création du script/requête de récuperation des infos complémentaires d'une espèce
- Création du premier script/requête d'écriture des données recueillies

## 🤼‍♀️ Cas d'utilisation 

- L'utilisateur peut envoyer une requête à l'API afin d'obtenir une prédiction sur la classe d'une image qu'il aura choisie.
- L'utilisateur peut aussi envoyer une requête afin d'obtenir les informations reliée à la prédiction donnée.
- L'utilisateur peut également lancer le script de l'ETL afin d'extraire les données du modèles.


## 📊 Diagrammes de conception

![Diagramme de conception](/images_readme/Diagramme_conception.png "Diagramme de conception")

- Les images du jeu de données d'entraînement sont d'abord traitées avec un script python, utilisant la librairie pandas, afin d'obtenir un dataset ( Data.csv ) exploitable par le modèle de machine learning. Les données sont ensuite séparées en jeux de test et d'entrainement pour alimenter le modèle.

- L'API peut quand à elle récupérer la nouvelle image envoyée par l'utilisateur pour en faire une prédiction grâce au modèle et donner le résultat à l'utilisateur, accompagné des informations complémentaires liées à la prédiction issues de infos_espèces.CSV.

## 📂 Arborescence du projet
L'arborescence du projet ce compose comme suit :
```bash
.
├── Api.py
├── Data
│   ├── data.csv
│   └── data_no_labeled.csv
├── Design
│   ├── logo_blanc.png
│   ├── logo_vert.png
│   └── wildaware-high-resolution-color-logo.png
├── Mammiferes
│   ├── Castor
│   │   └── images
│   ├── Chat
│   │   └── images
│   ├── Chien
│   │   └── images
│   ├── Coyote
│   │   └── images
│   ├── Ecureuil
│   │   └── images
│   ├── Lapin
│   │   └── images
│   ├── Loup
│   │   └── images
│   ├── Lynx
│   │   └── images
│   ├── Ours
│   │   └── images
│   ├── Puma
│   │   └── images
│   ├── Rat
│   │   └── images
│   ├── Raton laveur
│   │   └── images
│   └── Renard
│       └── images
├── README.md
├── Script_ETL.py
├── Upload
│   └── uploaded_image.png
├── infos_especes.csv
└── requirement.txt
```
## ✅ Pré-requis 
Afin que ce projet fonctionne voici mes listes des pre-requis necessaire: 
- Python 3.10 minimum 
- flask
- pandas
- utillc
- python-dotenv
- opencv-python
- scikit-image
- scikit-learn

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
git clone https://github.com/RafffEden/MSPR_TPRE521.git
```
Cette commande va télécharger le projet dans votre dossier ensuite tapé :
```bash
cd MSPR_TPRE521
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


## 🧑‍💻 Auteur(s)
TARLET Tom
MONTEIRO MATOS Rafael
