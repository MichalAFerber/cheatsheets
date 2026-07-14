---
title: "Docker"
tagline: "Build images, run containers, wire up Compose, and clean up after."
---

# Docker

The commands you reach for daily with the Docker CLI. `docker compose` (v2, a subcommand) has replaced the old `docker-compose` binary — both are shown where they differ.

## Images

| Command | Action |
| --- | --- |
| `docker build -t app:1.0 .` | build an image from the Dockerfile here |
| `docker images` | list local images |
| `docker pull nginx:alpine` | download an image |
| `docker tag app:1.0 app:latest` | add another tag |
| `docker push registry/app:1.0` | upload to a registry |
| `docker rmi app:1.0` | remove an image |

## Containers

| Command | Action |
| --- | --- |
| `docker run nginx` | run a container in the foreground |
| `docker ps` | list running containers |
| `docker ps -a` | list all containers, including stopped |
| `docker stop <id>` | graceful stop (SIGTERM) |
| `docker start / restart <id>` | start / restart a container |
| `docker rm <id>` | remove a stopped container |
| `docker exec -it <id> sh` | open a shell inside a running container |
| `docker logs -f <id>` | follow a container's logs |

## Common run flags

| Flag | Effect |
| --- | --- |
| `-d` | detached — run in the background |
| `-p 8080:80` | map host port 8080 to container port 80 |
| `-v ./data:/app/data` | bind-mount a host folder |
| `-e KEY=value` | set an environment variable |
| `--name web` | give the container a stable name |
| `--rm` | auto-remove the container when it exits |
| `--network mynet` | attach to a user-defined network |

**A typical one-liner**

```bash
docker run -d --name web --rm \
  -p 8080:80 -v ./html:/usr/share/nginx/html \
  nginx:alpine
```

## Compose

| Command | Action |
| --- | --- |
| `docker compose up -d` | start the stack in the background |
| `docker compose down` | stop and remove the stack |
| `docker compose ps` | list the stack's containers |
| `docker compose logs -f` | follow logs for all services |
| `docker compose build` | rebuild service images |
| `docker compose restart <svc>` | restart one service |

## Clean Up

| Command | Removes |
| --- | --- |
| `docker system df` | show what Docker is using (safe) |
| `docker container prune` | all stopped containers |
| `docker image prune` | dangling (untagged) images |
| `docker image prune -a` | all images not used by a container |
| `docker volume prune` | unused volumes |
| `docker system prune -a` | containers, networks, and unused images |

> **prune deletes without asking twice.** `docker volume prune` can wipe database data living in an unused volume, and `system prune -a` removes every image no running container references. Check `docker system df` first.

---

© 2026 | Created with ❤️ by [Michal Ferber](https://michalferber.dev/), aka [TechGuyWithABeard](https://techguywithabeard.com/)
