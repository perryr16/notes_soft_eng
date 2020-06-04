gem 'minitest'
require 'minitest/autorun'
require 'minitest/pride'
require 'pry'

class AnyTest < Minitest::Test

  def test_has_at_least_one_zero
    numbers = [2, 0, 9, 3, 0, 1]
    has_zero = numbers.any? do |number|
      number.zero?
    end
    assert has_zero
  end

  def test_does_not_have_any_zeros
    numbers = [3, 1, 3, 2, 4, 9, 8]
    has_zero = numbers.any? do |number|
      # Your code goes here
      number.zero?
      #number == 0
    end
    refute has_zero
  end

  def test_has_at_least_one_alice
    names = ["Bill", "Bob", "Burton", "Alice", "Brandon"]
    # Your code goes here
    has_alice = names.any? do |name|
      name == 'Alice'
    end
    assert has_alice
  end

  def test_no_alices
    names = ["Chuck", "Charlene", "Cory", "Chris", "Carl"]
    # Your code goes here
    has_alice = names.any? do |name|
      name == 'Alice'
    end
    #binding.pry
    refute has_alice
  end

  def test_has_a_multi_word_phrase
    phrases = ["Sure!", "OK.", "I have no idea.", "Really?Whatever."]
    # Your code goes here
    has_multi_word_phrase = phrases.any? do |phrase|
      phrase.include?(' ')
    end
    assert has_multi_word_phrase
  end

  def test_no_monkeys
    animals = ["elephant", "hippo", "jaguar", "python"]
    # Your code goes here
    has_monkeys = animals.any? do |animal|
      animal == 'monkey'
    end
    refute has_monkeys
  end

  def test_no_multiples_of_five

    numbers = [3, 1, 3, 2, 4, 9, 8]
    # Your code goes here
    multiples_of_5 = numbers.any? do |num|
      num % 5 == 0
    end
    refute multiples_of_5
  end

end
