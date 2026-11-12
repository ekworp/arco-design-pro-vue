#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');
const { spawnSync } = require('node:child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const PACKAGE_JSON = require(path.join(ROOT_DIR, 'package.json'));
const TEMPLATES = {
  vite: {
    label: 'Vite',
    script: 'vite.js',
    simple: false,
  },
  'vite-simple': {
    label: 'Vite Simple',
    script: 'vite.js',
    simple: true,
  },
};
const PACKAGE_MANAGERS = ['pnpm', 'npm', 'yarn', 'bun'];

function printHelp() {
  console.log(`
${PACKAGE_JSON.name} v${PACKAGE_JSON.version}

Create a new Arco Design Pro project.

Usage:
  pnpx ${PACKAGE_JSON.name} init [project-name] [options]

Options:
  --template <name>  Template to use: vite, vite-simple (default: vite)
  --pm <name>        Package manager: pnpm, npm, yarn, bun
  --simple           Use the Vite Simple template
  --install          Install dependencies after generation
  --no-install       Skip dependency installation
  --git              Initialize a Git repository
  --no-git           Skip Git initialization
  --force            Allow generating into a non-empty directory
  --overwrite        Remove existing files before generating
  --interactive      Force interactive mode
  --no-interactive   Disable interactive mode
  -h, --help         Show this help message
  -v, --version      Show the package version
`);
}

function parseArgs(args) {
  const options = {
    template: undefined,
    packageManager: undefined,
    projectName: undefined,
    install: undefined,
    git: undefined,
    force: false,
    overwrite: false,
    interactive: undefined,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === '--') continue;
    if (arg === '-h' || arg === '--help') options.help = true;
    else if (arg === '-v' || arg === '--version') options.version = true;
    else if (arg === '--simple') options.template = 'vite-simple';
    else if (arg === '--install') options.install = true;
    else if (arg === '--no-install') options.install = false;
    else if (arg === '--git') options.git = true;
    else if (arg === '--no-git') options.git = false;
    else if (arg === '--force') options.force = true;
    else if (arg === '--overwrite') options.overwrite = true;
    else if (arg === '--interactive') options.interactive = true;
    else if (arg === '--no-interactive') options.interactive = false;
    else if (arg === '--template' || arg === '--pm') {
      const value = args[++index];
      if (arg === '--template') options.template = value;
      else options.packageManager = value;
    } else if (arg.startsWith('--template=')) {
      options.template = arg.slice('--template='.length);
    } else if (arg.startsWith('--pm=')) {
      options.packageManager = arg.slice('--pm='.length);
    } else if (!arg.startsWith('-') && !options.projectName) {
      options.projectName = arg;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  return options;
}

function executable(name) {
  if (process.platform !== 'win32') return name;
  if (path.isAbsolute(name) || name.includes(path.sep)) return name;
  return ['npm', 'pnpm', 'yarn'].includes(name) ? `${name}.cmd` : name;
}

function spawnCommand(command, args) {
  if (process.platform === 'win32' && ['npm', 'pnpm', 'yarn'].includes(command)) {
    return ['cmd.exe', ['/d', '/s', '/c', [executable(command), ...args].join(' ')]];
  }
  return [executable(command), args];
}

function isAvailable(name) {
  const [command, args] = spawnCommand(name, ['--version']);
  const result = spawnSync(command, args, {
    stdio: 'ignore',
  });
  return result.status === 0;
}

function detectPackageManager() {
  const userAgent = process.env.npm_config_user_agent || '';
  const detected = userAgent.split('/')[0];
  if (PACKAGE_MANAGERS.includes(detected) && isAvailable(detected)) return detected;
  return PACKAGE_MANAGERS.find(isAvailable) || 'npm';
}

async function ask(question, defaultValue) {
  const suffix = defaultValue === undefined ? ' ' : ` (${defaultValue}) `;
  const answer = await question.rl.question(`${question.text}${suffix}`);
  return answer.trim() || defaultValue;
}

async function promptOptions(options) {
  const interactive = options.interactive ?? (process.stdin.isTTY && process.stdout.isTTY);
  if (!interactive) return options;

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const question = { rl, text: '' };
  try {
    if (!options.projectName) {
      question.text = 'Project name:';
      options.projectName = await ask(question);
    }
    if (!options.template) {
      question.text = 'Template (vite/vite-simple):';
      options.template = await ask(question, 'vite');
    }
    if (!options.packageManager) {
      question.text = 'Package manager (pnpm/npm/yarn/bun):';
      options.packageManager = await ask(question, detectPackageManager());
    }
    if (options.install === undefined) {
      question.text = 'Install dependencies now? [Y/n]';
      options.install = (await ask(question, 'Y')).toLowerCase() !== 'n';
    }
    if (options.git === undefined) {
      question.text = 'Initialize Git repository? [Y/n]';
      options.git = (await ask(question, 'Y')).toLowerCase() !== 'n';
    }
  } finally {
    rl.close();
  }
  return options;
}

function run(command, args, cwd) {
  const [spawnedCommand, spawnedArgs] = spawnCommand(command, args);
  const result = spawnSync(spawnedCommand, spawnedArgs, {
    cwd,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} failed`);
}

function validate(options) {
  if (!options.projectName) throw new Error('A project name is required.');
  if (!TEMPLATES[options.template]) {
    throw new Error(`Unknown template "${options.template}". Use vite or vite-simple.`);
  }
  if (!PACKAGE_MANAGERS.includes(options.packageManager)) {
    throw new Error(`Unknown package manager "${options.packageManager}".`);
  }
  if (!isAvailable(options.packageManager)) {
    throw new Error(`Package manager "${options.packageManager}" is not installed.`);
  }
}

function toPackageName(projectPath) {
  const name = path.basename(projectPath).trim().toLowerCase();
  return name
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-') || 'vite-project';
}

function prepareGeneratedProject(projectPath, packageManager) {
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = toPackageName(projectPath);
    fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
  }

  const lockFiles = {
    pnpm: ['package-lock.json', 'yarn.lock', 'bun.lock', 'bun.lockb'],
    npm: ['pnpm-lock.yaml', 'yarn.lock', 'bun.lock', 'bun.lockb'],
    yarn: ['pnpm-lock.yaml', 'package-lock.json', 'bun.lock', 'bun.lockb'],
    bun: ['pnpm-lock.yaml', 'package-lock.json', 'yarn.lock'],
  };
  for (const lockFile of lockFiles[packageManager]) {
    const lockPath = path.join(projectPath, lockFile);
    if (fs.existsSync(lockPath)) fs.rmSync(lockPath, { force: true });
  }
}

function emptyDirectory(directory) {
  for (const entry of fs.readdirSync(directory)) {
    if (entry !== '.git') {
      fs.rmSync(path.join(directory, entry), { recursive: true, force: true });
    }
  }
}

async function confirmOverwrite(options, projectPath) {
  if (!fs.existsSync(projectPath) || fs.readdirSync(projectPath).length === 0) return true;
  if (options.overwrite) {
    emptyDirectory(projectPath);
    return true;
  }
  if (options.force) return true;
  const interactive = options.interactive ?? (process.stdin.isTTY && process.stdout.isTTY);
  if (!interactive) {
    throw new Error(`Directory is not empty: ${projectPath}. Use --force or --overwrite.`);
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await rl.question(
      `Directory is not empty: ${projectPath}. Overwrite existing files? [y/N] `
    );
    if (answer.trim().toLowerCase() !== 'y') return false;
    emptyDirectory(projectPath);
    return true;
  } finally {
    rl.close();
  }
}

async function main() {
  const [command = 'init', ...args] = process.argv.slice(2);
  if (command === '--help' || command === '-h') return printHelp();
  if (command === '--version' || command === '-v') return console.log(PACKAGE_JSON.version);
  if (command !== 'init') throw new Error(`Unknown command "${command}". Use "init".`);

  const options = parseArgs(args);
  if (options.help) return printHelp();
  if (options.version) return console.log(PACKAGE_JSON.version);
  await promptOptions(options);
  if (options.projectName === undefined) options.projectName = 'vite-project';
  if (options.template === undefined) options.template = 'vite';
  if (options.packageManager === undefined) options.packageManager = detectPackageManager();
  const interactive = options.interactive ?? (process.stdin.isTTY && process.stdout.isTTY);
  if (options.install === undefined) options.install = interactive;
  if (options.git === undefined) options.git = interactive;
  validate(options);

  const projectPath = path.resolve(process.cwd(), options.projectName);
  fs.mkdirSync(projectPath, { recursive: true });
  if (!(await confirmOverwrite(options, projectPath))) {
    console.log('Cancelled.');
    return;
  }

  const template = TEMPLATES[options.template];
  const scriptArgs = [`--projectPath=${projectPath}`];
  if (template.simple) scriptArgs.push('--simple');
  console.log(`\nCreating ${template.label} project in ${projectPath}...`);
  run(process.execPath, [path.join(ROOT_DIR, 'scripts', template.script), ...scriptArgs], ROOT_DIR);
  prepareGeneratedProject(projectPath, options.packageManager);

  if (options.install) {
    console.log(`\nInstalling dependencies with ${options.packageManager}...`);
    run(options.packageManager, ['install'], projectPath);
  }
  if (options.git && !fs.existsSync(path.join(projectPath, '.git'))) {
    console.log('\nInitializing Git repository...');
    run('git', ['init'], projectPath);
  }

  const displayPath = path.relative(process.cwd(), projectPath) || '.';
  const cdPath = displayPath.includes(' ') ? `"${displayPath}"` : displayPath;
  console.log(`\nDone. Start your project with:\n  cd ${cdPath}\n  ${options.packageManager} run dev\n`);
}

main().catch((error) => {
  console.error(`\nError: ${error.message}`);
  process.exitCode = 1;
});
