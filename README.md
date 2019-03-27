# Bookmark Resource Generator

Bookmark Resource Generator is a CLI utility to parse webloc and browser-printed pdf files of the file system into a comprehensive list of links in Markdown. 

\>\> Check out the [example generated resource file](./output/dev-tools-and-resources.md)

![Folder structure screenshot](./folder-structure.png)

## Installation

**This project is not yet released on npm, coming soon...**

Install `resource-gen` CLI globally: 

```
npm install -g bookmark-resource-generator
```

## Usage

Bookmark Resource Generator will crawl into the directory tree, strating from the input directory, and retrieve links it finds in files such as `webloc` and `pdf`. The directory tree is translated into a headings/subheadings hierarchy: The base directory name is printed as h1, its sub-directories as h2, and so on and so forth.

### Command 

Specify the output file name and the directory to crawl:

```
resource-gen <output-file> <directory-path> [options]
``` 


### Example  
```
resource-gen tools-and-resources /Users/myusername/Development/tools-and-resources --depth 3 --ignore 'snippets' 'my-dev-project'
```

### Options  

| Option           | Shortcut | Description                                     | Type        |
| ---------------- | -------- | ----------------------------------------------- | ----------- |
| `--depth`        | `-d`     | Max sub-directory depth to search into          | [number]    |
| `--ignore`       | `-i`     | Ignore folders in the base and sub-directories  | [array]     |
| `--description`  | `-t`     | Describe the generated resource                 | [string]    |
| `--version`      |          | Show version number                             | [boolean]   |
| `--help`         |          | Show help                                       | [boolean]   |


Bookmark Resource Generator crawls into the directory tree up to the 6th subfolder, use the `--depth` option to limit it to a smaller number. 

The generator will render a directory name if the directory has sub-directories but no links, which leads to rendering empty sections. Use the `--ignore` option to avoid that. 

## Supported formats

Bookmark Resource Generator supports `MacOS`. Future improvements will implement support for `Linux`.   

Bookmark Resource Generator will retrieve urls form the following file formats:   

| Format     | Description                                                                     
| ---------- | ---------------------------------------------
| `.webloc`  | MacOS file format for website shortcut  
| `.desktop` | Linux file format for website shortcut. The support was not tested on linux.  
| `.pdf`     | Files printed from Google Chrome, Firefox & Safari contain links that resource-gen will parse.


## Contributions

Contribution guidelines comming soon. Project improvements listed in [issues](/issues) section.

## Licence

MIT