import 'dotenv/config';
import OpenAI from 'openai';
import {
  Agent,
  run,
  setDefaultOpenAIClient,
  setOpenAIAPI,
  setTracingDisabled,
} from '@openai/agents';

// Point the Agents SDK at the local model server (OpenAI-compatible API).
const client = new OpenAI({
  baseURL: process.env.baseURL,
  apiKey: 'not-needed', // local server ignores it, but the OpenAI client requires a value
});

setDefaultOpenAIClient(client);
setOpenAIAPI('chat_completions'); // local servers speak Chat Completions, not the Responses API
setTracingDisabled(true); // don't try to upload traces to OpenAI

const location = 'us';

const helloAgent = new Agent({
  name: 'Hello Agent',
  instructions: function () {
    if (location === 'india') {
      return 'Always say namaste and then You are an agent that always says hello world with users name';
    } else {
      return 'That just talk to the user';
    }
  },
  model: process.env.model
});

run(helloAgent, 'Hey There, My name is Rahul Kumar')
  .then((result) => {
    console.log(result.finalOutput);
  })
  .catch((err) => {
    console.error('Agent run failed:', err.message);
    if (err.cause) console.error('Cause:', err.cause.message ?? err.cause);
  });
