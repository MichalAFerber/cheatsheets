---
title: "Docker"
description: "Build images, run containers, wire up Compose, and clean up after."
category: "DevOps"
tags: [devops]
---
# Docker

<p class="dl-pills">
<a class="dl-pill" href="../downloads/docker.pdf" title="Download PDF"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg>PDF</a>
<a class="dl-pill" href="../downloads/docker.md" title="Markdown source"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z"/></svg>Markdown</a>
<a class="dl-pill" href="../downloads/docker.html" title="Download HTML"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>HTML</a>
</p>

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
