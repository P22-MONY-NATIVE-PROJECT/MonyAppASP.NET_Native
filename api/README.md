# Docker commands

```
docker ps -a
ducker compose down
docker compose pull
docker compose up -d
```

# nginx commands

```
systemctl reload nginx
```
## /etc/nginx/sites-available/default

```
server {
    server_name local.task.test.com;

    location / {
        proxy_pass http://127.0.0.1:4326;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
    }
}
```

##Для SignalR потрібно трішки змінити
```
server {
    server_name   f-track.itstep.click *.f-track.itstep.click;
	client_max_body_size 250M;

    location / {
        proxy_pass http://127.0.0.1:4326;

        proxy_http_version 1.1;
        
        # --- Секція для WebSockets (Критично для SignalR) ---
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        # --------------------------------------------------

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Додатково: вимкнення кешування для запитів SignalR
        proxy_cache_bypass $http_upgrade;
    }
}
```