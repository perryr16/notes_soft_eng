require 'minitest/autorun'
require 'minitest/pride'
require 'pry'
class EnumerablesOneTest < Minitest::Test
  def test_squares
    numbers = [1, 2, 3, 4, 5]
    actual = numbers.map do |number|
      number ** 2
    end
    assert_equal [1, 4, 9, 16, 25], actual
  end

  def test_find_waldo

    words = ["noise", "dog", "fair", "house", "waldo", "bucket", "fish"]
    actual = words.find do |word|
      # Your Code Here
      word == 'waldo'
    end
    assert_equal "waldo", actual
  end

  def test_pick_words_with_three_letters

    words = ["pill", "bad", "finger", "cat", "blue", "dog", "table", "red"]
    actual = words.find_all do |word|
      word.length == 3
    end
    assert_equal ["bad", "cat", "dog", "red"], actual
  end

  def test_normalize_zip_codes
    numbers = [234, 10, 9119, 38881]
    # Your Code Here
    actual = numbers.map do |num|
    #  binding.pry
    "0" * (5 - num.to_s.length) + num.to_s
    end
    assert_equal ["00234", "00010", "09119", "38881"], actual
  end

  def test_no_waldo

    words = ["scarf", "sandcastle", "flag", "pretzel", "crow", "key"]
    # Your Code Here
    found = words.find do |word|
      word == "waldo"
    end
    assert_nil found
  end

  def test_pick_floats

    numbers = [3, 1.4, 3.5, 2, 4.9, 9.1, 8.0]
    # Your Code Here
    actual = numbers.find_all do |num|
      num.is_a?(Float)
    end
    assert_equal [1.4, 3.5, 4.9, 9.1, 8.0], actual
  end

  def test_pick_dinosaurs

    animals = ["tyrannosaurus", "narwhal", "eel", "achillesaurus", "qingxiusaurus"]
    actual = animals.find_all do |animal|
      animal.include?("saurus")
    end
    assert_equal ["tyrannosaurus", "achillesaurus", "qingxiusaurus"], actual
  end

  def test_words_with_no_vowels

    words = ["green", "sheep", "travel", "least", "boat"]
    # Your Code Here
    actual = words.map do |word|
      word.tr('aeiou', '')
    end
    assert_equal ["grn", "shp", "trvl", "lst", "bt"], actual
  end
end
