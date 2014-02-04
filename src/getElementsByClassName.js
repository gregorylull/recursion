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

  var targetArray = [];  

  var getElements = function (parentNode) {

      if (parentNode === null) {
	  return;
      } else if (parentNode.classList !== undefined) {
	  if (parentNode.classList.contains(className)) {
	      targetArray.push(parentNode);
	  }	  
      }

      // order is important, calling .nextSibling HAS TO BE on the right side
      // of || , otherwise it would traverse first and skip child nodes
      return getElements(parentNode.firstChild) ||
	     getElements(parentNode.nextSibling);

  };
    
  getElements(document.body);

  return targetArray;      
};

// note if no classList, then undefined. 

/*
<body>
  <p> has child </p>
</body>

note:  document.body.childNodes[0].hasChildNodes === true 

  this is because 'has child' is a TEXT node!!

*/
