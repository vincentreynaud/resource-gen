# Resource Generator

Resource Generator is a CLI utility that renders a comprehensive link inventory in Markdown out of `webloc` and browser-printed pdf files of the file system. This utility allows you to easily render your research folders into a resource file in order to store and share it with peer colleagues, students, researchers and the like.

#### \>\> Check out the [example generated resource file](./output/dev-tools-and-resources.md)

![Directory tree screenshot](./directories.png)

## Installation

### Release on npm coming soon...

**Note:** Resource Generator was built on MacOS. Future improvements will implement support for Linux  
(see #4 in [issues](https://github.com/vincentreynaud/bookmark-resource-generator/issues))

Install `resource-gen` CLI globally:

```
npm install -g resource-gen
```

## Usage

Resource Generator will crawl into the directory tree, starting from the input directory, and retrieve links found in files such as `webloc` and `pdf`. In Markdown, The tree is rendered in a heading hierarchy: The base directory name is printed as h1, its sub-directories as h2 and so on.

The generated Markdown is output in the crawled directory. Using the `--log` option, you can additionally output a log file to check if there were failures to retrieve links during crawl.

### Command

```
resource-gen <directory-path> [output-file-name] [options]
```

Use the command `resource-gen` and specify the directory to crawl into. If you want to crawl into the current directory, use `.` to indicate your relative position. 

By default the file name is set from the name of the input directory. Specify the file name as second argument if you prefer to set it yourself.



### Examples

#### Absolute path, no output file name 

```
$ resource-gen /Users/myusername/Development/tools-and-resources --depth 3 --ignore 'code-snippets'
```
Outputs file to `/Users/myusername/Development/tools-and-resources/tools-and-resources.md`

#### Relative path, with output file name

```
$ resource-gen . custom-file-name --depth 3 --ignore 'code-snippets'
```
Outputs file to `/path/to/current/directory/custom-file-name.md`


#### Relative path, no output file name

```
$ resource-gen .
```
Outputs file to `/path/to/current/directory/<directory-name>.md`

### Options

| Long            | Short | Description                                     | Type    |
| :-------------- | :---- | :---------------------------------------------- | :------ |
| `--depth`       | `-d`  | Max sub-directory depth to search into          | Number  |
| `--ignore`      | `-i`  | Ignore folders in the base- and sub-directories | Array   |
| `--description` | `-t`  | Describe the generated resource                 | String  |
| `--log`         | `-l`  | Create log file for failure to retrieve link    | Boolean |
| `--version`     |       | Show version number                             | Boolean |
| `--help`        |       | Show help                                       | Boolean |

Resource Generator crawls into the directory tree up to the 6th sub-folder. Use the `--depth` option to limit it to a smaller number. 

The program will render a directory name if the directory has sub-directories though no links, which may lead to rendering empty sections. Use the `--ignore` option to avoid that.

## Supported formats

Resource Generator will retrieve urls form the following file formats, and will ignore any other files present in your file system.

| Format     | Description                                                                        |
| :--------- | :--------------------------------------------------------------------------------- |
| `.webloc`  | MacOS file format for website shortcut.                                            |
| `.desktop` | Linux file format for website shortcut. Note: Support on Linux not yet tested.     |
| `.pdf`     | Files printed from Google Chrome, Firefox and Safari.                              |


## Contributions

Contribution guidelines coming soon. Project improvements listed in [issues](https://github.com/vincentreynaud/bookmark-resource-generator/issues) section.

## Licence

[MIT](./LICENSE)
