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

  // elements that contain our target class will be pushed to this array
  var targetArray = [];  

  // recursive function that pushes nodes to the targetArray above.
  // does NOT return a value.
  var getElements = function (parentNode) { 
  
  // base cases
      
      // return is necessary because we need to exit the function if the
      // parentNode does not exist
      if (parentNode === null) {
	  return;

      // .classList is undefined when parentNode === whitespace or text node,
      // and we cannot call .contains() on an undefined value
      } else if (parentNode.classList !== undefined) {
	  if (parentNode.classList.contains(className)) {
	      targetArray.push(parentNode);
	  }	  
      }

   // recursive logic

      // order is important, calling .nextSibling HAS TO BE on the right side
      // of || . If .nextSibling and .firstChild were switched, our recursive
      // function would traverse the DOM first and skip child nodes that
      // potentially had our target class (see foonotes for example)
      getElements(parentNode.firstChild) || getElements(parentNode.nextSibling);

      // NOTE: 'return' is not necessary because this function does not return a
      // value, the end goal is to push objects to our 'targetArray'
  };
    
  getElements(document.body);

  return targetArray;      
};

/*******************************************************************************

    Footnotes

*******************************************************************************/

// imagine this HTML document and its simple DOM representation

/*

<html>
    <head>
        <script> ... </script>
    </head>
    
    <body>
        <p class="target"> first  </p>

	<div>
	    <p class="target"> within 2nd </p>
	</div>

	<p> third <em> within em </em> </p>
	
    </body>
</html>

            HTML
	     |
    ___________________
    |                 |
  HEAD              BODY
                      |
               ___________________________
               |        |                |
	   P(target)   DIV               P
	       |        |                |
	    "first"   P(target)       --------
	                |      	      |      |
		   "within 2nd"    "third"   EM
		                             |
		  		         "within em"

IF our recursive function had been (not work):
    getElement(parentNode.nextSibling) || getElement(parentNode.firstChild);
    
var parentNode = document.body;
    parentNode === BODY
    parentNode.firstChild === P (target)       // push to array
    parentNode.firstChild.nextSibling === DIV  // does not check child, MISSED!
    parentNode.firstChild.nextSibling.nextSibling === P
    parentNode.firstChild.nextSibling.nextSibling.nextSibling === null
    parentNode.firstChild.nextSibling.nextSibling.firstChild === "third"
    parentNode.firstChild.nextSibling.nextSibling.firstChild.nextSibling === EM
    
    -since the function traverses RIGHT (siblings) first, instead of DOWN (child), we miss the first child (P target) of DIV

  - our function's working recursive call is:
    getElement(parentNode.firstChild) || getElement(parentNode.nextSibling);

    which results in this action:

    BODY                      // || operator exectues left side, .firstChild
        P(target)             // push to array, call .firstChild
            "first"           // call .firstChild
	        null          // return;  || operator executes .nextSibling
        DIV                   // no 'target', call .firstChild
	    P(target)         // push to array, call .firstChild
	        "within 2nd"  // call .firstChild
		    null      // return; || operator executes .nextSibling
        P                     // no 'target', call .firstChild
	    "third"           // call .firstChild
	        null          // return; || executes .nextSibling
            EM                // no 'target', call .firstChild
	        "within me"   // call .firstChild
                    null      // return; || calls .nextSibling
	null                  // return; exits
*/
