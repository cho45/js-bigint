#!node

var fs  = require('fs');
var sys = require('sys');

// bigint
console.log('bigint');
eval(fs.readFileSync('./BigInt.js', 'ascii'));

is(new BigInt('0xffffffff').toString(), '4294967295');
is(new BigInt('0xffffffffffffffff').toString(), '18446744073709551615');

is(new BigInt('0').add('1').toString(), '1');
is(new BigInt('0').add('3').toString(), '3');
is(new BigInt('0').add(new BigInt('1')).toString(), '1');
is(new BigInt('0').add(new BigInt('2')).toString(), '2');
is(new BigInt('1').add(new BigInt('2')).toString(), '3');

is(new BigInt('0').mul('1').toString(), '0');
is(new BigInt('1').mul('1').toString(), '1');
is(new BigInt('1').mul('2').toString(), '2');
is(new BigInt('0').mul(new BigInt('1')).toString(), '0', 'mul with bigint');
is(new BigInt('1').mul(new BigInt('1')).toString(), '1', 'mul with bigint');
is(new BigInt('1').mul(new BigInt('2')).toString(), '2', 'mul with bigint');

is(new BigInt('0xffffffff').mul('0xffffffff').toString(), '18446744065119617025');
is(new BigInt('0xffffffff').add('0xffffffff').toString(), '8589934590');
is(new BigInt('0xffffffff').sub('0xffffffff').toString(), '0');

// does not support negative bigint...
//is(new BigInt(-1).isNegative(), true, 'bigint(-1)');
//is(new BigInt(-1).toString(), '-1', 'bigint(-1)');
//is(new BigInt(1).mul(-1).isNegative(), true, 'bigint(1) * -1');
//is(new BigInt(1).mul(-1).toString(), '-1', 'bigint(1) * -1');
//is(new BigInt('-1').isNegative(), true, 'bigint(-1)');
//is(new BigInt('-1').toString(), '-1', 'bigint(-1)');

// base58
console.log('base58');
eval(fs.readFileSync('./Base58.js', 'ascii'));

is(encodeBase58('0'), '1', 'encodeBase58 0 -> 1');
is(decodeBase58('1'), '0', 'decodeBase58 1 -> 0');

is(encodeBase58('1'), '2', 'encodeBase58 1 -> 2');
is(decodeBase58('2'), '1', 'decodeBase58 2 -> 1');

is(encodeBase58("0xffffff"), '2tZhk');
is(decodeBase58('2tZhk'), '16777215');

is(encodeBase58("0xffffffff"), '7xwQ9g');
is(decodeBase58('7xwQ9g'), '4294967295');

is(encodeBase58('9235113611380768826'), 'nrkMyzsS7w7');
is(decodeBase58('nrkMyzsS7w7'), '9235113611380768826');



function show (msg, expect, result) {
	var okng = this;

	var out = [];
	if (okng == "skip") {
		out.push(" ", color(33, "skipped " + expect + " tests: " + msg));
		console.log(out.join(""));
	} else
	if (okng == "ng") {
		expect = (typeof expect == "function") ? uneval(expect).match(/[^{]+/)+"..." : uneval(expect);
		result = (typeof result == "function") ? uneval(result).match(/[^{]+/)+"..." : uneval(result);
		out.push(["NG Test::", msg, expect, result].join("\n"));
		console.log(out.join(""));
	} else {
		out.push(" ", color(32, "ok"));
		console.log(out.join(""));
	}
}

function uneval (obj) {
	return sys.inspect(obj);
}

function msg (m) {
	console.log(m);
}
log = msg;
print = msg;

function ok () {
	show.apply("ok", arguments);
	return true;
}

function ng () {
	show.apply("ng", arguments);
	return true;
}

function skip () {
	show.apply("skip", arguments);
	return true;
}

function is (result, expect, msg) {
	if (expect == result) {
		show.call("ok", msg, expect, result);
	} else {
		show.call("ng", msg, expect, result);
	}
	return true;
}

function color (code) {
	var str = "";
	for (var i = 1; i < arguments.length; i++) str += arguments[i];
	return [
		String.fromCharCode(27), "[", code, "m",
		str,
		String.fromCharCode(27), "[0m"
	].join("");
}

