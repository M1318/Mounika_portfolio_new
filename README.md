# Mounika Avutu - Data Engineer Portfolio

This is a modern portfolio website built with React, TypeScript, and Vite, showcasing data engineering projects and skills.

## GitHub Pages Deployment

This project is configured to deploy to GitHub Pages. There are two ways to deploy:

### Option 1: Automatic Deployment (Recommended)
1. Push your changes to the `main` or `master` branch
2. GitHub Actions will automatically build and deploy your site
3. Your site will be available at `https://yourusername.github.io/mounika-data-verse-main/`

### Option 2: Manual Deployment
1. Run the build command: `npm run build`
2. Deploy to GitHub Pages: `npm run deploy`

## Development Setup

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Troubleshooting

If you encounter blank pages on GitHub Pages:
1. Make sure the repository name in `vite.config.ts` matches your actual repository name
2. Ensure GitHub Pages is enabled in your repository settings
3. Check that the source is set to "GitHub Actions" in the Pages settings


