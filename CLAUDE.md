# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Telegram Mini App built with React, TypeScript, and Vite. It demonstrates integration with the Telegram Mini Apps platform using the @telegram-apps SDK and includes TON Connect for cryptocurrency functionality.

## Development Commands

- `npm run dev` - Start development server (HTTP)
- `npm run dev:https` - Start development server with HTTPS (required for Telegram integration)
- `npm run build` - Build for production (includes TypeScript type checking)
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Run ESLint with automatic fixes
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages

## Architecture

### Entry Point and Initialization
- **src/index.tsx**: Main entry point that handles environment detection and app initialization
- **src/init.ts**: Contains the `init()` function that configures Telegram SDK, mounts components, and handles platform-specific workarounds (especially for macOS)
- **src/mockEnv.ts**: Provides Telegram environment mocking for development outside Telegram

### Core Application Structure
- **src/components/App.tsx**: Main app component that sets up routing with React Router and applies Telegram UI theming
- **src/components/Root.tsx**: Root wrapper component
- **src/navigation/routes.tsx**: Defines all application routes and their corresponding components

### Pages Architecture
The app follows a page-based routing structure:
- **IndexPage**: Main landing page with navigation
- **InitDataPage**: Displays Telegram init data
- **LaunchParamsPage**: Shows launch parameters
- **ThemeParamsPage**: Demonstrates theme parameter usage
- **TONConnectPage**: TON blockchain integration demo

### Key Dependencies
- **@telegram-apps/sdk-react**: Core Telegram Mini Apps SDK
- **@telegram-apps/telegram-ui**: Telegram-styled UI components
- **@tonconnect/ui-react**: TON Connect integration for cryptocurrency features
- **eruda**: Mobile debugging tool (development only)

### Development Environment Handling
The app includes sophisticated environment detection:
- Automatically mocks Telegram environment when running outside Telegram
- Platform-specific handling for macOS (due to Telegram client bugs)
- Debug mode with eruda for mobile development
- HTTPS support for Telegram compatibility

### CSS and Styling
- Uses CSS modules and BEM methodology (see src/css/bem.ts)
- Telegram UI styles are imported first to allow overrides
- Theme parameters are bound to CSS variables for dynamic theming

## Important Notes

- The project requires npm (not yarn/pnpm) due to package-lock.json
- HTTPS development server is recommended for Telegram integration testing
- The mockEnv.ts file should not be used in production
- GitHub Pages deployment is pre-configured with automated workflows
- TON Connect manifest is located in public/tonconnect-manifest.json and needs configuration for production use

## TypeScript Configuration
- Uses path mapping with @/ alias pointing to src/
- Strict TypeScript checking enabled
- Vite handles TypeScript compilation with SWC for fast builds