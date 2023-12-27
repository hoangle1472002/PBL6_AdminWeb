FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]

# docker build -t siuit/booktickets-admin:1.0.0 .
# docker tag siuit/booktickets-admin:1.0.0 siuit/booktickets-admin:1.0.0
# docker push siuit/booktickets-admin:1.0.0