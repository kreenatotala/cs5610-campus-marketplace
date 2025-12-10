# Campus Marketplace
Campus Marketplace is a web application that facilitates peer-to-peer item buying and selling within the Northeastern University campus community.


## Authors
- Kreena Totala
- Swar Kewalia

## Class Link
- [CS5610: Web Development – Northeastern University](https://johnguerra.co/classes/webDevelopment_fall2025/)

## Project Objective
Campus Marketplace is a full-stack web application that helps Northeastern students buy and sell items within the campus community. Authenticated users can create listings, browse available items, contact sellers via email, and manage their own postings in a streamlined interface designed for quick, trustworthy exchanges.

## Usability Study
[usability study doc](https://docs.google.com/document/d/1HUawpuIdU0Q54LahNP8i3m88jD-12S-rpBq5rTbNM7w/edit?usp=sharing)

## Video and Presentation
Video: https://drive.google.com/file/d/18frXLGxuIbT4h-0GhZT94gybszDnOeyS/view?usp=sharing

Presentation: https://docs.google.com/presentation/d/1SfjHu-IJtsGDzNyxKjV7CUEnfwnSdLXhmGCZVjFSmQI/edit?usp=sharing

## Deployement
It is deployed publicly using `Render` here: https://cs5610-campus-marketplace.onrender.com 

## Screenshot
<img width="1432" height="754" alt="Screenshot 2025-12-09 at 10 06 22 PM" src="https://github.com/user-attachments/assets/81595559-899d-4af3-a0f1-16287a1d28c1" />
<img width="1435" height="686" alt="Screenshot 2025-12-09 at 10 12 36 PM" src="https://github.com/user-attachments/assets/e61fcabf-7dc5-494b-a8bf-4f39b1b75c1e" />
<img width="1437" height="749" alt="Screenshot 2025-12-09 at 10 12 44 PM" src="https://github.com/user-attachments/assets/0b4e2ab2-014b-4884-8108-84c47128eb4b" />


## Tech Stack
- **Frontend:** React 19, Vite, React Router
- **Backend:** Express 5, Node.js, MongoDB
- **Tooling:** ESLint, Vite proxy, Render (deployment)

## Prerequisites
- Node.js 18 or later
- npm 10+
- Access to a MongoDB instance (Atlas or self-hosted)

Create a `.env` file in the project root with at least:

```bash
MONGO_URI="<your MongoDB connection string>"
DB_NAME="campus_marketplace"
PORT=3000
```

## Local Development
1. **Install dependencies**
   ```bash
   npm install
   npm install --prefix frontend
   ```

2. **(Optional) Seed sample data**
   ```bash
   node database/importMockarooData.js
   ```

3. **Start the backend API**
   ```bash
   node backend/backend.js
   ```

4. **Start the Vite dev server (in a separate terminal)**
   ```bash
   npm run dev --prefix frontend
   ```

5. Visit the app at `http://localhost:5173`. API requests are proxied to `http://localhost:3000` via `frontend/vite.config.js`.

## Production Build & Deployment
1. **Build the frontend bundle**
   ```bash
   npm install && npm install --prefix frontend && npm run build --prefix frontend
   ```

2. **Serve the app**
   ```bash
   node backend/backend.js
   ```

   The Express server serves static assets from `frontend/dist` and exposes API routes under `/api/*`, making it suitable for a single Render web service. Use the build command above and `node backend/backend.js` as the Render start command.

## Testing & Linting
- Run ESLint across the project:
  ```bash
  npm run lint
  ```
