# Spear Education Fetch Secret JS Action
*Note: This action is designed to be compatible within Spear's ecosystem.

Fetches a secret from AWS Secrets Manager and installs it at the specified location in .env format

## Inputs

### `secretPath`
**Required** The name of the secret

### `targetFile`
**Required** The filename for the secret

### `branchName`
**Optional** The name of the branch to replaced {branch} tokens with.

## Example usage
```
- id: fetch-secret
  name: Fetch Secret
  uses: speareducation/action-fetch-secret@main
  env:
    AWS_REGION: us-east-1
    AWS_ACCESS_KEY_ID: ${{ secrets.SPEAR_AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.SPEAR_AWS_SECRET_ACCESS_KEY }}
  with:
    secretPath: path/to/the/secret
    targetFile: .env
```
