# Utilisation de l'image de base avec Python
FROM python:3.8-slim

EXPOSE 8090
# Mise à jour des paquets et installation des dépendances nécessaires
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
 && rm -rf /var/lib/apt/lists/*

# Installation de PyTorch avec CUDA (si nécessaire, ajustez la version de PyTorch en fonction de vos besoins)
RUN pip install --upgrade pip

# Création d'un répertoire de travail dans l'image
WORKDIR /app
# Copie de votre code source dans le répertoire de travail de l'image
# COPY . /app
RUN git clone https://github.com/RafffEden/MSPR_TPRE523.git /app

RUN git pull 
RUN pip install -r requirement.txt

# Install OpenSSL
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /Cert

# Generate SSL certificate and key
RUN openssl req -x509 -nodes -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 \
    -subj "/C=US/ST=California/L=San Francisco/O=MyOrg/OU=MyUnit/CN=mydomain.com"

ENV USER Tom

WORKDIR /data
COPY ./MSPR_2_data_docker .
WORKDIR /app

# Commande par défaut pour exécuter votre code au démarrage (à ajuster selon votre configuration)
CMD ["python", "app.py"]