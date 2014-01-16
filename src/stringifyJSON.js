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
var stringifyJSON = function (obj) {
  // starting
  
};


// my own test cases
var test0 = ['a'];
var test1 = ['a', 'b', 'c'];
var test2 = ['a', 'b', 2, 'c'];
var test3 = ['a', 'b', ['c']];
var test4 = ['a', 'b', [2, 'c']];
var test5 = ['a', 'b', [[2], 'c']];
var test6 = ['a', {no: 'yes'}, 'b'];
var test7 = ['a', {no: 'yes'}, 'b', ['c', {d: ['three', 3, '3']}]];
