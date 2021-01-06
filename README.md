# Dose of Tech: Website

Dose of Tech is the backend and frontend code for a personal blog. This includes features such as:

- Server-side rendering for frontend pages
- User authentication
- Admin panel to manage blogs and users

## Usage

### Prerequisites

This assumes that you have installed:

- nodejs and yarn (or npm)
- postgres

These instructions are for Linux development environments.

### Backend

Once you have cloned the repository, you will need to install the dependencies for the project.

```
cd doseoftech/backend
yarn install
```

Create a new postgres database called `doseoftech`, and create a username and password. Then create a `backend/.env` file with the following:

```
DATABASE_USERNAME=<your_username>
DATABASE_PASSWORD=<your_password>
```

Now start the development environment:

```
cd doseoftech/backend
yarn develop
```

### Frontend

Once your backend has been configured, now we need to set up the frontend. Install the dependencies for the frontend:

```
cd doseoftech/frontend
yarn install
```

Once the dependencies have been installed you can start the development environment:

```
cd doseoftech/frontend
yarn dev
```

You can now view the frontend on `http://localhost:3000/` and the backend admin panel on `http://localhost:1337/admin`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
