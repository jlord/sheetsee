[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# Sheetsee

**A Node.js command line tool for creating a custom build of the [sheetsee.js](http://jlord.github.io/sheetsee.js) library with just the components you want.** :sparkles:

If you want to just use the full version, you can grab it here at [github.com/jlord/sheetsee.js](https://github.com/jlord/sheetsee.js/blob/master/js/sheetsee.js).

All bundles comes with [mapbox.js](https://www.mapbox.com) and [mustache.js](https://mustache.github.io) (since both are available on [NPM](http://www.npmjs.org)). Additionally, you'll need to also include [tabletop.js](https://github.com/jsoma/tabletop) in your HTML head like so:

```HTML
<script src="https://cdnjs.cloudflare.com/ajax/libs/tabletop.js/1.1.0/tabletop.min.js"></script>
```

**To build your Sheetsee you'll need [Node.js](http://www.nodejs.org) and [npm](http://www.npmjs.org) (the latter comes with the former) on your computer.**

#### Get Node/NPM

Download Node.js from [nodejs.org/download](http://nodejs.org/download). For most users you can just download the Mac _.pkg_ or Windows _.msi_. Follow the install instructions, both include NPM. Once they're installed, proceed:

## To Use

Install `sheetsee` globally and then run it within the folder of your soon-to-be sheetsee.js project.

_Install globally_

```bash
npm install -g sheetsee
```

_Run from within a project folder_

```bash
# go into your project's directory
cd my-cool-project
# build sheetsee
sheetsee [options]
```

### Options

Here are the options for the different modules and an option for saving the file (as `sheetsee.js`).

- `-m` or `-maps` for maps
- `-t` or `-tables` for tables
- `--save` to write out the file*

_* otherwise, defaults to standardout on your console which you can_ `| pbcopy`

So for instance, `sheetsee -m -t --save` will build you a Sheetsee.js with the basic **data** functions that are included by default, the **map** and **table** sections and save it as a file named `sheetsee.js`. Running `sheetsee -m -t | pbcopy` will save the same output to your clipboard.
