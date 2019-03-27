# Bookmark Resource Generator

Bookmark Resource Generator is a CLI utility to parse webloc and browser-printed pdf files of the file system into a comprehensive list of links in Markdown. 

--> Check out the [example generated resource file](./output/dev-tools-and-resources.md)

![Folder structure screenshot](./folder-structure.png)

The directory tree, strating from the input directory, is registered and translated into a headings/subheadings hierarchy: The base directory name is printed as h1, its subdirectories as h2, and so on and so forth.

## Installation

install the `resource-gen` CLI globally  
`npm install -g bookmark-resource-generator`

## Usage

### Command 
`resource-gen <output-file> <directory-path> [options]`  
The 2 first arguments specify the output file name and the directory to crawl

### Example  
`tools-and-resources /Users/myusername/Development/tools-and-resources --depth 5 --ignore 'snippets' 'my-dev-project'`

### Options  
```
  --version          Show version number                               [boolean]
  --depth, -d        Max sub-directory depth to search                 [number]
  --ignore, -i       Ignore folders in your parent directory           [array]
  --description, -t  Describe the resource you are generating          [string]
  --help             Show help                                         [boolean]
```

The generator will render a directory name if the directory has sub-directories but no links, which leads to rendering empty sections. Use the `--ignore` option to avoid that. 

## Supported formats

Bookmark Resource Generator supports MacOS. Future improvements will implement support for Linux.   

Bookmark Resource Generator will retrieve links form the following file formats:   
`.webloc`   MacOS file format for website shortcut  
`.desktop`  Linux file format for website shortcut. The support was not tested on linux.  
`.pdf`      Files printed from Google Chrome, Firefox & Safari contain links that resource-gen will parse.  


## Improvements

### 1. Code refractor

- draw shema of the program's logic

### 2. Features

- find how to generate resource from chrome/firefox favorites

### 3. Documentation

- Write README.md: installation, usage, supported file types, etc.
- list of unhhandled filepaths

### 4. File rendering

- write title of folder with path to it
- print tabs for each sub level
- order links by alphabetical order? find why capital letters come first..?

### 5. Error handling

- for no path provided to command
- find possible errors in file path handling

### 6. Make program a CLI npm package to install globally

- change index.js to cli.js + run \$ chmod +x cli.js + npm link
- fill out package.json https://docs.npmjs.com/files/package.json#bin

## Publishing

- generate .md on github
- update every X
- host with now

## Bugs

issue with calling predefined npm scripts:  
https://docs.npmjs.com/cli/run-script  
need to use `npm run gen --`
