import fs from 'node:fs';

const args = process.argv.slice(2);

switch (args.length) {
  case 0:
    console.error(
      'Erro: Parâmetros não informados\nExemplo de uso: node update-changelog.js <new_version> <repo_owner> <repo_name>',
    );
    process.exit(1);
  case 1:
    console.error(
      'Erro: Parâmetros de dono do repositório e nome de repositório não informados\nExemplo de uso: node update-changelog.js <new_version> <repo_owner> <repo_name>',
    );
    process.exit(1);
  case 2:
    console.error(
      'Erro: Parâmetro de nome de repositório não informado\nExemplo de uso: node update-changelog.js <new_version> <repo_owner> <repo_name>',
    );
    process.exit(1);
}

const NEW_VERSION = args[0];
const REPO_OWNER = args[1];
const REPO_NAME = args[2];
const CHANGELOG_PATH = 'CHANGELOG.md';

function setNewVersion(content) {
  return content.replace(
    '## [Unreleased]',
    `## [Unreleased]\n\n## [${NEW_VERSION}] - ${new Date().toISOString().split('T')[0]}`,
  );
}

function setChangelogLinks(content) {
  let newContent = content;

  const changelogBaseUrl = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
  const unreleasedLink = `[unreleased]: ${changelogBaseUrl}/compare/v${NEW_VERSION}...HEAD`;
  const lastVersionMatch = content.match(/^\[\d+.\d+.\d+\]:/m);
  const lastVersion =
    lastVersionMatch !== null
      ? lastVersionMatch[0].replace(/[\[\]:]/g, '')
      : null;

  if (lastVersion !== null) {
    const newVersionPath = `/compare/v${lastVersion}...v${NEW_VERSION}`;
    const newVersionLink = `[${NEW_VERSION}]: ${changelogBaseUrl}${newVersionPath}`;

    newContent = content.replace(
      /^\[unreleased\]: .*/m,
      `${unreleasedLink}\n${newVersionLink}`,
    );
  } else {
    const newVersionPath = `/releases/tag/v${NEW_VERSION}`;
    const newVersionLink = `[${NEW_VERSION}]: ${changelogBaseUrl}${newVersionPath}`;

    newContent = content + `\n${unreleasedLink}\n${newVersionLink}`;
  }

  return newContent;
}

const fileContent = fs.readFileSync(CHANGELOG_PATH, 'utf8');

let newContent = setNewVersion(fileContent);
newContent = setChangelogLinks(newContent);

fs.writeFileSync(CHANGELOG_PATH, newContent);
