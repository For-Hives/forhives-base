#!/usr/bin/env node

import inquirer from 'inquirer';
import fsExtra from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const main = async () => {
	const answers = await inquirer.prompt([{
		type: 'input',
		name: 'projectName',
		message: 'Project name:',
		validate: input => input ? true : 'Project name cannot be empty.'
	}]);

	const projectName = answers.projectName;
	const projectPath = path.join(process.cwd(), projectName);
	const templatePath = path.join(__dirname, 'template');

	if (fsExtra.existsSync(projectPath)) {
		console.error(`A folder with the name ${projectName} already exists.`);
		process.exit(1);
	}

	fsExtra.copySync(templatePath, projectPath);

	// Read the package.json from the template
	const packageJsonPath = path.join(projectPath, 'package.json');
	const packageJson = JSON.parse(await fsExtra.readFile(packageJsonPath, 'utf8'));

	// Modify the project name
	packageJson.name = projectName;

	// Write the modifications
	await fsExtra.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

	console.log(`Project ${projectName} has been successfully created. Please follow the README instructions to get started.`);
};

main().catch(e => {
	console.error(e);
	process.exit(1);
});
