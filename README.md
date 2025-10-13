# Groc

**Groc** is a grocery bill management and price-tracking platform that leverages **crowdsourced data** to help users compare prices, track spending, and plan future purchases more efficiently.

## Concept

Groc allows users to upload their grocery bills and automatically extract key information.  
All uploaded bills are aggregated into a shared dataset, enabling users to:
- Track personal spending trends across time and categories  
- Estimate their total cost for upcoming shopping lists  
- Discover price variations across stores based on community data  

By combining individual contributions, Groc aims to build an open, data-driven view of retail pricing.

## Features

- **Bill Upload & Management** – Users can upload and store digital copies of grocery bills.  
- **Expenditure Analysis** – Provides insights into spending over time and across categories.  
- **To-Buy List Planning** – Estimates the total cost of a custom to-buy list based on recent pricing data.  
- **Automated Item Categorization** – A dedicated microservice uses a **nearest-centroid text classifier** built with **SpaCy** to categorize new products automatically, reducing the need for manual tagging.  
- **Crowdsourced Price Data** – Combines user submissions into a shared pricing database for improved accuracy and coverage.  
- **Secure Multi-Service Architecture** – Clean separation of concerns between UI, backend, categorization, and database layers.

## Docker Setup

### Prerequisites
- Docker and Docker Compose installed on your system

### Build and Start All Services
```bash
# Build images and start all containers (first time or after code changes)
docker compose up --build -d
```

This will:
- Build the frontend, backend, and categorization services  
- Start the PostgreSQL database  
- Create the required network and configure all services  
- Run everything in detached mode  

### Start Existing Services
```bash
# Start all services (no rebuild)
docker compose up -d
```

### Stop Services
```bash
# Stop all running containers
docker compose down

# Stop and remove all data (including database volumes)
docker compose down -v
```

### Access Services

| Service | URL |
|----------|-----|
| Frontend | [http://localhost:3000](http://localhost:3000) |
| Backend API | [http://localhost:8080](http://localhost:8080) |
| Categorization Service | [http://localhost:8000](http://localhost:8000) |
| PostgreSQL | `localhost:5431` |

## Tech Stack

**UI Service:** TypeScript, React  
**Categorization API:** Python, FastAPI, SpaCy  
**Core API:** Java, Spring Boot, Spring Security, PostgreSQL  

Everything is orchestrated through **Docker Compose** in a single monorepo, allowing all services to run locally with one command.

## Future Directions

- Add an **OCR ingestion service** to automatically extract data from uploaded receipts.  
- Improve **product matching and de-duplication**, enabling accurate comparisons between stores.  
- Enhance **categorization accuracy** by retraining models with additional labeled data.

## Project Status

Groc is a **hobbyist project** built purely out of curiosity and interest in systems design, data aggregation, and multi-service architecture.  
While many of its core features function end-to-end, it remains an **experimental prototype** and is not intended for production use.

## License

This project is shared for exploration and learning purposes.  
Feel free to fork, explore, and experiment.