FROM node:14.17.1

LABEL version="1.0"
LABEL description="Capricornio backend API."

WORKDIR /backend

COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .

EXPOSE 8000

CMD ["npm", "start"]


