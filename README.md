# The Filter Bubble Garden

An interactive educational web application that visualizes the "filter bubble" phenomenon — how recommendation algorithms shape and narrow what you see online. Built with React, TypeScript, and Tailwind CSS.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with an overview and links into the garden |
| `/garden` | Interactive garden visualization. Click plants to grow interests, reveal the algorithm's root network, break the bubble, and reset |
| `/how-it-works` | Explains the 4-step feedback loop behind filter bubbles |
| `/your-attention` | Real-world examples of how algorithms shape social media, news, entertainment, and shopping |
| `/accessibility` | Detailed accessibility settings (text size, theme, high contrast, reduce motion, color blind mode) |
| `/about` | Meet the team behind the project |

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** for bundling and dev server
- **Tailwind CSS 4** for styling
- **React Router v7** for routing
- **Lucide React** for icons
- **Web Speech API** for voice commands and read-aloud

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd thrive

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Type-check and build
npm run build

# Preview the production build
npm run preview
```

### Linting

```bash
npm run lint
```

## Features

### Interactive Garden
- Click on plants (News, Comedy, Politics, Science, Art, Hobbies) to grow their engagement
- Watch the garden diversity score change in real time
- Reveal the underground "algorithm" root network
- Break the bubble to redistribute attention to neglected topics
- Use the timeline slider to simulate future garden states

### Accessibility Features
- **Text Size**: Cycles through normal, large, and x-large (applies site-wide)
- **Theme Toggle**: Switch between light and dark themes (available in navbar and floating toolbar)
- **High Contrast**: Maximum contrast mode for low vision users
- **Reduce Motion**: Disables all animations and transitions site-wide
- **Color Blind Mode**: Choose from four color vision deficiency profiles (Deuteranopia, Protanopia, Tritanopia, Achromatopsia)
- **Read Aloud**: Uses the Web Speech API to read page content aloud
- **Voice Commands**: Control the site via the microphone icon

### Floating Toolbar
The floating accessibility toolbar in the bottom-right corner is fully customizable:
- **Move it**: Click and drag the "Accessibility" header to reposition it anywhere on screen (position is remembered)
- **Collapse it**: Click the minus (`-`) button to collapse it into a compact icon-only strip
- **Hide it**: Click the `X` to hide the whole toolbar — a small accessibility button reappears in the bottom-right corner to bring it back
- **Toggle labels**: Click the text/lines icon in the header to show or hide the text labels on the buttons (icons remain)
- All toolbar preferences (position, collapsed/expanded, labels visibility) are saved to `localStorage` per-session

### Voice Commands
The microphone icon in the floating toolbar listens for these commands:

| Say This | What It Does |
|----------|--------------|
| "Go home" / "Home page" | Navigate to the home page |
| "Enter the garden" / "Open garden" | Navigate to the garden |
| "Reveal the algorithm" / "Show roots" | Show the underground algorithm root network |
| "Hide roots" / "Hide algorithm" | Hide the root network |
| "Break the bubble" | Redistribute attention to neglected topics |
| "Reset garden" | Reset the garden to day 1 |
| "Grow Politics" / "Grow Science" (etc.) | Grow a specific topic plant |
| "Open accessibility" | Navigate to accessibility settings |
| "Increase text" / "Larger text" | Increase text size |
| "Normal text" | Reset text size |
| "Enable high contrast" / "Disable high contrast" | Toggle high contrast mode |
| "Toggle theme" / "Light mode" / "Dark mode" | Switch between light and dark themes |
| "Enable color blind" / "Color blind" | Enable color blind friendly mode |
| "Disable color blind" | Disable color blind mode |
| "Read this page" | Read the current page aloud |

> **Note**: Voice recognition requires a browser that supports the Web Speech API (Chrome, Edge, Safari). Firefox has limited support.

### How to Use the Garden

1. **Click a plant** repeatedly to feed it attention — it grows larger.
2. **Watch the diversity score** (top-left HUD panel) decrease as one plant dominates.
3. **Reveal the algorithm** to see the underground root network connecting your interests.
4. **Break the bubble** when the garden becomes a monoculture to restore diversity.
5. **Reset** to start fresh.

## Accessibility

All preferences are saved to `localStorage` and persist across sessions.

### Color Blind Profiles
| Profile | Description | Difficulty |
|---------|-------------|------------|
| Deuteranopia | Most common red-green deficiency | Green appears muted |
| Protanopia | Red-green deficiency | Red appears muted |
| Tritanopia | Blue-yellow deficiency | Blue/yellow confusion |
| Achromatopsia | Complete color blindness | Full grayscale |

## Project Structure

```
thrive/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── AccessibilityToolbar.tsx   # Floating accessibility controls
│   │   ├── Footer.tsx                 # Site footer
│   │   ├── Navbar.tsx                 # Navigation bar
│   │   └── garden/
│   │       ├── FilterBubbleGarden.tsx # Main garden container (includes diversity HUD panel)
│   │       ├── GardenPlant.tsx        # Individual clickable plant
│   │       ├── RootNetwork.tsx        # Algorithm root visualization
│   │       └── AlgorithmReveal.tsx    # Reveal/hide algorithm button
│   ├── context/
│   │   ├── AccessibilityContext.tsx   # Global accessibility state
│   │   └── GardenContext.tsx          # Garden plant/engagement state
│   ├── hooks/
│   │   └── useVoiceCommand.ts         # Voice recognition hook
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Garden.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── YourAttention.tsx
│   │   ├── Accessibility.tsx
│   │   └── AboutTeam.tsx
│   ├── App.tsx                # Route definitions
│   ├── main.tsx               # Entry point
│   └── index.css              # Tailwind + global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Team

| Name | Reg. No |
|------|---------|
| S Sri Venkateswaran | 727824TUCS410 |
| S Swathi | 727824TUCS428 |
| M Srihari | 727824TUCS412 |

**Class**: CSE I  
**Department**: B.E Computer Science and Engineering  
**Year**: III Year

## License

&copy; 2026 Filter Bubble Garden. All rights reserved. Created for the THRIVE 2026 challenge.
