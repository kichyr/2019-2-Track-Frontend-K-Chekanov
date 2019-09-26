//import { doesNotReject } from "assert";

/*
You are given a non-empty list of integers (X).

For this task, you should return a list consisting of
only the non-unique elements in this list.

To do so you will need to remove all unique elements
(elements which are contained in a given list only once).

When solving this task, do not change the order of the list.

Example:

input (array of integers): [1, 2, 3, 1, 3]
output (iterable of integers): [1, 3, 1, 3]

1 and 3 are non-unique elements.

More examples:

nonUniqueElements([1, 2, 3, 1, 3]) == [1, 3, 1, 3]
nonUniqueElements([1, 2, 3, 4, 5]) == []
nonUniqueElements([5, 5, 5, 5, 5]) == [5, 5, 5, 5, 5]
nonUniqueElements([10, 9, 10, 10, 9, 8]) == [10, 9, 10, 10, 9]
 */
//console.log(nonUniqueElements([5,4,5,5,5]))
export function nonUniqueElements(data) {
  var counterOfElem = new Array(data.length);

  for(var i = 0; i < data.length; i++) {
  counterOfElem[i] = 1;
    for(var j = 0; j < i; j++)
      if(data[j] == data[i]) {
        counterOfElem[j] ++;
        counterOfElem[i] = counterOfElem[j];
      }

  }

  var nonUniqueElements = [];
  for(var i = 0; i < data.length; i++) {
    if(counterOfElem[i] > 1) {
      nonUniqueElements.push(data[i]);
    }
  }
  return nonUniqueElements;
}
