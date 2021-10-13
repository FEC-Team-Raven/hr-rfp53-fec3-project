# Project Catwalk

Project Catwalk tackles the request to build a new retail portal following the [Business Requirements](https://docs.google.com/document/d/1KAqduzY8ae3DYrSoCL1i23qHe95zJRYFulqMk-sGLWY/edit?usp=sharing).  

## Authors

- [@wrightgabriel0220](https://github.com/wrightgabriel0220) - Scope: Overview
- [@jackychen19](https://github.com/jackychen19) - Scope: Related Products
- [@wdmcculloch](https://github.com/wdmcculloch) - Scope: Questions and Answers
- [@BuhJoseph](https://www.github.com/BuhJoseph) - Scope: Ratings and Reviews



## Features

#### 1. Overview
- The overview guides the customer through selecting a specific style and size to add to their cart. As such, portions of the Overview module, such as the image gallery and cart selection, will be specific to a SKU chosen as opposed to the overarching product.

<img src="/demo/overview-demo.gif?raw=true" width="700px">

#### 2. Related Products
- The Related Items & Comparison module will display two sets of related products.  The first set will be a list of products, determined internally, that are related to the product currently being viewed.  The second set will be a list, custom created by the user, of products which the user has grouped with the current product into an ‘outfit’.

<img src="/demo/related-products-demo.gif?raw=true" width="700px">
*Note: The "Pumped Up Kicks" appears twice because it is included twice in the Related Products API endpoint


#### 3. Questions & Answers
- The Questions & Answers module allows users to ask and answer questions for the product selected.

<img src="/demo/questions-demo.gif?raw=true" width="700px">

#### 4. Ratings & Reviews
- The Ratings & Reviews module allows users to view and submit reviews for the product selected.

<img src="/demo/reviews-demo.gif?raw=true" width="700px">


## Run Locally

1. Download and clone the project

```bash
  git clone https://github.com/FEC-Team-Raven/hr-rfp53-fec3-project.git
```

2. Go to the project directory

```bash
  cd hr-rfp53-fec3-project
```

3. Install dependencies

```bash
  npm install
```

4. Transpile JSX to Javascript

```bash
  npm run build:prod
```

5. Start the server

```bash
  npm run start:prod
```

  
## Environment Variables

To run this project, you will need to add the following environment variables to your config.js file. Place the config.js file in the server directory.

`GITHUB_OAUTH`

`imgBB_API_KEY`

  
