
# Project Setup

## Requirements

- Docker
- Docker Compose
- Node.js

## Steps to Run

1. **Start Zookeeper**
   Run the following Docker command to start Zookeeper:
   ```bash
   docker run -p 2181:2181 zookeeper


2. **Start Kafka Server using Docker**
   Run the following Docker Compose command inside the root directory:
   ```bash
   docker-compose up  

3. **Start Post Consumer Server**
   Run the following command inside the root of post-consumer:
   ```bash
   npm run dev

4. **Start Post Producer Server**
   Run the following command inside the root of post-producer:
   ```bash
   npm run dev        