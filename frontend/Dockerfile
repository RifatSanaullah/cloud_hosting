FROM node:18.12.0 as build
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
# COPY package-lock.json ./
RUN npm install
# RUN npm install
COPY . .
RUN npm run build-static-page
# CMD ["npm", "start"]

FROM nginx:latest
# COPY ./nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /app/.next /usr/share/nginx/buffer
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=build /app/out /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]