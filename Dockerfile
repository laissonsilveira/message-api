FROM node:10-alpine
LABEL autor="Laisson R. Silveira [laisson.r.silveira@gmail.com.br]"
LABEL description="API de mensageria"
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install --production
COPY . .
COPY --chown=node:node . .
USER node
EXPOSE 9090
CMD ["npm", "start"]