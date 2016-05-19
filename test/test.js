'use strict';

// MODULES //

var insertEquations = require( './../lib' );
var child_process = require( 'child_process' );
var fileExists = require('file-exists');
var tape = require( 'tape' );
var path = require( 'path' );
var fs = require( 'fs-extra' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof insertEquations, 'function', 'main export is a function' );
	t.end();
});

tape( 'throws an error if not provided a directory', function test( t ) {
	t.throws( foo, Error );
	t.end();

	function foo() {
		insertEquations();
	} // end FUNCTION foo()
});

tape( 'throws an error if not provided a valid directory', function test( t ) {
	var values = [
		5,
		null,
		true,
		undefined,
		NaN,
		[],
		{},
		function(){}
	];

	for ( var i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError );
	}
	t.end();

	function badValue( value ) {
		return function() {
			insertEquations( value );
		};
	} // end FUNCTION badValue()
});

tape( 'throws an error if provided directory does not contain a README.md file', function test( t ) {
	var fPath = path.resolve( __dirname, './fixtures/empty' );
	t.throws( foo, Error );
	t.end();

	function foo() {
		insertEquations( fPath );
	} // end FUNCTION foo()
});

tape( 'function successfully parses README.md files, generates SVGs and overwrites README.md file', function test( t ) {
	var fPath = path.resolve( __dirname, './fixtures/gamma' );

	var inputPath = path.join( fPath, '_README.md' );
	var outputPath = path.join( fPath, 'README.md' );
	fs.copySync( inputPath, outputPath );

	child_process.execSync( 'rm -rf .git', { cwd: fPath } );
	child_process.execSync( 'git init', { cwd: fPath } );
	child_process.execSync( 'git remote add origin https://github.com/Planeshifter/insert-equations-examples.git', { cwd: fPath } );

	insertEquations( fPath, done );

	t.end();

	function done( err ) {
		var eqn1;
		var eqn2;

		if ( err ) {
			throw err;
		}

		eqn1 = path.join( fPath, 'docs/img/eqn1.svg' );
		eqn2 = path.join( fPath, 'docs/img/eqn2.svg' );
		t.equal( fileExists( eqn1 ), true, 'First SVG file successfully created' );
		t.equal( fileExists( eqn2 ), true, 'Second SVG file successfully created' );

	} // end FUNCTION done()
});
