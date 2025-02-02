
# Projects - Programming

[Back](/?previousPage)

## Python Projects

### [Zenplate](https://github.com/camratchford/zenplate) - Python

A pluggable CLI templating tool leveraging the powers of Jinja2 and YAML.

Features include:
- Single file templating - render a single file with variables.
- Directory templating - render all files in a directory, including file and directory names.
- Plugin system - extend the functionality of Zenplate with custom data, filter, and test plugins.

Built with:
- [Jinja2](https://jinja.palletsprojects.com/en/stable/) for rendering templates.
- [PyYAML](https://pyyaml.org/) for parsing / dumping YAML files.
- [Typer](https://typer.tiangolo.com/) for the CLI.

### [Punctual-Scheduler](https://github.com/camratchford/punctual-scheduler) - Python

'Better task scheduling in Windows' was the goal.

- Uses [Schedule](https://github.com/dbader/schedule), PyYaml, Click.
- Runs tasks asynchronously, checking for file system changes to keep list of scheduled tasks up-to-date.

### [MSICompiler](https://github.com/camratchford/MSICompiler)

A tool to create MSI packages for Windows from YAML files.

- Uses msilib, PyYaml, and Click.
- An exercise in implementing sparsely documented modules.
    - Knowledge of the MSBuild System was attained in the process.

### [GHIssues](https://github.com/camratchford/GHIssues) - Python

Create and view GitHub issues from the CLI.

- Uses urllib3, Pretty, and argparse.
- Made over the course of an afternoon.