

# RabbitMQ RPC Microservices

This project demonstrates RPC-based communication between microservices using RabbitMQ. A client service sends requests to a queue, and a server service processes them and returns responses using correlation IDs. The application is built with Node.js, TypeScript, and Docker.

## Tech Stack

Node.js, TypeScript, RabbitMQ, Docker, Docker Compose

## Run

docker-compose up --build

## RabbitMQ UI

[http://localhost:15672](http://localhost:15672)

## Purpose

Learning microservices communication using the RabbitMQ RPC pattern.
