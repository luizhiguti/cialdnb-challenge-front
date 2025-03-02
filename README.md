This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


<h2 align="center">
CIAL Dun & Bradstreet Technical Challenge
</h2>

### About

- DuckDuck Go search UI

- Developed using the Next.js framework, React Context and TailwindCSS

- Deployed to Vercel, check out the live application [here](https://cialdnb-challenge-front.vercel.app)
 

### Run local

- Project setup

```bash
$ npm install
```

- Build

```bash
$ npm run build
```


- Envs (check env_example file)
```
The application uses 1 environment variable
  - NEXT_PUBLIC_API_URL: API base URL
    Use localhost for local

```

- Compile and run the project

```bash
# development
$ npm run dev

# production mode
$ npm run start
```


Open [http://localhost:3000](http://localhost:3000) with your browser 
to see the result.


### Technical Overview
Search interface, developed with Next.js, using React Context for state management and Tailwind CSS for styling. It integrates with a DuckDuckGo API proxy to handle search queries and manage query histories, displaying the search result links in an intuitive, responsive layout.
