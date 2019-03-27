# Bookmark Resource Generator

Bookmark Resource Generator is a CLI utility to parse webloc and browser-printed pdf files of the file system into a comprehensive list of links in Markdown. 

This utility allows you to render your research folders into a single resource file, which you can share with peer learners and researchers. 

\>\> Check out the [example generated resource file](./output/dev-tools-and-resources.md)

![Folder structure screenshot](./folder-structure.png)

## Installation

**Note: Release on npm coming soon...**

Bookmark Resource Generator supports MacOS. Future improvements will implement support for Linux (see #4 in [issues](https://github.com/vincentreynaud/bookmark-resource-generator/issues)) 

Install `resource-gen` CLI globally: 

```
npm install -g bookmark-resource-generator
```

## Usage

Bookmark Resource Generator will crawl into the directory tree, strating from the input directory, and retrieve links it finds in files such as `webloc` and `pdf`. The directory tree is translated into a headings/subheadings hierarchy: The base directory name is printed as h1, its sub-directories as h2, and so on and so forth.

### Command 

Specify the directory to crawl and the output file name:

```
resource-gen <directory-path> <output-file> [options]
``` 


### Example  
```
resource-gen tools-and-resources /Users/myusername/Development/tools-and-resources --depth 3 --ignore 'code-snippets'
```

### Options  

| Option           | Shortcut | Description                                     | Type     |
| ---------------- | -------- | ----------------------------------------------- | -------- |
| `--depth`        | `-d`     | Max sub-directory depth to search into          | Number   |
| `--ignore`       | `-i`     | Ignore folders in the base- and sub-directories  | Array    |
| `--description`  | `-t`     | Describe the generated resource                 | String   |
| `--version`      |          | Show version number                             | Boolean  |
| `--help`         |          | Show help                                       | Boolean  |


Bookmark Resource Generator crawls into the directory tree up to the 6th subfolder, use the `--depth` option to limit it to a smaller number. 

The generator will render a directory name if the directory has sub-directories but no links, which leads to rendering empty sections. Use the `--ignore` option to avoid that. 

## Supported formats

Bookmark Resource Generator will retrieve urls form the following file formats:   

| Format     | Description                                                                     
| ---------- | ---------------------------------------------
| `.webloc`  | MacOS file format for website shortcut.
| `.desktop` | Linux file format for website shortcut. Note: The support was not tested on linux.
| `.pdf`     | Files printed from Google Chrome, Firefox and Safari.


## Contributions

Contribution guidelines comming soon. Project improvements listed in [issues](https://github.com/vincentreynaud/bookmark-resource-generator/issues) section.

## Licence

MIT
