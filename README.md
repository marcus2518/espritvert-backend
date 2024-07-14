## Project Requirements and Setup

### Project Name: EspritVert Backend

### Description
The EspritVert Backend is a back-end service for the EspritVert mobile application, built using Node.js and Firebase. It provides APIs and integrates with Firebase services for authentication and data storage.

### Prerequisites
- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: Node.js installation comes with npm (Node Package Manager).
- **Firebase CLI**: Install Firebase CLI by running `npm install -g firebase-tools`.
- **Google Cloud SDK**: Install the Google Cloud SDK from [cloud.google.com/sdk](https://cloud.google.com/sdk).
- **Private API Keys**: Since this program uses Google Cloud Platform and Firebase, you will need API keys and a service account in order to run it locally. Contact the development team to obtain them.

### Installation and Setup

1. **Clone the Repository**
    ```sh
    git clone https://github.com/marcus2518/espritvert-backend.git
    cd espritvert-backend
    ```

2. **Install Dependencies**
    ```sh
    npm install
    ```

3. **Lint the Project**
    Ensure code quality by running the linter:
    ```sh
    npm run lint
    ```

4. **Development Server**
    Start the development server with automatic reloading using Nodemon:
    ```sh
    npm run dev
    ```

5. **Build the Project**
    Transpile TypeScript code to JavaScript:
    ```sh
    npm run build
    ```

6. **Start the Application**
    Run the built application:
    ```sh
    npm start
    ```

7. **Deploy to Google Cloud**
    Deploy the application to Google Cloud App Engine using the following command:
    ```sh
    gcloud app deploy
    ```

### The Essentials

By default, the project runs locally on port 3000.

```http://localhost:3000/```

#### API Documentation
Swagger documentation for the APIs is available at:

```http://localhost:3000/api-docs```

##### Regenerating API Documentation
While Nodemon will watch and update your local server every time you save your code, you need to re-build the application to update Swagger documentation if you modify it.

```
npm run build
```

#### Minimal commands to run the project locally

To correctly run the project locally:

```sh
npm install
npm run build
npm run dev
```

### Scripts

- **Linting**: `npm run lint` - Runs ESLint on the project.
- **Development**: `npm run dev` - Starts the development server with Nodemon.
- **Build**: `npm run build` - Compiles the TypeScript code.
- **Start**: `npm start` - Runs the compiled JavaScript code.

### Important Elements in Project Structure

```
espritvert-backend/
│
├── .github/               # GitHub configuration files
│
├── dist/                  # Compiled JavaScript files
│
├── functions/             # Firebase Cloud Functions
│
├── keys/                  # Keys for various services (Needs to be manually inserted)
│
├── src/                   # Source files
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── routes/            # Route definitions
│   ├── services/          # Service layer
│   └── index.ts           # Entry point of the application
│ 
│
├── test/                  # Directory for unit tests
│   ├── controllers/       # Test for the controllers
│   ├── routes/            # Test for the routes
│   └── services/          # Test for the services
│
├── .firebaserc            # Firebase project configuration
├── .gcloudignore          # Files to ignore for Google Cloud
├── .gitignore             # Files to ignore in git
├── app.yaml               # App configuration for Google App Engine
├── database.rules.json    # Firebase Realtime Database rules
├── eslint.config.mjs      # ESLint configuration
├── firebase.json          # Firebase configuration
├── firestore.indexes.json # Firestore indexes configuration
├── firestore.rules        # Firestore security rules
├── nodemon.json           # Nodemon configuration
├── package-lock.json      # Exact versions of installed dependencies
├── package.json           # Project metadata and scripts
├── README.md              # Project documentation
├── storage.rules          # Firebase Storage security rules
└── tsconfig.json          # TypeScript configuration
```
