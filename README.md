# 10xPromptFormatter

## Table of Contents

- [Project Name](#project-name)
- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Getting Started Locally](#getting-started-locally)
- [Project Scope](#project-scope)
- [Project Status](#project-status)
- [License](#license)

## Project Name

10xPromptFormatter

## Project Description

10xPromptFormatter is an application that enables dynamic text creation with built-in support for variable substitution. The app allows users to paste text containing placeholders in the format `{{variable}}`, automatically detects these variables, and creates dedicated fields for editing each instance. As users modify the values, the final text is dynamically updated and displayed in a read-only panel for easy copying.

## Tech Stack

- **Frontend:** Astro 5, React 19 for interactive components
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4, Shadcn/ui for UI elements
- **Backend:** Supabase for database and backend functionalities
- **AI Integration:** Uses Openrouter.ai for communication with various AI models
- **Others:** Utilizes best practices for building fast, scalable, and modern web applications

## Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (version as specified in `.nvmrc`: 22.14.0)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd 10xPromptFormatter
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

Your application should now be running locally.

## Project Scope

The primary focus of 10xPromptFormatter is to simplify the process of editing and generating dynamic texts. Key features include:

- **Automatic Variable Detection:** Recognizes and extracts all placeholders in the format `{{variable}}` from pasted text.
- **Dynamic Field Creation:** Creates individual editable fields for every instance of the detected variables, even if the variable name is repeated.
- **Real-time Updates:** Dynamically updates the final text as users modify the content of the text area and the individual variable fields.
- **Read-Only Output Panel:** Displays the final generated text in a dedicated, non-editable panel for easy copying.
- **Local and Anonymous Operation:** Designed to operate locally without requiring user authentication or persistent data storage.

## Project Status

This project is currently in the MVP stage. It is under active development, and user feedback is highly encouraged to refine and enhance the application's features and usability.

## License

This project is licensed under the MIT License.
