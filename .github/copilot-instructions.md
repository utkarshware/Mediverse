# Copilot Instructions for Mediverse

## Overview
Mediverse is a React-based web application designed to provide AI-powered health guidance. The application is structured around a component-based architecture, utilizing React Router for navigation and state management through hooks.

## Architecture
- **Components**: The application is divided into reusable components located in the `src/components` directory. Key components include:
  - `Navbar`: Handles navigation and routing.
  - `Hero`: Displays the main welcome section.
  - `Features`: Showcases the services offered.
  - `ManualInput`: Allows users to input health data for analysis.
- **Pages**: The `src/pages` directory contains the main views of the application, such as `Landing`, `Login`, and dashboards for civilians and students.
- **Routing**: The main routing is handled in `src/App.js` using `react-router-dom` to define routes for different pages.

## Developer Workflows
- **Starting the Application**: Use the command `npm start` to run the application in development mode.
- **Building for Production**: Use `npm run build` to create an optimized production build.
- **Testing**: Run tests using `npm test`. The application uses `@testing-library/react` for component testing.

## Project Conventions
- **CSS Variables**: The design system is defined using CSS variables in `src/App.css`, allowing for easy theme adjustments.
- **Component Structure**: Each component is self-contained, managing its own state and styles. Ensure to follow the naming conventions for components and CSS classes.

## Integration Points
- **External Dependencies**: The project relies on several key libraries, including:
  - `react`: Core library for building the UI.
  - `react-router-dom`: For routing and navigation.
  - `@testing-library/react`: For testing components.
- **Data Flow**: Components communicate through props and callbacks, especially for user interactions like form submissions and navigation.

## Examples
- **Using the Navbar**: The `Navbar` component uses the `useNavigate` hook from `react-router-dom` to handle navigation. Example:
  ```jsx
  <span className="nav-link" onClick={() => navigate('/')}>Home</span>
  ```
- **Manual Input Analysis**: The `ManualInput` component analyzes user input based on device type and displays results accordingly. Example:
  ```jsx
  const analyze = () => {
      // Logic for analyzing input
  };
  ```

## Conclusion
These instructions should help AI coding agents understand the structure and workflows of the Mediverse codebase, enabling them to assist effectively in development tasks.