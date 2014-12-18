skeleton
========

A front-end starting point designed to play nice with many different MVC's / CMS's


## Directory Structure

- app
- public
- resources
  - assets
    - components
    - img
    - js
    - sass
      - common
      - modules
      - partials
      - screens
      - vendor
  - views
    - layout
    - partials
- vendor


### app

Intended to be a simple adaptor to replace the need for a heavy framework or CMS.
The goal of skeleton is to start developing front-end assets as quickly as possible.
Advantages of this approach are:

- No database configuration
- No need for controller creation
- No user authentication

The list above is the responsibility of the back-end developer. Often times these are subject to change
and can cause annoying conflicts for both developers when the font-end dev is managing/dependant on any of the above.

All of these things are critical components of any project that will be included eventually.
Once ready to include a PHP framework, it is intended to replace the `app` directory entirely.


### public

Solely static and generated assets.

The following directories contain generated assets from the `resources/assets` directory:

- `css`
- `img`
- `js`

The `resources/assets` directory talked about in more detail below.

All of the following are largely static assets that do not need to be managed elsewhere:

- `.htaccess`
- `browserconfig.xml`
- `crossdomain.xml`
- `humans.txt`
- `index.php`
- `robots.txt`

There are 2 directories that are unique: `fonts`, and `files`.
These directories contain assets generated from outside of the project such as `.pdf` and `.doc` files.
The `fonts` directory typically contains a generated icon pack and any custom fonts not hosted elsewhere.
The `files` directory contains any miscellaneous assets that fit into any of the other directories (i.e. pdfs).


### resources

The core directory for front-end development.


#### views

All the HTML markup for the project.
In this section, file names are using the extension '.php', but it is assumed that you will use the following
depending on the PHP templating language in use:
 
- `.php` = none
- `.blade.php` = Blade
- `.twig` = Twig


##### home

When navigating to the project's public root, the default page served is `home/index.php`.


##### layout

Any layout templates. `default.php` is the template selected if not overridden in the controller.


##### modules

Markup for reusable components used throughout the site.


##### partials

Markup for the site header, footer, and head metadata.


#### assets

All the source files that generate the assets in the `public` directory.


##### components

Bower's root directory.
When running commands such as `bower install jquery` from the root of the project,
it will install jquery in this directory.

Also the root directory for javascript vendor files that outputs into `vendor.js`
For more information, see below in the Gulp section.


##### img

Source files for any `.jpg`, `.png`, `.svg` images used in the site.
Files will be minified and output into the `public/img` directory.


##### js


Contains `app.js` and `plugins` directory. Smaller, simple functions live in `app.js`.


###### plugins

Add your larger custom js modules in this directory.

Be sure to add each of them to the `config.jsApp` array in `Gulpfile.js`
so they will be concatenated into the outputted `app.js`.


##### sass

Unless your site has a views with drastically different designs,
`screen.scss` should include all of the projects styles.

It includes files in the following order:

- vendor
- common
- modules
- partials
- screens

For maintainability, the files in these directories are included in alphabetical order.
Specificity should not be an issue inside of a given directory. If it is, it should be solved in
files themselves instead of reordering the includes.


###### dependencies

Global dependencies throughout sass files are declared in `_global.scss`
To start, this file includes `common/variables` and `common/mixins` but can be added to as needed.
However, if one module depends on another, this can be extended in that particular module's dependency list
instead of being added to the global list.


###### variables

Variables are declared in `common/_variables.scss`.
Even if variables are only used in a single module or partial,
it is best to declare them here for easier maintainability and more intentional variables.


###### exports

`exports` is a mixin (shamelessly ripped from foundation) that allows your to declare modules as dependencies
of each other without the concern of duplicate declarations of the dependency in your css.
Modules should be passed through exports as there is little downside to this practice.


###### common

Contains all shared styles throughout the site. To start, it will include:

- helpers
- icons
- mixins
- variables


###### modules

These are styles for components reused throughout the site.
The module file names should map to their respective markup found in the `resources/views/modules` directory.


###### partials / screens

Similar to the modules, the partial and screen file names should map to views their respective markup found in the `resources/views` directory.


## Node

Used to build assets. To install the project's node dependencies, run `npm install`.
Configured in `package.json`.
Components install in `node_modules` directory.


### Gulp

Configured in `Gulpfile.js`. Uses Laravel's Elixir


#### Laravel Elixir

Directory structure declared in `elixir.json`


##### config.jsVendor

An array of all the project-specific javascript files to concatenate and minify.

- Input relative to `resources/assets/js`
- Outputs to `public/js/app.js`


##### config.jsVendor

An array of all the javascript vendor files to concatenate and minify.

- Input relative to `resources/assets/components`
- Outputs to `public/js/vendor.js`


##### config.jsFoundation

An array of all foundation javascript components to include in the project.

- Input relative to `resources/assets/components/foundation/js/foundation`
- Outputs to `public/js/vendor/foundation.js`

The array also creates a legacy version (v4.3) for IE8 support

- Input relative to `resources/assets/components/foundation-legacy/js/foundation`
- Outputs to `public/js/vendor/foundation-legacy.js`


## Composer

Optional PHP components. To install, run `composer install`.
Configured in `composer.json`.
Components install in `vendor` directory.


### Twig / Blade

If the project will be using a PHP templating language, it can be installed via composer.