# Utilisation de l'image de base avec Python
FROM python:3.8-slim

EXPOSE 8080
# Mise à jour des paquets et installation des dépendances nécessaires
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
 && rm -rf /var/lib/apt/lists/*

# Installation de PyTorch avec CUDA (si nécessaire, ajustez la version de PyTorch en fonction de vos besoins)
RUN pip install --upgrade pip

RUN pip install torch torchvision torchaudio


# Création d'un répertoire de travail dans l'image
WORKDIR /app

# Copie de votre code source dans le répertoire de travail de l'image
# COPY . /app
RUN git clone https://github.com/RafffEden/MSPR_2.git /app

RUN pip install -r requirement.txt
# Commande par défaut pour exécuter votre code au démarrage (à ajuster selon votre configuration)
CMD ["python", "server.py"]