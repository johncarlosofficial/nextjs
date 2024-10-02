# Next.js Starter Project

This repository is a starter template for building applications using Next.js, React, and ReactDOM. It includes essential configurations and scripts to streamline your development process.

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

-   **Node.js**: Ensure you have Node.js installed. This project uses a specific version of Node.js, which you can set up using **NVM (Node Version Manager)**.

-   **Docker**: Docker is required to containerize the PostgreSQL database.

-   **PostgreSQL Client (psql)**: To interact with the PostgreSQL database, you’ll need the PostgreSQL client `psql`.

### Setup Instructions

1. **Clone the Repository**:

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. **Use the Correct Node Version**:
   If you have NVM installed, run the following command to use the Node version specified in the `.nvmrc` file:

    ```bash
    nvm use
    ```

3. **Install Dependencies**:
   Initialize your project with npm and install the required packages:

    ```bash
    npm install
    ```

4. **Run Docker**:
   The `compose.yaml` file in the `infra/` directory configures the application services. To start the services, use the following command:

    ```bash
    docker-compose up
    ```

    To stop the services, run:

    ```bash
    npm run services:stop
    ```

    To tear down the services, run:

    ```bash
    npm run services:down
    ```

5. **Run the Development Server**:
   Start the Docker services and the Next.js development server with a single command:

    ```bash
    npm run dev
    ```

    Ensure you have an `app` folder in your project root for the server to run correctly.

### Project Configuration

-   **Prettier**: This project uses Prettier for code formatting. The following scripts are included in the `package.json`:

    -   `prettier --check .`: Checks your code for formatting issues.
    -   `prettier --write .`: Automatically formats your code.

    Additionally, a `.prettierignore` file is provided to specify files and directories that should be ignored by Prettier.

-   **EditorConfig**: An `.editorconfig` file is included to maintain consistent coding styles between different editors and IDEs. Make sure to install the EditorConfig extension in your code editor to benefit from this.

-   **Jest Testing Framework**: This project includes Jest for testing, along with a watch mode to re-run tests automatically as changes are made. The following scripts are available:

    -   `npm run test`: Runs the Jest test suite once.
    -   `npm run test:watch`: Runs Jest in watch mode, which automatically re-runs tests when files are changed.

### Project Structure

Here’s a brief overview of the important files and directories:

-   **`.nvmrc`**: Specifies the Node.js version for the project.
-   **`package.json`**: Lists project dependencies and scripts.
-   **`.editorconfig`**: Configures code formatting settings for various editors.
-   **`.gitignore`**: Specifies files and directories that should be ignored by Git.
-   **`.prettierignore`**: Specifies files and directories to be ignored by Prettier.
-   **`app/`**: This directory should contain your application code.
