
(function () {
	var chars = [
		'1', '2', '3', '4', '5', '6', '7', '8', '9',
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
		'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's',
		't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B',
		'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L',
		'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
		'W', 'X', 'Y', 'Z'
	];

	var map = {};
	for (var i = 0, it; it = chars[i]; i++) {
		map[it] = i;
	}

	function encodeBase58 (num) {
		if (num == 0) return chars[0];

		num = new BigInt(num);

		var res = '';
		var base = chars.length;

		while (num.isPositive()) {
			var rem = num.div(base);
			res = chars[rem] + res;
		}

		return res;
	}

	function decodeBase58 (str) {
		var decoded = new BigInt(0);
		var multi   = new BigInt(1);
		var base    = chars.length;

		for (var i = str.length - 1; i >= 0; i--) {
			var d = str.charAt(i);
			decoded.add(multi.clone().mul(map[d]));
			multi.mul(base);
		}

		return decoded.toString();
	}

	var Global = (function () { return this })();
	Global.encodeBase58 = encodeBase58;
	Global.decodeBase58 = decodeBase58;
})();

