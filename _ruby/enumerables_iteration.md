ITERATION
-----
#methods 
THE OG----
.each # returns original array
SAME LENGTHS-----
a = array
all below have "new_array = array.enumberable"
= a.map # returns "new_array" of SAME length. can also CHANGE DATA TYPE ([true, false, true])
= a.collect # ^same!
= a.sort_by # sorts by condition. naturally by alphabetical or numberical
= a.zip(b) # no do necessary # pairs two arrays. a [1,2,3] b = ['a','b','c'] c = a.zip(b) => [[1,'a'], [2, 'b'], [3,'c']]
SUBSETS--------
= a.find # returns the first value when codition is true, OR TRUTHY (NOT FALSEY (NIL/FALSE))
= a.detect # ^same!
= a.find_all # returns all values when condition is true
= a.select ^same!
= a.reject # removes value if condition is true
a.each_cons(2) do |fist, second| # you have consecutive values to work with. if (3), |1st, 2nd, 3rd|

ONE VALUE-------
= a.reduce(starting_value) |result, element| sum e.g. sum1 = a.reduce(0) { |sum, num| sum + num }
= a.sum = sums each value


DIFFERENT DATA TYPE--------
= a.map 
= a.count # tallys 1 if condition is true
= a.any? # returns 1 true if any true conditions
= a.all? # returns 1 true if ALL true conditions
= a.none? # returns 1 true if all false conditions
= a.one? # returns true if exactly 1 true condition
= a.group_by # returns a HASH where where the key is value that all share
= a.max_by # returns the greates value given the condition
= a.min_by # returns the smallest value given the condition (not a true/false),ex: word.length

.max(num) # returns the number of objects with highest values
.min(num) # returns the number of objects with highest values
.max_by
.min_by
.sort_by
.all?
.any?
.none? 
.one?



-----
general format
```
collection.each do |block_variable|
	code here runs for each elelent
end
```
ex:
```
a = ['ross', 'anna', 'mcc', 'jac']
a.each do |x|
	puts x
end

=>
ross
anna
mcc
jac
```
*notes*: everthing between DO and END is in the BLOCK
the block is what runs for each element
"x" is the block variable
for the first run, x = 'ross'


HASHES:
---------
hash = {a: 1, b:2}
hash.each do |key, value|
	p key
	p value
end

:a
1
:b
2
--
hash = {a: 1, b:2}
hash.each do |element|
	p element
end

[:a, 1]
[:b, 2]



SINGLE LINE:
----------
REPLACE do and end with {}
```
a.each {|x| puts x}
```
EXAMPLES
print doubles
a = [1, 2, 3, 4]

a.each do |x| 
  puts x * 2
end

create new array of doubles
b = []
a.each do |x| 
  b << x * 2
end


ODD NUMBERS
puts "print the odd numbers"
b = []
a.each do |x|
  if x % 2 != 0
    b << x
  end
end
puts "b = #{b}"

LOOPS
======

do & end
ex:
5.times do
  puts "Hello, World!"
end

can use {} instead
5.times{ puts "Hello, World!" }

5.times do |i|
  puts "#{i}: Hello, World!"
end

HAVE TO USE "" (not '') when inserting variables


EXAMPLES
see: iteration_practice.rb in day_2 folder