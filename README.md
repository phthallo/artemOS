# artermOS

A 'Web OS'-styled interface for participants in the Athena Program to track their progress towards the Athena Award.

## Development
1. Clone the repository
    ```
    git clone https://github.com/phthallo/artemos && cd artemos
    ```
2. Install dependencies.
    ```
    bun install
    ```
3. Start the development server
    ```
    bun run dev
    ```
### `.env` file

| Variable name | Description | 
| ------------- | ----------- |
| `AUTH_SECRET` | A randomly generated string that is used to encode user secrets 
| `AUTH_URL`    | A URL where your site is accessible, with "/api/auth" appended |
| `SLACK_CLIENT_ID` | Client ID of the Slack App used for OAuth aka the "Sign in with Slack" function | 
| `SLACK_CLIENT_SECRET` | Client secret of the Slack App used for Oauth aka the "Sign in with Slack" function |  
| `AIRTABLE_API_KEY` | Technically now a PAT (personal access token). The token has to have read and write access to the base corresponding to the `AIRTABLE_BASE_ID` |
| `AIRTABLE_BASE_ID` | ID of the main 'Athena Awards' Airtable base[^1] |
