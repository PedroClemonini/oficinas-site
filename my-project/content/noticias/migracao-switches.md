---
title: "Subindo um ambiente isolado com Docker"
resume: "Aprenda a estruturar seus containers de forma rápida e segura usando o docker-compose."
date: "2026-03-04"
author: "Pedro Clemonini"
coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=600&h=400"
---

Neste artigo, vamos configurar um serviço web básico.

### Estrutura do Compose

Abaixo está o nosso arquivo de configuração principal:

```yaml
version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
    restart: unless-stopped