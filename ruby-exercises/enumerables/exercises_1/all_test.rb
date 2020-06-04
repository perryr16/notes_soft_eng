gem 'minitest'
require 'minitest/autorun'
require 'minitest/pride'

class AllTest < Minitest::Test

  def test_all_zeros
    numbers = [0, 0, 0, 0, 0, 0, 0]
    all_zeros = numbers.all? do |number|
      number.zero?
    end
    assert all_zeros
  end

  def test_not_all_zeros
    numbers = [0, 0, 0, 0, 1, 0, 0, 0]
    all_zeros = numbers.all? do |number|
      # Your code goes here
      number.zero?

    end
    refute all_zeros
  end

  def test_all_gone

    words = ["gone", "gone", "gone", "gone", "gone", "gone", "gone"]
    # Your code goes here
    all_gone = words.all? do |word|
      word == "gone"
    end
    assert all_gone
  end

  def test_not_all_gone
    words = ["gone", "gone", "gone", "gone", "gone", "there", "gone", "gone"]
    # Your code goes here
    all_gone  = words.all? do |word|
      word == 'gone'
    end
    refute all_gone
  end

  def test_all_empty

    strings = ["", "", "", "", "", "", ""]
    # Your code goes here
    all_empty = strings.all? do |string|
      string.empty?
    end
    assert all_empty
  end

  def test_not_all_empty

    strings = ["", "", "", "full", "", "", ""]
    # Your code goes here
    all_empty = strings.all? do |string|
      string.empty?
    end
    refute all_empty
  end

  def test_not_all_uppercase

    words = ["DOUGHNUT", "CASH", "MAIN", "bOWl", "SMACK", "SAND"]
    # Your code goes here
    all_caps = words.all? do |word|
      word == word.upcase
    end
    refute all_caps
  end

  def test_all_lies

    lies = [false, false, false, false]
    # Your code goes here
    all_lies = lies.all? do |lie|
      !lie
    end
    assert all_lies
  end

  def test_all_multiples_of_7
    numbers = [42, 14, 35, 49, 28, 56, 21, 7]
    # Your code goes here
    all_multiples_of_7 = numbers.all? do |num|
      num % 7 == 0
    end
    assert all_multiples_of_7
  end

  def test_all_3_digits_long
    numbers = [981, 831, 509, 332, 892, 899, 110, 120]
    # Your code goes here
    all_3_digits = numbers.all? do |num|
      num.to_s.length == 3
    end
    assert all_3_digits
  end

  def test_all_4_letter_words

    words = ["love", "hate", "fire", "bird", "call", 'word']
    # Your code goes here
    all_4_letters = words.all? do |word|
      word.length == 4
    end
    assert all_4_letters
  end

end
