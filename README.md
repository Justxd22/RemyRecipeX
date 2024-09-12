# RemyRecipeX

![LOGO](Client/src/assets/Images/Text_Logo.png)

## Live

[remyrecipex.up.railway.app](https://remyrecipex.up.railway.app/)


## Screenshots
![s1](.assets/s1.png)

![s2](.assets/s2.png)

![s3](.assets/s3.png)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Running the Application](#running-the-application)
7. [API Endpoints](#api-endpoints)
9. [Database Schema](#database-schema)
10. [Configuration](#configuration)
11. [License](#license)

## Introduction

...........................

## Features

- User authentication (register, login, logout)
- Responsive design for various screen sizes

## Technology Stack

- Backend: Flask (Python)
- Database: MongoDB
- Frontend: React + vite + TS + Tailwindcss
- Authentication: Flask sessions
- WSGI Server: Gunicorn
- Web Server: Nginx (for production deployment)

## Project Structure

```text
RemyRecipeX/
.
├── Client
│   ├── README.md
│   ├── dist
│   │   ├── assets
│   │   │   ├── index-BStUhQb-.js
│   │   │   ├── index-DiwrgTda.css
│   │   │   └── react-CHdo91hT.svg
│   │   └── index.html
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.app.tsbuildinfo
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── tsconfig.node.tsbuildinfo
│   └── vite.config.ts
├── Dockerfile
├── LICENSE
├── README.md
└── Server
    ├── api
    │   ├── __init__.py
    │   └── routes
    │       ├── __init__.py
    │       ├── auth_routes.py
    │       ├── gpt_routes.py
    │       └── user_routes.py
    ├── app.py
    ├── config
    │   ├── __init__.py
    │   └── default.py
    ├── database.py
    ├── errors.py
    ├── example-dotenv-file
    ├── middleware.py
    ├── models
    │   ├── __init__.py
    │   ├── auth.py
    │   └── user.py
    ├── mongo-init.js
    ├── requirements.txt
    ├── static
    │   ├── assets
    │   │   ├── index-DiwrgTda.css
    │   │   ├── index-f40OySzR.js
    │   │   ├── react-CHdo91hT.svg
    │   │   └── vite.svg
    │   └── index.html
    └── web_dynamic
        ├── __init__.py
        └── template_renderer.py

14 directories, 49 files
```

## Setup and Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/0x3mr/RemyRecipeX
   cd RemyRecipeX
   ```
2. Set up MongoDB:
   - Install MongoDB on your system

3. Set up environment variables:
   Create a `.env` file in the root directory to add your env variables. [example file](./Server/example-dotenv-file)

4. Docker build:
   ```sh
   docker build -t remyrecipex .
   ```


## Running the Application

```sh
docker run -p 5000:5000 remyrecipex
```

Enjoy :D

## API Endpoints

- POST `/api/auth/register`: Register a new user
- POST `/api/auth/login`: User login
- DELETE `/api/auth/logout`: User logout

## Database Schema

### User Collection

- `_id`: ObjectId
- `name`: String
- `email`: String
- `password`: String (hashed)


## Configuration

Configuration settings are managed in `config.py`. Different configurations are available for development, testing, and production environments.

## Authors

- Noor Amjad - [GitHub](https://github.com/Justxd22) / [Twitter](https://twitter.com/_xd222) / [LinkedIn](https://www.linkedin.com/in/noor-amjad-xd)
- Amr Abdelfattah - [GitHub](https://github.com/0x3mr) / [Twitter](https://twitter.com/an0n_amr) / [LinkedIn](https://www.linkedin.com/in/amrabdelfattah/)
- Ahmed Shalaby - [GitHub](https://github.com/Madiocre) / [Twitter](https://twitter.com/Ahmed_K_Shalaby) / [LinkedIn](https://www.linkedin.com/in/ahmed-shalaby-31a03a235/)
- Ahmed Aboalesaad - [GitHub](https://github.com/Ahmed-Aboalasaad) / [Twitter](https://x.com/Aboalesaad_) / [LinkedIn](https://www.linkedin.com/in/ahmed-aboalesaad/)
- Abdelrahman Mohamed - [GitHub](https://github.com/hackerSa3edy) / [Twitter](https://x.com/hackersa3edy) / [LinkedIn](https://linkedin.com/abdelrahmanm0)
- Kedir Jabir - [GitHub](https://github.com/IbnuJabir) / [Twitter](https://x.com/Ibnu_J1) / [LinkedIn](https://www.linkedin.com/in/ibnu-jabir/)

## License

Copyright (C) 2024
Licensed under the GPLv3 License