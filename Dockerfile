FROM node:alpine
ENV NODE_ENV=development
WORKDIR /fronttarefa
COPY . /app
RUN npm install --development && mv node_modules ../
COPY . .
EXPOSE 4200
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
