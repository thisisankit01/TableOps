FROM node:slim
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
EXPOSE 3000

# Set environment variables
ENV PORT=3000

CMD npm start

