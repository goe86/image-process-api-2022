# Image Processing API
## by George G. Riad
# Name

<h1 align="center">Hi 👋, I'm George Riad</h1>
<h3 align="center">I am Passionate Full Stack Developer</h3>

- 🔭 I’m currently working on **Image Processing API**

- 🌱 I’m currently learning **nodejs for Backend**

- 👨‍💻 All of my projects are available at [gihub.com/goe86](gihub.com/goe86)

- 📫 How to reach me **georgegamil1986@hotmail.com**

## Description
A simple API using nodejs,express and sharp module to resize an image to any width and height specified.

The API Utilizes the power of the ```sharp``` module, also the File System module and the path Module.

## Installation
Development Modules:
``` bash
    "@types/express": "^4.17.13",
    "@types/jasmine": "^3.10.6",
    "@types/morgan": "^1.9.3",
    "@types/node": "^16.11.41",
    "@types/sharp": "^0.30.4",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.29.0",
    "@typescript-eslint/parser": "^5.29.0",
    "eslint": "^8.18.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.0.0",
    "nodemon": "^2.0.16",
    "prettier": "^2.7.1",
    "rimraf": "^3.0.2",
    "ts-node": "^10.8.1",
    "typescript": "^4.7.4"
    ```
Production Modules:
    ``` bash
    "dotenv": "^10.0.0",
    "express": "^4.18.1",
    "jasmine": "^3.99.0",
    "jasmine-spec-reporter": "^7.0.0",
    "m-zanaty-web-utils": "^0.0.19",
    "morgan": "^1.10.0",
    "sharp": "^0.30.6",
    "supertest": "^6.2.3"
```  

# Scripts:
1- ```npm run dev```: This script runs a module called nodemon. the purpose on nodemon is to monitor changes happening to the file specified after nodemon
    ```python
    nodemon src/index.ts
    ```
2- ```npm run build```: This script consists of two commands :
    2-a: ```rimraf ./build```: this command deletes the build folder which has the compiled (production version) of the API
    2-b: ```npx tsc```: this command is responsible for compiling the typescript code and have the production version in javascript.
3- ```npm run test```: This script consists of two commands :
    3-a: ```npx tsc```: refer to 2-b
    3-b: ```npm run jasmine```: This command runs jasmine with config specified in the ```reporter.ts``` and ```jasmine.json```
    Jasmine is responsible to conduct API tests to check if all aspects of the API code working as needed.
4- ```npm run format```:


