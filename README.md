# Workshop Wizard 🪄

Workshop Wizard is a tool that can help you generate complete, beginner-friendly coding workshops using AI. I built this project to make it easy for anyone—especially those with little to no coding experience—to turn their creative ideas into detailed, step-by-step guides.

Also, because I'm lazy and don't want to keep suggesting workshop ideas to Hack Club members on the Slack.

This is a personal project, and I don't plan to maintain it. If you want to use it, go ahead. If you want to improve it, please do. If you want to fork it and make your own version, be my guest.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org) (v14 or above recommended)
- [pnpm](https://pnpm.io) or npm

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/cytronicoder/workshop-wizard.git
   cd workshop-wizard
   ```

2. Install server dependencies:

   ```bash
   cd server
   pnpm install
   ```

3. Open a new terminal window or tab, then:

   ```bash
   cd client
   pnpm install
   ```

## Usage

In the server directory, start the Express server:

```bash
pnpm start
```

The server will listen on the port specified in the environment variable (default is 3001).

Then, in the client directory, start the React application:

```bash
pnpm start
```

This will open the application in your default web browser. You can then input a workshop idea or click "Surprise Me!" to generate a random prompt. The generated workshop will be displayed in both preview and editor tabs.

## Contributing

I'm currently only accepting contributions that improves the prompting system. That is, if you can make the AI generate better workshops, please open a pull request. If not, then just fork the repo and make your own version of the app. I don't care.

Also, this is meant to be deployed on a server, but I don't have the time to set that up. So, if you find a way to safely restructure the repo to make it deployable (on Vercel, for example), please do so and open a pull request. I will merge it and shower you with free clout.

## Acknowledgements

- [Malted](https://github.com/malted) for being so cool and developing [ai.hackclub.com](https://ai.hackclub.com); now I occasionally abuse the endpoint (also there's no rate limit implemented, so if you add that, please open a pull request too thx)
- [Hack Club](https://hackclub.com) for being an amazing ~~annoying~~ community and inspiring me to build this project

## License

This project is open-source and available under the [MIT License](LICENSE). I'm so generous.
