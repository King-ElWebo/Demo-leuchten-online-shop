import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'AGENTS.md',
  'README.md',
  'docs/project/SITE.md',
  'docs/project/DESIGN.md',
  'docs/project/CONTENT.md',
  'docs/project/ACCEPTANCE.md',
  'docs/system/ENGINEERING.md',
  'docs/system/STACK.md',
  'docs/system/TOOLING.md',
  'docs/system/RUNBOOK.md',
  'docs/system/ANTIGRAVITY.md',
  '.agents/skills/README.md',
  '.agents/rules/00-showcase-orchestration.md',
  '.agents/rules/code-quality.md',
  '.agents/rules/design-quality.md',
  '.agents/rules/responsive-accessibility.md',
  '.agents/rules/motion-quality.md',
  '.agents/rules/qa-completion.md',
  'references/README.md',
  'concepts/README.md',
];
const projectDocuments = [
  'docs/project/SITE.md',
  'docs/project/DESIGN.md',
  'docs/project/CONTENT.md',
  'docs/project/ACCEPTANCE.md',
];
const failures = [];

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter(
        (entry) => !['node_modules', '.next', 'artifacts'].includes(entry.name),
      )
      .map(async (entry) => {
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) return markdownFiles(entryPath);
        return entry.isFile() && entry.name.endsWith('.md') ? [entryPath] : [];
      }),
  );
  return nested.flat();
}

for (const relativePath of requiredFiles) {
  if (!(await exists(path.join(root, relativePath)))) {
    failures.push(`Missing required documentation: ${relativePath}`);
  }
}

const agentsPath = path.join(root, 'AGENTS.md');
if (await exists(agentsPath)) {
  const agentsContent = await readFile(agentsPath, 'utf8');
  const requiredAgentReferences = [
    'docs/system/RUNBOOK.md',
    'docs/system/ANTIGRAVITY.md',
    '.agents/rules/00-showcase-orchestration.md',
  ];

  for (const reference of requiredAgentReferences) {
    if (!agentsContent.includes(reference)) {
      failures.push(`AGENTS.md does not reference ${reference}.`);
    }
  }
}

const readmePath = path.join(root, 'README.md');
if (await exists(readmePath)) {
  const readmeContent = await readFile(readmePath, 'utf8');
  if (
    !readmeContent.includes('/goal') ||
    !readmeContent.includes(
      'Execute the complete Antigravity-first Showcase Website Factory Direct Build',
    )
  ) {
    failures.push('README.md does not expose the Antigravity /goal prompt.');
  }
}

for (const relativePath of projectDocuments) {
  const absolutePath = path.join(root, relativePath);
  if (!(await exists(absolutePath))) continue;

  const content = await readFile(absolutePath, 'utf8');
  const status = content.match(
    /Specification status:\s*`?(TEMPLATE_NOT_CONFIGURED|READY)`?/u,
  )?.[1];
  const hasRequiredMarker = content.includes(
    '[REQUIRED: replace before production run]',
  );

  if (!status)
    failures.push(`${relativePath} has no valid specification status.`);
  if (status === 'TEMPLATE_NOT_CONFIGURED' && !hasRequiredMarker) {
    failures.push(
      `${relativePath} is a template but has no required-field marker.`,
    );
  }
  if (status === 'READY' && hasRequiredMarker) {
    failures.push(
      `${relativePath} is READY but still contains required-field markers.`,
    );
  }
}

for (const filePath of await markdownFiles(root)) {
  const content = await readFile(filePath, 'utf8');
  const linkPattern = /!?(?:\[[^\]]*\])\(([^)]+)\)/gu;

  for (const match of content.matchAll(linkPattern)) {
    const rawTarget = match[1].trim().replace(/^<|>$/gu, '');
    if (/^(?:[a-z]+:|#)/iu.test(rawTarget)) continue;

    const withoutAnchor = rawTarget.split('#', 1)[0].split('?', 1)[0];
    if (!withoutAnchor) continue;

    let decodedTarget;
    try {
      decodedTarget = decodeURIComponent(withoutAnchor);
    } catch {
      failures.push(
        `${path.relative(root, filePath)} has an invalid encoded link: ${rawTarget}`,
      );
      continue;
    }

    const targetPath = decodedTarget.startsWith('/')
      ? path.join(root, decodedTarget.slice(1))
      : path.resolve(path.dirname(filePath), decodedTarget);

    if (!(await exists(targetPath))) {
      failures.push(
        `${path.relative(root, filePath)} links to missing path: ${rawTarget}`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error(`Documentation check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Documentation check passed for ${requiredFiles.length} required files.`,
  );
}
