# DOMcash
###### a lightweight DOM manipulation library

Here is a Connect Four demo of DOMcash I made that employs simple & clean flat UI design: http://dkang.me/DOMcash/


## Documentation
Easy to use functionality includes the ability to toggle classes, edit HTML content and elements, find child/parent elements, handle events, & make AJAX requests.

#### $l(selector)
$l takes in a string or a function as an argument. When passed a string, the function will turn all instances of that element in your HTML document into DOM nodes which can then be manipulated further utilizing the below functions. When a function is passed, it will be called when the HTML has finished rendering.

### DOM manipulation
#### html
If html receives an argument become the innerHTML of all the selected nodes. If it does not receive an argument, it will return the innerHTML of the first instance of the element you are selecting.
#### empty
Clears out content (innerHTML) of all selected HTML elements.
#### remove
Removes all selected HTML elements.
#### append
Takes in a $l wrapped node collection, HTML element, or a string as an argument. Inserts the argument into the inner HTML of the selected elements.
#### attr
When two arguments are passed, the selected elements have element attributes set on them (name, value).

When one argument (name) is passed, the value of an already set attribute is checked.
#### addClass
Adds class to the selected elements.
#### removeClass
Removes class to the selected elements.
### Traversal
#### children
Returns all elements within selected HTML elements.
### parent
Returns parent HTML element of all selected HTML elements
### find
Returns the descendants of each selected HTML element, filtered by its argument of a selector.
### Event Handling
#### on
Taking in (eventType, callback), on adds event handlers for all selected elements.
#### off
Taking in only (eventType), off removes event handlers for all selected elements.
### ajax
$().ajax takes in one options object as an argument. The options object can utilize success, error, url, method, data, and contentType.
