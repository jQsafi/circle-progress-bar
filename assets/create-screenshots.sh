#!/usr/bin/env zsh

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for required dependencies
if ! command_exists "screencapture"; then
    echo "Error: screencapture is required but not found."
    exit 1
fi

# Check if running on macOS
if [[ "$(uname)" != "Darwin" ]]; then
    echo "This script is designed for macOS. Please use appropriate screenshot tools for your OS."
    exit 1
fi

# Create screenshots directory if it doesn't exist
mkdir -p "assets"

# Instructions for taking screenshots
echo "Please follow these steps to create screenshots:"
echo "1. Open assets/screenshot-template.html in your browser"
echo "2. Use the screenshot tool to capture each section:"
echo "   - screenshot-1.png: Circle Progress Bar in action"
echo "   - screenshot-2.png: Block settings panel"
echo "   - screenshot-3.png: Different style variations"
echo ""
echo "Press any key to continue..."
read -k1 -s

# Open the template in the default browser
open "assets/screenshot-template.html"

# Function to capture screenshot
capture_screenshot() {
    local number=$1
    local description=$2
    echo "Please capture screenshot $number: $description"
    echo "Position your cursor and press Enter to capture..."
    read -k1 -s
    screencapture -i "assets/screenshot-$number.png"
    echo "Screenshot $number saved!"
    echo ""
}

# Capture each screenshot
capture_screenshot 1 "Circle Progress Bar in action"
capture_screenshot 2 "Block settings panel"
capture_screenshot 3 "Different style variations"

echo "Screenshots have been saved to the assets directory."
echo "Please verify the screenshots and edit them if needed."
