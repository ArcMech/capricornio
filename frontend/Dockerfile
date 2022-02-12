FROM node:14.17.1

LABEL version="1.0"
LABEL description="Capricornio frontend react app."

WORKDIR /frontend

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]