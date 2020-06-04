gem 'minitest'
require 'minitest/autorun'
require 'minitest/pride'
require 'pry'

class MapTest < Minitest::Test

  def test_capitalize
    names = ["alice", "bob", "charlie"]
    capitalized_names = names.map do |name|
      name.capitalize
    end
    assert_equal ["Alice", "Bob", "Charlie"], capitalized_names
  end

  def test_doubles
    numbers = [1, 2, 3, 4, 5]
    doubles = numbers.map do |number|
      # Your code goes here
      number * 2
    end
    assert_equal [2, 4, 6, 8, 10], doubles
  end

  def test_squares

    numbers = [1, 2, 3, 4, 5]
    # Your code goes here
    squares = numbers.map do |num|
      num ** 2
    end
    assert_equal [1, 4, 9, 16, 25], squares
  end

  def test_lengths

    names = ["alice", "bob", "charlie", "david", "eve"]
    # Your code goes here
    lengths = names.map { |name| name.length}
    assert_equal [5, 3, 7, 5, 3], lengths
  end

  def test_normalize_zip_codes

    numbers = [234, 10, 9119, 38881]
    # Your code goes here
    zip_codes = numbers.map do |num|
  #   binding.pry
      num = "0" * (5 - num.to_s.length) + num.to_s
    end
    assert_equal ["00234", "00010", "09119", "38881"], zip_codes
  end

  def test_backwards

    names = ["alice", "bob", "charlie", "david", "eve"]
    # Your code goes here

    backwards = names.map do |name|
      name.reverse
    end
    assert_equal ["ecila", "bob", "eilrahc", "divad", "eve"], backwards
  end

  def test_words_with_no_vowels
    words = ["green", "sheep", "travel", "least", "boat"]
    # Your code goes here
    without_vowels = words.map do |word|
      word.tr('aeiou','')
    end
    assert_equal ["grn", "shp", "trvl", "lst", "bt"], without_vowels
  end

  def test_trim_last_letter
    animals = ["dog", "cat", "mouse", "frog", "platypus"]
    # Your code goes here
    trimmed = animals.map do |animal|
      animal[0..-2]
    end

    assert_equal ["do", "ca", "mous", "fro", "platypu"], trimmed
  end

end
