# EchoBeat 🎵

**EchoBeat** is a Spotify-inspired music streaming platform built using modern web technologies. It allows users to browse, search, and play their favorite tracks while offering a sleek and responsive user interface. Powered by **Next.js**, **React**, **Supabase**, and **PostgreSQL**, EchoBeat demonstrates efficient full-stack development and database integration.

## 🚀 Features

- **Music Streaming**: Browse, search, and play music from an extensive library of tracks.
- **User Authentication**: Secure user login and signup using Supabase's authentication system.
- **Playlists**: Create, save, and manage custom playlists.
- **Favorites**: Mark songs as favorites for quick access.
- **Responsive Design**: Fully optimized for desktop and mobile devices.
- **Real-Time Updates**: Data is synced with a PostgreSQL database via Supabase for a seamless experience.

## 🛠️ Technologies Used

- **Next.js**: Server-side rendering and static site generation for high performance.
- **React**: A robust JavaScript library for building dynamic user interfaces.
- **Supabase**: Backend-as-a-Service for authentication, real-time database, and storage.
- **PostgreSQL**: A powerful, open-source relational database for storing application data.
- **Tailwind CSS**: Utility-first CSS framework for rapid and responsive UI design.

## 📂 Project Structure

The project is organized as follows:

**Echobeat**/
├── actions/ # Reusable React components
├── app/ # Contains the core application logic, including Next.js pages, routes.
├── libs/ # Includes reusable utility functions, helper modules, or custom hooks used throughout the app.
├── providers/ # Manages context and state providers for global app functionality, such as authentication or theme management.
├── components/ # Reusable React components
├── utils/ # Helper functions and services
├── public/ # Static assets (images, icons, etc.)
├── .env.local # Environment variables (e.g., Supabase keys)
├── package.json # Project dependencies and scripts
