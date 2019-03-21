# Bookmark Resource Generator

screenshot of folder structure  
[generated resource file](./output/dev-tools-and-resources.md)

### options

folderDepth: Number
ignore: [String]

The generator will print folder names if folder contains subfolders but no link. might lead to printing empty sections.

## Improvements

1. Code refractor (software logic):

- draw a shema of the program's logic

2. Features:

- implement yargs
- find how to generate resource from chrome/firefox favorites
- file description option
- folder ignore option

3. Write README.md: installation, supported file types, etc.

- list of unhhandled filepaths

4. md Rendering:

- write title of folder with path to it
- print tabs for each sub level
- order links by alphabetical order? find why capital letters come first..?

5. Error handling:

- for no path provided to command
- find possible errors in file path handling

6. Fixes: none

7. Make it a CLI npm package to install globally

- change index.js to cli.js + run \$ chmod +x cli.js + npm link
- fill in package.json https://docs.npmjs.com/files/package.json#bin

## Publishing

- generate .md on github
- update every X
- host with now

## Bugs

https://docs.npmjs.com/cli/run-script
