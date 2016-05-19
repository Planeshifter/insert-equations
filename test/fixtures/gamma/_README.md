Gamma Function
===
> [Gamma][gamma-function] function.

<!-- <intro> -->
The [gamma function][gamma-function] extends the [factorial function][factorial-function] to [real][real] and [complex][complex] numbers. If `n` is a positive `integer`,

<!-- <equation class="equation" label="eq:gamma_function_positive_integers" align="center" raw="\Gamma ( n ) = (n-1)!" alt="Gamma function for positive integers."> -->
<div class="equation" align="center" data-raw-text="\Gamma ( n ) = (n-1)!" data-equation="eq:gamma_function_positive_integers">
	<img src="" alt="Gamma function for positive integers.">
	<br>
</div>
<!-- </equation> -->

Generalized to all complex numbers `z`, except for non-positive integers, the [gamma function][gamma-function] can be expressed as an infinite product

<!-- <equation class="equation" label="eq:gamma_function_infinite_product" align="center" raw="\Gamma ( z ) = \frac{e^{-\gamma z}}{z} \prod^{\infty}_{n=1} \left ( 1+\frac{z}{n}\right )^{-1} e^{z/n}" alt="Gamma function for all complex numbers."> -->
<div class="equation" align="center" data-raw-text="\Gamma ( z ) = \frac{e^{-\gamma z}}{z} \prod^{\infty}_{n=1} \left ( 1+\frac{z}{n}\right )^{-1} e^{z/n}" data-equation="eq:gamma_function_infinite_product">
	<img src="" alt="Gamma function for all complex numbers.">
	<br>
</div>
<!-- </equation> -->

where `γ ≈ 0.577216` is the  [Euler–Mascheroni constant][euler-mascheroni-constant].
<!-- </intro> -->

<!-- <usage> -->
## Usage

``` javascript
var gamma = require( '@stdlib/math/base/special/gamma' );
```


#### gamma( x )

Evaluates the [gamma function][gamma-function].

``` javascript
var v = gamma( 4.0 );
// returns 3! = 6

v = gamma( -1.5 );
// returns ~2.363

v = gamma( -0.5 );
// returns ~-3.545

v = gamma( 0.5 );
// returns ~1.772

v = gamma( 0.0 );
// returns +infinity

v = gamma( -0.0 );
// returns -infinity

v = gamma( NaN );
// returns NaN
```
<!-- </usage> -->

<!-- <examples> -->
## Examples

``` javascript
var linspace = require( '@stdlib/math/generics/utils/linspace' );
var gamma = require( '@stdlib/math/base/special/gamma' );

var x = linspace( -10.0, 10.0, 100 );
var v;
var i;

for ( i = 0; i < x.length; i++ ) {
	v = gamma( x[ i ] );
	console.log( 'x: %d, f(x): %d', x[ i ], v );
}
```
<!-- </examples> -->

<!-- <links> -->
[gamma-function]: https://en.wikipedia.org/wiki/Gamma_function
<!-- FIXME -->
[factorial-function]: https://github.com/math-io/factorial
[real]: https://en.wikipedia.org/wiki/Real_number
[complex]: https://en.wikipedia.org/wiki/Complex_number
<!-- FIXME -->
[euler-mascheroni-constant]: https://github.com/const-io/eulergamma
<!-- </links> -->
