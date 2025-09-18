# Mini Dashboard

A modern, responsive dashboard built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Dashboard Home**: Animated statistics cards and activity feed
- **Posts Management**: View all posts with staggered animations and individual post details
- **Users Management**: Responsive table with animated modal for user details
- **Error Handling**: Comprehensive error states with retry functionality
- **Loading States**: Smooth loading spinners throughout the app
- **Animations**: Framer Motion animations for enhanced user experience

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: JSONPlaceholder

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.


## Key Components

### Custom Hook
- `useFetch`: Reusable hook for API calls with loading, error, and data states

### Reusable Components
- `Card`: Animated card component with hover effects
- `Modal`: Animated modal with backdrop and smooth transitions
- `LoadingSpinner`: Animated loading indicator
- `ErrorMessage`: Error display with retry functionality

### Animations
- Staggered card animations on page load
- Hover effects on interactive elements
- Smooth modal transitions
- Loading state animations

## Error Handling

The application includes comprehensive error handling:
- API error states with user-friendly messages
- Retry functionality for failed requests
- Intentional error simulation for testing
- Loading states during API calls

## Deployment

This project is ready for deployment on Vercel, Netlify, or any other hosting platform that supports Next.js.

## Live Demo

[View Live Demo]()

## GitHub Repository

[View Source Code]()