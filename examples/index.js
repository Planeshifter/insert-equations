'use strict';

var child_process = require( 'child_process' );
var fs = require( 'fs-extra' );
var path = require( 'path' );
var insertEquations = require( './../lib' );

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
