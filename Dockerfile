FROM node:lts-alpine

# installe un simple serveur http pour servir un contenu statique
RUN npm install -g http-server

# définit le dossier 'app' comme dossier de travail
WORKDIR /app


# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY ./dist ./dist


EXPOSE 8080
CMD [ "http-server", "dist" ]

#npm install -g @vue/cli
#npm install
#npm run build
#docker build -t mhw_vi .
#docker run -it -p 8012:8080 --rm --name mhw mhw_VI