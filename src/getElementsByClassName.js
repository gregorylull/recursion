// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// should use:
// document.body
// element.childNOdes
// element.classList

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  // your code here
  var targetArray = [];  

  var getElements = function (parentNode) {
      if (parentNode.classList('target')) {
	  targetArray.push(parentNode);
      }

      if (parentNode.firstChild === null) {
	  getElements(parentNode.nextSibling);
      } else {
	  
      }
  };
      
};


var allNodes = document.body.childNodes;

// note if no classList, then undefined. 

/*
<body>
  <p> has child </p>
</body>

note:  document.body.childNodes[0].hasChildNodes === true 

  this is because 'has child' is a TEXT node!!

*/

for (var i = 0, length = allNodes.length; i < length; i++ ) {
    console.log(allNodes.classList.contains('target'));
}
