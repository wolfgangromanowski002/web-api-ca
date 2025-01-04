# Assignment 2 - Web API.

Name: Wolfgang Romanowski

## Features.

An error at one point occured and I am unsure where, I tried fixing it alongside ChatGPT but I am unable to, I tried going backwardss in past commits but it doesnt work anymore either, I assume this would be due to the key but in all honesty I am unsure, for whatever partials it may be worth, please just judge off of the code, however a video will not be supplied due to this, i have attmepted to reconstruct it and it was working originally up till about the second last commit, I am presently unable to fix it and unsure where the error lies in the first place.

Below are the additional features we implemented beyond the labs:
 + Mongo Actor Collection routes
 + Advanced password validation
 + Several new TMDB endpoints 
 + User specific favorites stored in mongo

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

(Default process necessary)

cd movies-api && npm install
cd react-movies && npm install

Create .env file specified below

cd movies-api && npm run dev
cd react-movie && npm start

API should run at 8080 unless otherwise specified in .env, React dev server should run at localhost:3000

## API Configuration

Create .env file with following data:
______________________
mongoDB=YourMongoURL
PORT=8080
secret=YourJWTSecret
REACT_APP_TMDB_KEY
FAST_REFRESH=false
______________________

## API Design
  - GET /api/movies/tmdb/discover (from TMDB)
  - GET /api/movies/tmdb/upcoming (from TMDB)
  - GET /api/movies/tmdb/popular
  - GET /api/movies/tmdb/search?query=someQuery
  - GET /api/movies/tmdb/top_rated
  - GET /api/movies/tmdb/trending
  - GET /api/movies/favorite
  - POST /api/movies/favorite
  - GET /api/actors
  - GET /api/users

## Security and Authentication

JWT based authentication. Password hashing with bcrypt
Password has to at minimum be 8 chars and includes letter, number and special characters.

## Integrating with React App

All movie requests go to the link instead of the raw TMDB
React app uses react query to fetch from endpoints
Favorites h ave become a feature for logged in users. React app passes JWT token in Authorization header to read and modify favorites
Theres also a dedicated Actorspage which fetches from GET/api/actors. if youre not logged in you do not recieve a token.

## Independent learning (if relevant)

attempted to implement more user friendly errors.
