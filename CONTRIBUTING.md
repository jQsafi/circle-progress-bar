# Contributing to Circle Progress Bar Block

Thank you for your interest in contributing to the Circle Progress Bar Block! This document outlines the process for development and contribution.

## Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jqsafi/circle-progress-bar.git
   cd circle-progress-bar
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Available Scripts**
   - `npm start` - Start development server with live reload
   - `npm run build` - Build production version
   - `npm run lint:js` - Run JavaScript linting
   - `npm run lint:style` - Run style linting
   - `npm run format:js` - Format JavaScript code
   - `npm run makepot` - Generate translation template

## Project Structure

```
circle-progress-bar/
├── src/
│   └── index.js          # Main source code
├── build/                # Compiled files (generated)
│   ├── index.js
│   └── index.asset.php
├── languages/           # Translations
└── assets/             # Static assets
```

## Build Process

The plugin uses [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) for development and build tooling:

1. **Development**
   - Run `npm start` to start development server
   - Make changes in `src/index.js`
   - Changes will automatically reload in the editor

2. **Production Build**
   - Run `npm run build` to create production files
   - Files are generated in the `build/` directory
   - Generated files are minified and optimized

## Code Standards

- Follow [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- Use ESLint and Prettier for code formatting
- Write clear commit messages
- Document code changes and new features

## Testing

1. Build the plugin: `npm run build`
2. Test in a local WordPress environment
3. Verify block works in both editor and frontend
4. Check compatibility with different themes

## Creating a Pull Request

1. Create a new branch for your changes
2. Make your changes and commit them
3. Run linting and build process
4. Push changes and create a pull request
5. Describe your changes in the PR description

## License

By contributing to the Circle Progress Bar Block, you agree that your contributions will be licensed under the GPL-2.0 license.
