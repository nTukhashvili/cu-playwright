# Playwright Test Automation Project

This project contains comprehensive Playwright test automation examples and exercises for learning web testing fundamentals.

## 📁 Project Structure

```
cu-playwright/
├── pages/                    # Page Object Model classes
│   ├── login-page.js        # Login page interactions
│   └── product-page.js      # Product page interactions
├── tests/                   # Test files organized by topics
│   ├── lecture-3.spec.js    # Locator examples and strategies
│   ├── lecture-4/           # Basic interactions and alerts
│   ├── lecture-5/           # Advanced interactions and file handling
│   ├── lecture-6/           # Page Object Model examples
│   └── sauce-demo.spec.js   # SauceDemo application tests
├── tests-examples/          # Additional example tests
├── playwright.config.js     # Playwright configuration
└── package.json            # Project dependencies
```

## 🚀 Installation

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

### Platform-Specific Installation

#### Windows
```bash
# Install Node.js from https://nodejs.org/
# Open Command Prompt or PowerShell as Administrator

# Clone or download the project
cd cu-playwright

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Install system dependencies (if needed)
npx playwright install-deps
```

#### macOS
```bash
# Install Node.js using Homebrew
brew install node

# Navigate to project directory
cd cu-playwright

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Install system dependencies
npx playwright install-deps
```

#### Linux (Ubuntu/Debian)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Navigate to project directory
cd cu-playwright

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Install system dependencies
sudo npx playwright install-deps
```

#### Linux (CentOS/RHEL/Fedora)
```bash
# Install Node.js
sudo dnf install nodejs npm

# Navigate to project directory
cd cu-playwright

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Install system dependencies
sudo npx playwright install-deps
```

## 🎯 Running Tests

### Basic Commands

#### Run All Tests
```bash
# Run all tests in headless mode
npx playwright test

# Run tests with HTML reporter
npx playwright test --reporter=html
```

#### Run Specific Test Files
```bash
# Run a specific test file
npx playwright test tests/example.spec.js

# Run tests in a specific directory
npx playwright test tests/lecture-4/

# Run tests matching a pattern
npx playwright test --grep "login"
```

### 🖥️ Headed Mode (Visual Browser)

#### Run Tests with Browser UI
```bash
# Run all tests in headed mode (shows browser)
npx playwright test --headed

# Run specific test in headed mode
npx playwright test tests/sauce-demo.spec.js --headed

# Run tests in headed mode with slow motion
npx playwright test --headed --slowMo=1000
```

#### Run Tests in Specific Browser
```bash
# Run in Chrome
npx playwright test --project=chromium --headed

# Run in Firefox
npx playwright test --project=firefox --headed

# Run in Safari (macOS only)
npx playwright test --project=webkit --headed
```

### 🐛 Debug Mode

#### Interactive Debug Mode
```bash
# Debug mode - opens browser and pauses at breakpoints
npx playwright test --debug

# Debug specific test
npx playwright test tests/sauce-demo.spec.js --debug

# Debug with inspector
npx playwright test --debug --headed
```

#### Step-by-Step Debugging
```bash
# Run with Playwright Inspector
npx playwright test --ui

# Debug from specific line (add to test code)
# await page.pause();
```

### 🎮 Interactive UI Mode
```bash
# Launch Playwright UI for interactive test running
npx playwright test --ui

# UI mode allows you to:
# - Run tests interactively
# - See test results in real-time
# - Debug failing tests
# - View trace files
```

### 📊 Reports and Traces

#### Generate Reports
```bash
# Generate HTML report
npx playwright test --reporter=html

# Open HTML report
npx playwright show-report

# Generate trace files for debugging
npx playwright test --trace=on
```

#### View Traces
```bash
# Open trace viewer
npx playwright show-trace trace.zip

# Run with trace on failure
npx playwright test --trace=retain-on-failure
```

### 🔧 Advanced Commands

#### Configuration Options
```bash
# Run with custom config file
npx playwright test --config=custom.config.js

# Run with specific timeout
npx playwright test --timeout=60000

# Run tests in parallel
npx playwright test --workers=4

# Run tests with retries
npx playwright test --retries=2
```

#### Environment-Specific Commands
```bash
# Run with environment variables
BASE_URL=https://staging.example.com npx playwright test

# Run with custom viewport
npx playwright test --config=playwright.config.js

# Run tests with authentication
npx playwright test --project=authenticated
```

### 📝 Useful Development Commands

#### Code Generation
```bash
# Generate test code by recording interactions
npx playwright codegen https://example.com

# Generate code for specific device
npx playwright codegen --device="iPhone 12" https://example.com
```

#### Installation and Setup
```bash
# Update Playwright to latest version
npm install @playwright/test@latest

# Check Playwright installation
npx playwright --version

# Install specific browser
npx playwright install chromium
```

## 🎓 Learning Examples

### Lecture 3 - Locators
- CSS selectors, XPath, text-based locators
- File: `tests/lecture-3.spec.js`

### Lecture 4 - Basic Interactions
- Form filling, button clicks, alerts
- Directory: `tests/lecture-4/`

### Lecture 5 - Advanced Features
- File downloads, multiple tabs, dynamic content
- Directory: `tests/lecture-5/`

### Lecture 6 - Page Object Model
- Organized test structure with page classes
- Directory: `tests/lecture-6/`

## 🔍 Quick Start Example

```bash
# 1. Install dependencies
npm install

# 2. Run example test in headed mode
npx playwright test tests/example.spec.js --headed

# 3. Debug a test interactively
npx playwright test tests/sauce-demo.spec.js --debug

# 4. Generate HTML report
npx playwright test --reporter=html && npx playwright show-report
```

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

## 🆘 Troubleshooting

### Common Issues
1. **Browser not installed**: Run `npx playwright install`
2. **Permission denied**: Use `sudo` on Linux/macOS for system dependencies
3. **Tests failing**: Try running with `--headed` flag to see what's happening
4. **Slow tests**: Use `--workers=1` for sequential execution

### Getting Help
- Check browser console for errors
- Use `await page.pause()` to debug interactively
- Enable trace files with `--trace=on`
- Review HTML reports for detailed test results
