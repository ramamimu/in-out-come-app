FROM nginx

COPY dist /usr/share/nginx/html
RUN ls -a /usr/share/nginx/html

EXPOSE 80