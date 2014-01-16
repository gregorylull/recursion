// these are my own tests

var test0 = ['a'];
var test1 = ['a', 'b'];
var test2 = [0, 1];

function string1 (arrObjPrim, index, sstr) {

    sstr = sstr || '';
    
    if (typeof arrObjPrim === "string" || typeof arrObjPrim === "number") {
	console.log(arrObjPrim);
	return arrObjPrim;

    } else if ( Array.isArray(arrObjPrim)) {
	console.log(arrObjPrim);
        return sstr + '[' + string1(arrObjPrim[index], sstr) + ']';
    }
}

string1(test2, 0);

var string2 = function (elt, array, result, index) {
  result = result || '';

  if (Array.isArray(elt)) {
      return result + '[' + string2(elt[0], elt.slice(1), ) + ']';
  } else {
      return elt;
  }
};

console.log(string2(test0));
