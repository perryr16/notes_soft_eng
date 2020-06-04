gem 'minitest'
require 'minitest/autorun'
require 'minitest/pride'

class OneTest < Minitest::Test

  def test_one_more
    words = ["bigger", "better", "more", "improved", "advantageous"]
    exactly_one = words.one? do |word|
      word == 'more'
    end
    assert exactly_one
  end

  def test_not_even_one_ring
    ornaments = ["bracelet", "anklet", "earring"]
    exactly_one_ring = ornaments.one? do |ornament|
      # Your code goes here
      ornament = 'ring'
    end
    refute exactly_one_ring
  end

  def test_not_just_one_ring
    ornaments = ["bracelet", "ring", "ring", "anklet", "earring"]
    # Your code goes here
    exactly_one_ring = ornaments.one? do |ornament|
      ornament == 'ring'
    end
    refute exactly_one_ring
  end

  def test_one_time
    words = ["morning", "time", "evening", "noon", "dusk", "dawn"]
    # Your code goes here
    exactly_one_time = words.one? do |word|
      word == 'time'
    end
    assert exactly_one_time
  end

  def test_one_double_digit_number
    numbers = [8, 2, 10, 333, 9, 101]
    # Your code goes here
    exactly_one_double_digit = numbers.one? do |num|
      num.to_s.length == 2
    end
    assert exactly_one_double_digit
  end

  def test_not_one_even_number
    numbers = [3, 20, 81, 101, 390, 321]
    # Your code goes here
    exactly_one_even_number = numbers.one? do |num|
      num.even?
    end
    refute exactly_one_even_number
  end

end
