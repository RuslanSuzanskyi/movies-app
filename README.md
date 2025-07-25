# 🎬 Movies App

A single-page web application for managing your movie collection.

---

## Project Description

This project provides a user interface for storing and managing movie information. It's built with **React**, **TypeScript**, and **Vite**, leveraging **Redux Toolkit** and **RTK Query** for efficient API interactions. The backend API is provided as a **Docker** image by WebbyLab, and the frontend is deployed via **Docker** with **Nginx**, supporting runtime configuration of the API URL.

---

## Features

* **CRUD Operations**: Add, edit, and delete movies.
* **Detailed Views**: View comprehensive movie information.
* **Sorted Display**: Display a list of movies sorted alphabetically by title.
* **Search Functionality**: Search movies by title or actor name.
* **Import Functionality**: Import movies from a `.txt` file via the web interface.
* **Runtime Configuration**: Dynamic configuration of the backend API URL using environment variables.
* **Responsive Design**: A user interface that adapts to various screen sizes.

---


## Links

- Git repo: [https://github.com/RuslanSuzanskyi/movies-app.git](https://github.com/RuslanSuzanskyi/movies-app.git)
- Docker front-end: [https://hub.docker.com/r/antiokh1/movies](https://hub.docker.com/r/antiokh1/movies)
- Backend Docker: [https://hub.docker.com/r/webbylabhub/movies](https://hub.docker.com/r/webbylabhub/movies)
- API документація: [Postman Spec](https://documenter.getpostman.com/view/356840/TzkyLeVK)
- Тестовий файл для імпорту: [sample_movies.txt](https://gist.github.com/k0stik/3028d42973544dd61c3b4ad863378cad)

---

## Technologies Used

* **Frontend**: React 19, TypeScript, Vite
* **State Management**: Redux Toolkit, RTK Query
* **Styling**: Tailwind CSS
* **Deployment**: Docker, Nginx

---

## Getting Started

Follow these steps to set up and run the project locally.

### Local Development

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/RuslanSuzanskyi/movies-app.git
    cd movies-app
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the frontend development server**:

    ```bash
    npm run dev
    # or
    yarn run dev
    ```

4.  **Run the backend API (separately)**:

    ```bash
    docker run --name movies -p 8000:8000 webbylabhub/movies
    ```

---

## Runtime Configuration of API_URL

The frontend supports dynamic configuration of the backend API URL via environment variables at runtime. This is achieved by creating a JavaScript file that is served to the frontend.

1.  **Create a shell script (`env.sh`) for runtime configuration**:

    ```bash
    #!/bin/sh
    echo "window.API_URL=\"$API_URL\"" > /usr/share/nginx/html/config.js
    ```

    This script writes the `API_URL` environment variable into a JavaScript file (`config.js`) that will be served by Nginx.

2.  **Modify your Dockerfile for the frontend**:

    Include the following lines to copy and execute `env.sh` on container start:

    ```dockerfile
    COPY env.sh /env.sh
    RUN chmod +x /env.sh

    CMD ["/bin/sh", "-c", "/env.sh && nginx -g 'daemon off;'"]
    ```

3.  **Include the generated `config.js` script in your `index.html` file**:

    Make sure `public/index.html` (or `dist/index.html` after build) includes this script tag:

    ```html
    <script src="/config.js"></script>
    ```

    This ensures `window.API_URL` is set before your React application initializes.

4.  **Read the API URL in your React code**:

    Access the `API_URL` from the global `window` object:

    ```typescript
    const apiUrl = (window as any).API_URL || "http://localhost:8000/api/v1";
    ```

    Use this `apiUrl` as the base URL for all your API calls.

---

## Building and Running with Docker

1.  **Build the frontend Docker image**:

    ```bash
    docker build -t your_dockerhub_username/movies .
    ```

2.  **Push the image to DockerHub (optional)**:

    ```bash
    docker push your_dockerhub_username/movies
    ```

3.  **Run the container with `API_URL` environment variable**:

    ```bash
    docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 your_dockerhub_username/movies
    ```

    Remember to replace `http://localhost:8000/api/v1` with your actual backend API URL if it's different.

---

## ⚠️ Important: First-Time Login and Common Issues

    When you first launch the backend Docker container, its database is empty. This means there are no registered users.

    First-time users MUST register a new account through the application's "Sign Up" page.

    Encountering "Login Failed" or "User Not Found"?
    If you previously logged in and then restarted the backend Docker container (or you're testing on a fresh setup), your browser might still hold an invalid authentication token from a non-existent user.

    To resolve this:

    Open your browser's Developer Tools (usually by pressing F12 or Ctrl+Shift+I/Cmd+Option+I).

    Go to the "Application" tab (or "Storage" > "Local Storage").

    Locate your application's origin (e.g., http://localhost:3000) in the Local Storage list.

    Find and delete the token entry. You can also clear all local storage for that domain.

    Refresh the page. You will then be redirected to the login/registration page where you can create a new account.

---