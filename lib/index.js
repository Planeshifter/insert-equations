'use strict';

// MODULES //

var createElement = require( 'github-markdown-equation-element' );
var child_process = require( 'child_process' );
var isFunction = require( 'validate.io-function' );
var isString = require( 'validate.io-string-primitive' );
var tex2svg = require( 'tex-equation-to-svg' );
var getSlug = require( './get_slug.js' );
var mkdirp = require( 'mkdirp' );
var rawgit = require( 'rawgit-url' );
var cheerio = require( 'cheerio' );
var async = require( 'async' );
var path = require( 'path' );
var fs = require( 'fs' );


// VARIABLES //

var EQN_REGEX =  /<!-- <equation[^>]*> -->[\s\S]+?<!-- <\/equation> -->/gi;


// PROCESS //

/**
* Processes the README.md file in the supplied directory.
*
* @param {string} dir - directory path
* @param {Function} clbk - callback function invoked upon completion
*/
function processFile( dir, clbk ) {
	var tasks = [];
	var file;

	if ( !isString( dir ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string primitive. Value: `' + dir + '`.' );
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Second argument must be a callback function. Value: `' + clbk + '`.' );
	}

	mkdirp( path.join( dir, '/docs/img' ), function onDone( err ) {
		if ( err ) {
			throw err;
		}
		file = path.join( dir, 'README.md' );
		fs.readFile( file, onRead );
	});

	/**
	* Extract all equation elements and insert SVGs.
	*
	* @param {Error|null} err - error object
	* @param {Buffer} res - file contents
	*/
	function onRead( err, res ) {
		var match;
		var $eqn;
		var str;
		var eqn;
		var $;

		if ( err ) {
			throw err;
		}

		str = res.toString();
		while ( ( match = EQN_REGEX.exec( str ) ) !== null ) {
			eqn = match[ 0 ];
			eqn = eqn.replace( /<!--/g, '' );
			eqn = eqn.replace( /-->/g, '' );
			$ = cheerio.load( eqn );
			$eqn = $( 'equation' );
			tasks.push({
				match: match[ 0 ],
				$eqn: $eqn,
				raw: $eqn.attr( 'raw' ),
				alt: $eqn.attr( 'alt' ),
				label: $eqn.attr( 'label' )
			});
		}
		async.forEachOf( tasks, createSVGs, function onDone( err ) {
			var slug;
			if ( err ) {
				throw err;
			}
			child_process.execSync( 'git add docs/img', { cwd: dir } );
			child_process.execSync( 'git commit -m "Generate equation SVGs"', { cwd: dir } );

			slug = getSlug( dir );
			tasks = tasks.map( function forEach( el ) {
				el.rawgit = rawgit({
					file: el.outfile,
					cdn: true,
					slug: slug
				});
				return el;
			});
			tasks = tasks.map( function forEach( el ) {
				var opts = {
					'src': el.rawgit,
					'className': 'equation',
					'align': 'center',
					'raw': el.raw,
					'alt': el.alt,
					'label': el.label
				};
				el.html = createElement( opts );
				return el;
			});

			tasks.forEach( function each( el ) {
				var $eqn = el.$eqn;
				$eqn.html( el.html );
				str = str.replace( el.match, $eqn );
			});
			str = str.replace( /<equation([^>]*)>/g, '<!-- <equation$1> -->\n' );
			str = str.replace( /<\/equation>/g, '\n<!-- <\/equation> -->' );

			// Write transformed file to disk...
			fs.writeFile( file, str, function onWrite( err ) {
				if ( !err ) {
					child_process.execSync( 'git add README.md', { cwd: dir } );
					child_process.execSync( 'git commit -m "Update README.md file"', { cwd: dir } );
				}
				clbk( err );
			});
		});
	} // end FUNCTION onRead()

	/**
	* Create SVG for the respective equation.
	*
	* @param {Object} task - equation task object
	* @param {number} index - tasks array index
	* @param {Function} clbk - callback function
	*/
	function createSVGs( task, index, clbk ) {
		tex2svg( task.raw, saveSVG );
		/**
		* Save created SVG to disk.
		*
		* @param {Error|null} err - error object
		* @param {string} svg - SVG code
		*/
		function saveSVG( err, svg ) {
			var outfile;
			if ( err ) {
				throw err;
			}
			outfile = path.join( dir, '/docs/img/eqn' + (index+1) + '.svg' );
			tasks[ index ][ 'outfile' ] = path.relative( dir, outfile );
			fs.writeFile( outfile, svg, clbk );
		} // end FUNCTION saveSVG()
	} // end FUNCTION processEquation()

} // end FUNCTION processFile()


// EXPORTS //

module.exports = processFile;
