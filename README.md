# EmployeeUI

EmployeeUI is a React + TypeScript web application built with Vite. It serves as the frontend for employees to manage leads and follow-ups assigned by the admin. The backend is powered by Laravel, with PostgreSQL as the database.

## Features
- **Leads Management**: View and manage assigned leads.
- **Lead Follow-Up**: Keep track of lead interactions and updates.
- **Admin-Assigned Tasks**: Employees only work on leads assigned to them.

## Tech Stack
- **Frontend**: React (with TypeScript) + Vite
- **Backend**: Laravel
- **Database**: PostgreSQL

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Yarn](https://yarnpkg.com/) or npm

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/EmployeeUI.git
   cd EmployeeUI
   ```
2. Install dependencies:
   ```sh
   yarn install
   # or
   npm install
   ```
3. Start the development server:
   ```sh
   yarn dev
   # or
   npm run dev
   ```

## Environment Variables
Create a `.env` file in the root directory and configure the API base URL:
```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Build for Production
To create an optimized production build:
```sh
yarn build
# or
npm run build
```

## Linting and Formatting
Run ESLint to check for issues:
```sh
yarn lint
# or
npm run lint
```

## Contributing
If you want to contribute, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.


