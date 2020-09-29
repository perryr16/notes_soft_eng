ARRAYS
--------
NAMING : SHOULD BE PLURAL

https://ruby-doc.org/core-2.4.1/Array.html#method-i-collect

a collection of data
a = {1, 2, 'three'}
array = {element 0, element 1...}

#METHODS
.split = array to string
.sort = assending order/alphabetical
.each = perform method on each element
.join = creates a string of all elements 
.join(x) = creates a string with x between
.index(element) = returns first position of element, if DNE returns nil
.include?(element) = returns true/false if element exists
.collect {|item| block} = creates an array where the block is done on each element
.first = returns first element
.first(x) = reutrns first x elements
.last = returns last element
.last(x) = returns last x elements
.shuffle = returns elements in random order
.sample = returns a random elelement
.count = returns number of elements
.shift = remove first element
.unshift = add first element
.pop = remove last element
.push = add element to end of array
.delete_at(index) = removes element at index
<< x << y = adds x, y to end of array (operator not a method)
.flatten = [1,2,[a,b]] > [1,2,a,b]
.compact = remove nil values. [1, nil, 2] = [1,2]
.sort = reorder array in ascending order (1,2,3) (a,b,c)
.uniq = remove dulicates [1,2,3,1,1,1] => [1,2,3]
.drop(number) = removes first "number" elements. need to assign to new variable
.rotate = indian sprints, [1,2,3] => [2,3,1]
.rotate(number) = number of elements to rotate, [1,2,3,4,5] .rotate(2) = [3,4,5,1,2]
.min(num) = returns array of smallest numbers with num elements
.max(nim) = returns array of largest numbers with num elements


mult/divide two arrays of equal length 
  def self.average(sum_array, length_array)
    sum_array.each_with_index.map do |sum, index|
      (sum.to_f / length_array[index].to_f ).round(2)
    end
  end


call a position
a[2] = 3
call last
a.last = 4

==============
FULL DEFINITIONS
===============
### Array Methods

## <<
Add element to end of array
```
a = [1, 2, 3]
$ a << 4
=> [1, 2, 3, 4]
```

## .sort
returns a new array after sorting numbers lowest to highest
or strings in alphabetical order
*note: only works when all elements are of the same data type*
```
a = [1, 3, 2, 4]
$ b = a.sort
=> b = [1, 2, 3, 4]

c = ['a', 'd', 'c', 'b']
$ d = c.sort
=> d = ['a', 'b', 'c', 'd']
```

## .each
calls the given block once for each element in the array
a form of iteration in which a method is done to **each** element


## .join
creates a new string by joining all the elements in the arrays
if a parameter is given then it places the parameter between each element
```
a = ['a', 'b', 'c']
a.join => 'abc'
a.join('-') => 'a-b-c'
```

## .index
returns the first element in the array that is equal to the parameter
```
a = [0, 1, 2, 3]
a.index(2) => 2
```

## .include?
a boolean result that will indicate if an element is present
```
a = [1, 2, 3]
a.include?(1) => true
a.include?(5) => false
```

## .collect
creates a new array containing the values returned by the block
```
a = ['a', 'b', 'c']
a.collect {|z| z + z} => ['aa', 'bb', 'cc']
```

## .first
returns the first element in the array
to return the first x elements, include (x)
```
a = ['a', 'b', 'c']
a.first => 'a'
a.first(2) => ['a', 'b']
```

## .last
returns the last element in the array
to return the last x elements, include (x)
```
a = ['a', 'b', 'c']
a.last => 'c'
a.last(2) => ['b', 'c']
```

## .shuffle
shuffles the elements of the array (random)
*different each time*
```
a = [1, 2, 3, 4]
b = a.shuffle => [1, 4, 2, 3]
c = a.shuffle => [4, 2, 3, 1]
```
