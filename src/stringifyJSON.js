// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// planning

/*******************************************************************************

  // termination cases

  // base cases

  // recursion cases

  1. call function on every element in an array to determine if: prim, obj, or arr
  2. when calling function on an array, add brackets '[' + func(primObjArr) + ']';


if (objArrPrim === 'array') {
  for (var i = 0; i < length; i++) {
    
  }  
}

-----

for a simple array ['a', 'b']

can create an empty parent array that holds values [index0, index1]

index0 = stringified 'a', index1 = stringified 'b'

base cases: 
  if string -> add string to result string  // result + ', ' + string;
  if number -> add number to result string  // result + ', ' + number;
  if array -> add to result string with brackets "[" + Func(arr) + "]", Func: create parent string (''), iterate through, call function on each element
  if object -> add to result string with braces "{" 

---

function stringify (arrPrimObj) {
  
  if (typeof arrPrimObj 

}

*******************************************************************************/

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj, previousString) {
  previousString = previousString || '';  
  console.log('begin    :', previousString);
    
  // base cases
  if (typeof obj === 'string') {
     return '\"' + obj + '\"';
  }

  if (typeof obj === 'number') {
      return String(obj);
  }

  if (typeof obj === 'boolean') {
      return String(obj);
  }

  if (obj === null) {
      return String(null);
  }

  // recursive cases
  // if obj ===  array, iterate through array and call stringify on each ele
  if (Array.isArray(obj)) {
      previousString += "[";

      console.log('enter if :', previousString);

      for (var i = 0, length = obj.length; i < length; i++) {
	  if (i > 0) {
	      previousString += ',';
	  }
	  previousString += stringifyJSON(obj[i]);
          console.log('end loop :', previousString);	  
      }

      console.log('exit for :', previousString);

      previousString += "]";
  } else {
      var count = 0;
      previousString += "{";
      console.log("ent for in:", previousString);

      for (var propName in obj) {
          if (typeof obj[propName] !== 'function' && obj[propName] !== undefined) {
              previousString += (count > 0 ? ',' : '') + '\"' + propName + '\"'+ ":";
              previousString += stringifyJSON(obj[propName]);
	      console.log("end each for:", previousString);
	      count++;
  	  }
      }
      previousString += "}";
      console.log("exit forIn :", previousString);
  }

  console.log('final ret:', previousString);
  return previousString;
};

// primitive values and corner cases
var test00 = [];         // empty array
var test01 = {};         // empty literal obj
var test02 = 0;          // number zero
var test03 = 3;          // positive num
var test04 = -4;         // neg number
var test05 = '0';        // string char '0'
var test06 = '3';        // string of pos number
var test07 = 'a';        // char
var test08 = '';         // empty string
var test09 = 'word';     // string word

var test0 = ['a'];
var test1 = ['a', 'b', 'c'];
var test2 = ['a', 'b', 2, 'c'];
var test3 = ['a', 'b', ['c']];
var test4 = ['a', 'b', [2, 'c']];
var test5 = ['a', 'b', [[2], 'c'], 'd', [[[ 'e', '5' ], 'g', ], 10] ];
var test6 = ['a', {no: 'yes'}, 'b'];
var test7 = ['a', {no: 'yes'}, 'b', ['c', {d: ['three', 3, '3']}]];
var test8 = {no: 'yes'};
var test9 = {no: 'yes', five: 5};

console.log(stringifyJSON(test7));
