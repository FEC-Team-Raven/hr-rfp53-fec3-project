# Front End Capstone - Project Catwalk

Project Catwalk tackles the request to build a new retail portal following the [Business Requirements](https://docs.google.com/document/d/1KAqduzY8ae3DYrSoCL1i23qHe95zJRYFulqMk-sGLWY/edit?usp=sharing) .  





## Authors

- [@BuhJoseph](https://www.github.com/BuhJoseph)
- [@wrightgabriel0220](https://github.com/wrightgabriel0220)
- [@wdmcculloch](https://github.com/wdmcculloch)
- [@jackychen19](https://github.com/jackychen19)


## Features

1. Overview
2. Related Products
3. Questions & Answers
4. Ratings & Reviews
    - Displays reviews in a list
    - Sort reviews by relevance, helpfulness, or newest
    - Filter reviews by star rating
    - Filter reviews by text input
    - Mark reviews as helpful
    - Report reviews
    - If review body is too long then only a portion will be displayed with a Show More option available
    - Display product breakdown statistical data using bar charts
    - Post new reviews with form validation


## Screenshots

<img width="1074" alt="Screen Shot 2021-06-19 at 9 16 18 AM" src="https://user-images.githubusercontent.com/22485685/122651118-9162df00-d0eb-11eb-950f-4fd83a924b16.png">
<img width="1087" alt="Screen Shot 2021-06-19 at 9 16 26 AM" src="https://user-images.githubusercontent.com/22485685/122651134-a475af00-d0eb-11eb-8bbd-810e60584c3e.png">

  
## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?
- Gabriel Wright
- Jacky Chen
- Will McCulloch
- Joseph Balaoing
    - I learned a lot about react hooks and context. Transitioning to use hooks was smooth and easy until I started to use contexts. I was having problems figuring out how to use context with state. The problem was due to manipulating the state object directly and then setting state to itself. I was able to fix this by making a copy of the state instead. Once I had a better understanding of contexts I created a context that would act as a store for all the shared state.
    - File upload was another big challenge that I faced. I wanted to upload the images that users submit to our server but I was having trouble figuring out how to deal with files. I tried many different ways to upload the file and eventually I found FormData and multer. Using these together I was able to send the image files from the client to the server in a FormData. Then I was able to retrieve the data from the request using multer. From there I was able to host the images using the imgBB API.

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/FEC-Team-Raven/hr-rfp53-fec3-project.git
```

Go to the project directory

```bash
  cd hr-rfp53-fec3-project
```

Install dependencies

```bash
  npm install
```

Transpile JSX to Javascript

```bash
  npm run build:prod
```

Start the server

```bash
  npm run start:prod
```

  
## Environment Variables

To run this project, you will need to add the following environment variables to your config.js file. Place the config.js file in the server directory.

`GITHUB_OAUTH`

`imgBB_API_KEY`

  
