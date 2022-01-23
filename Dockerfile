FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY ./prisma/schema.prisma ./prisma/
RUN npx prisma generate

COPY . . 

EXPOSE 3030

CMD ["npm", "run", "dev"]