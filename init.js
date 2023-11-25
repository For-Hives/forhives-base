#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs-extra')
const path = require('path')
const shell = require('shelljs')

inquirer
	.prompt([
		{
			type: 'input',
			name: 'projectName',
			message: 'Project name:',
			validate: input => (input ? true : 'Project name cannot be empty.'),
		},
	])
	.then(answers => {
		const projectName = answers.projectName
		const projectPath = path.join(process.cwd(), projectName)

		if (fs.existsSync(projectPath)) {
			console.error(`A folder with the name ${projectName} already exists.`)
			process.exit(1)
		}

		console.log(`Creating project ${projectName}...`)
		fs.copySync(path.join(__dirname, 'template'), projectPath)

		console.log(
			`Project ${projectName} has been successfully created. Please follow the README instructions to get started.`
		)
	})
