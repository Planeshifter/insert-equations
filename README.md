insert-equations
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Parse README.md files and turn LaTeX equations into SVGs.


## Installation

``` bash
$ npm install insert-equations
```


## Usage

``` javascript
var insertEquations = require( 'insert-equations' );
```

#### insertEquations( dir, clbk )

Parses the `README.md` file in the supplied directory and inserts SVG images for all `<equation>` tags. The `label`, `align`, `raw` and `alt` attributes of the equation tag will be used. Upon creating the SVG images, the `README.md` file will be overwritten with the newly generated markup.

``` javascript
insertEquations( 'mydirectory', done )

function done( err ) {
	if ( err ) {
		throw err;
	}
	console.log( 'README.md file successfully processed.' );
} // end FUNCTION done()
```

## Notes

*	As a concrete example

	``` html
	<!-- <equation class="equation" label="eq:gamma_function_positive_integers" align="center" raw="\Gamma ( n ) = (n-1)!" alt="Gamma function for positive integers."> -->
	<!-- </equation> -->
	```

	will be transformed to

	``` html
	<!-- <equation class="equation" label="eq:gamma_function_positive_integers" align="center" raw="\Gamma ( n ) = (n-1)!" alt="Gamma function for positive integers."> -->
	<div class="equation" align="center" data-raw-text="\Gamma ( n ) = (n-1)!" data-equation="eq:gamma_function_positive_integers">
		<img src="https://cdn.rawgit.com/Planeshifter/insert-equations-examples/8fd73c14a23a0bcb1d31e7e3246ae411e11a0c70/docs/img/eqn1.svg" alt="Gamma function for positive integers.">
		<br>
	</div>
	<!-- </equation> -->
	```

*	The supplied directory has to be a git project with a remote branch on GitHub. Otherwise, `insertEquations` will throw an error.
*	Beware: `insertEquations` automatically creates a commit for the newly created files and changes to `README.md`.


## Examples

``` javascript
var child_process = require( 'child_process' );
var fs = require( 'fs-extra' );
var path = require( 'path' );
var insertEquations = require( 'insert-equations' );

var fPath = path.resolve( __dirname, './fixtures' );
var inputPath = path.join( fPath, '_README.md' );
var outputPath = path.join( fPath, 'README.md' );

fs.copySync( inputPath, outputPath );

child_process.execSync( 'rm -rf .git', { cwd: fPath } );
child_process.execSync( 'git init', { cwd: fPath } );
child_process.execSync( 'git remote add origin https://github.com/Planeshifter/insert-equations-examples.git', { cwd: fPath } );

insertEquations( fPath, done );

function done( err ) {
	if ( err ) {
		throw err;
	}
	console.log( 'README.md file successfully processed.' );
} // end FUNCTION done()
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g insert-equations
```


### Usage

``` bash

Usage: insert-equations [options] [directory]

Options:

  -h,    --help                Print this message.
  -V,    --version             Print the package version.

```


### Examples

``` bash
$ insert-equations examples/fixtures
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Philipp Burckhardt.


[npm-image]: http://img.shields.io/npm/v/insert-equations.svg
[npm-url]: https://npmjs.org/package/insert-equations

[build-image]: http://img.shields.io/travis/Planeshifter/insert-equations/master.svg
[build-url]: https://travis-ci.org/Planeshifter/insert-equations

[coverage-image]: https://img.shields.io/codecov/c/github/Planeshifter/insert-equations/master.svg
[coverage-url]: https://codecov.io/github/Planeshifter/insert-equations?branch=master

[dependencies-image]: http://img.shields.io/david/Planeshifter/insert-equations.svg
[dependencies-url]: https://david-dm.org/Planeshifter/insert-equations

[dev-dependencies-image]: http://img.shields.io/david/dev/Planeshifter/insert-equations.svg
[dev-dependencies-url]: https://david-dm.org/dev/Planeshifter/insert-equations

[github-issues-image]: http://img.shields.io/github/issues/Planeshifter/insert-equations.svg
[github-issues-url]: https://github.com/Planeshifter/insert-equations/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com
