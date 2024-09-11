# RemyRecipeX

![s1](Client/src/assets/Images/Text_Logo.png)

## Live
.....


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
- Real-time multiplayer gameplay
- Leaderboard system
- Game history tracking
- Responsive design for various screen sizes

## Technology Stack

- Backend: Flask (Python)
- Database: MongoDB
- Real-time Communication: Socket.IO
- Frontend: HTML, CSS, JavaScript (details may vary based on your implementation)
- Authentication: Flask sessions
- WSGI Server: Gunicorn
- Web Server: Nginx (for production deployment)

## Project Structure

```text
RemyRecipeX/
│
├── .env
├── .gitignore
├── app.py
├── backend.Dockerfile
├── database.py
├── docker-compose.yml
├── errors.py
├── example-dotenv-file
├── middleware.py
├── requirements.txt
```

## Setup and Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/0x3mr/RemyRecipeX
   cd RemyRecipeX
   ```

2. Set up a virtual environment:

   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use venv\Scripts\activate
   ```

   For me I'm using virtualenvwrapper, It's cool. Give it a try: [virtualenvwrapper](https://pypi.org/project/virtualenvwrapper/)

3. Install the required packages:

   ```sh
   pip install -r requirements.txt
   ```

4. Set up MongoDB:

   - Install MongoDB on your system
   - Initialize it with username and password, if needed.

5. Set up environment variables:
   Create a `.env` file in the root directory to add your env variables. [example file](./server/example-dotenv-file)

## Running the Application

For development:

```sh
python app.py
```


For production, refer to the Deployment section.

## API Endpoints

- POST `/api/auth/register`: Register a new user
- POST `/api/auth/login`: User login
- DELETE `/api/auth/logout`: User logout

## Database Schema

### User Collection

- `_id`: ObjectId
- `username`: String
- `email`: String
- `password`: String (hashed)
- `wins`: Integer
- `losses`: Integer
- `draws`: Integer
- `game_played`: Integer
- `score`: Integer
- `created_at`: DateTime
- `avatar`: String (URL)


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