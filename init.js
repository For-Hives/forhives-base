const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');

inquirer.prompt([{
	type: 'input',
	name: 'projectName',
	message: 'Project name:',
	validate: input => input ? true : 'Project name cannot be empty.'
}]).then(answers => {
	const projectName = answers.projectName;
	const projectPath = path.join(process.cwd(), projectName);
	const templatePath = path.join(__dirname, 'template');

	if (fs.existsSync(projectPath)) {
		console.error(`A folder with the name ${projectName} already exists.`);
		process.exit(1);
	}

	fs.copySync(templatePath, projectPath);

	// Read the package.json from the template
	const packageJsonPath = path.join(projectPath, 'package.json');
	const packageJson = fs.readJsonSync(packageJsonPath);

	// Modify the project name
	packageJson.name = projectName;

	// Write the modifications
	fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

	console.log(`Project ${projectName} has been successfully created. Please follow the README instructions to get started.`);
});
