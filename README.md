# open-ai-agent-sdk-hello-world

A minimal "hello world" for the [OpenAI Agents SDK for JavaScript](https://github.com/openai/openai-agents-js) (`@openai/agents`), wired to run against a **local, OpenAI-compatible model server** (for example LM Studio, Ollama, llama.cpp server, or vLLM) instead of the OpenAI cloud.

## What it does

`index.js`:

1. Creates an `OpenAI` client pointed at your local server (`baseURL` from `.env`).
2. Makes it the SDK's default client, switches the SDK to the **Chat Completions** API (most local servers don't implement the Responses API), and turns off tracing so nothing gets uploaded to OpenAI.
3. Defines a `Hello Agent` whose instructions change with the `location` variable:
   - `'india'`: greets with "namaste" and says hello world with the user's name
   - anything else: just chats with the user
4. Runs the agent once on a sample message and prints the final output.

## Requirements

- Node.js 18 or newer (the project uses ES modules)
- A running OpenAI-compatible server with a model loaded

## Setup

```bash
npm install
```

Create a `.env` file in the project root:

```env
baseURL=http://localhost:1234/v1
model=your-model-name
```

| Variable  | Description                                                                      |
| --------- | -------------------------------------------------------------------------------- |
| `baseURL` | URL of your server's OpenAI-compatible endpoint, usually ending in `/v1`         |
| `model`   | Model ID exactly as your server reports it (check `GET <baseURL>/models`)        |

Common default endpoints:

- LM Studio: `http://localhost:1234/v1`
- Ollama: `http://localhost:11434/v1`

`.env` is git-ignored, so your local settings stay out of the repo.

## Run

```bash
node index.js
```

> Note: `npm start` currently runs `node node.js`, but the entry file is `index.js`. Use the command above, or change `"main"` and `"start"` in `package.json` to `index.js`.

## Customize

- **Change the greeting behavior:** set `const location = 'india';` in `index.js`.
- **Change the input:** edit the message passed to `run(helloAgent, '...')`.
- **Use OpenAI's hosted API instead:** remove the custom client setup and set `OPENAI_API_KEY` in `.env`.

## Troubleshooting

- **`Agent run failed: Connection error`**: the local server isn't running, or `baseURL` is wrong.
- **Model not found errors**: `model` in `.env` doesn't match a model your server has loaded.
- **Empty or odd responses**: some small local models follow instructions poorly. Try a larger or instruction-tuned model.

## Dependencies

- [`@openai/agents`](https://www.npmjs.com/package/@openai/agents): Agents SDK
- [`openai`](https://www.npmjs.com/package/openai): OpenAI API client
- [`dotenv`](https://www.npmjs.com/package/dotenv): loads `.env`
- [`zod`](https://www.npmjs.com/package/zod): schema validation (used by the SDK for tool parameters)
