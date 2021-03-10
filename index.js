const { SecretsManager } = require('aws-sdk');
const core = require('@actions/core');
const fs = require('fs');

const secretsManager = new SecretsManager();
const SecretId = core.getInput('secretPath');
const targetFile = core.getInput('targetFile');

function createKeyValue(key, value) {
    return value ? `${key}=${value}` : key; // [production] support
}

async function handle() {
    console.log(`Fetching ${SecretId}`);
    const response = await secretsManager.getSecretValue({ SecretId }).promise();
    console.log(`Retrieved version ${response.VersionId}`);

    const secretData = JSON.parse(response.SecretString);
    
    const secretPayload = Object.keys(secretData)
        .map(key => createKeyValue(key, secretData[key]))
        .join('\n');

    console.log(`Writing secret to ${targetFile}`);
    fs.writeFileSync(targetFile, secretPayload);
}

handle()
    .then(() => console.log('Done'))
    .catch(error => core.setFailed(error));