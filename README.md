# Bookmark Resource Generator

Bookmark Resource Generator is a CLI utility to parse webloc and browser-printed pdf files of the file system into a comprehensive list of links in Markdown. 

--> Check out the [example generated resource file](./output/dev-tools-and-resources.md)

![Folder structure screenshot](./folder-structure.png)

## Installation

install the `resource-gen` CLI globally  
`npm install -g bookmark-resource-generator`

## Usage

Bookmark Resource Generator will crawl into the directory tree, strating from the input directory, and retrieve links it finds in files such as webloc and pdf. The directory tree is registered and translated into a headings/subheadings hierarchy: The base directory name is printed as h1, its subdirectories as h2, and so on and so forth.

### Command 
`resource-gen <output-file> <directory-path> [options]`  
The 2 first arguments specify the output file name and the directory to crawl

### Example  
`tools-and-resources /Users/myusername/Development/tools-and-resources --depth 5 --ignore 'snippets' 'my-dev-project'`

### Options  
```
  --version          Show version number                               [boolean]
  --depth, -d        Max sub-directory depth to search into            [number]
  --ignore, -i       Ignore folders in the base and sub-directories    [array]
  --description, -t  Describe the generated resource                   [string]
  --help             Show help                                         [boolean]
```

resouce-gen crawls into the directory tree up to the 6th subfolder, use the depth option to limit it to a smaller number. 
 
The generator will render a directory name if the directory has sub-directories but no links, which leads to rendering empty sections. Use the `--ignore` option to avoid that. 

## Supported formats

Bookmark Resource Generator supports MacOS. Future improvements will implement support for Linux.   

Bookmark Resource Generator will retrieve links form the following file formats:   
`.webloc`   MacOS file format for website shortcut  
`.desktop`  Linux file format for website shortcut. The support was not tested on linux.  
`.pdf`      Files printed from Google Chrome, Firefox & Safari contain links that resource-gen will parse.  


resource-gen will retrieve urls from the following file types: 
`.pdf`    for pdfs that were printed from chrome & firefow browsers. support for other browsers not yet tested
`.webloc`  
`.desktop`


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

- test yargs errors
- for no path provided to command
- find possible errors in file path handling

### 6. Make program a CLI npm package to install globally

- change index.js to cli.js + run \$ chmod +x cli.js + npm link
- fill out package.json https://docs.npmjs.com/files/package.json#bin
- generate resource every x to keep folder changes updated. server + now

## Bugs

issue with calling predefined npm scripts:  
https://docs.npmjs.com/cli/run-script  
need to use `npm run gen --`
