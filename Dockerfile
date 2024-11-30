FROM  node:20

WORKDIR /home/app/fiverr

COPY package*.json ./

RUN npm install

COPY  prisma ./prisma

RUN  npx prisma generate

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "start:prod" ]