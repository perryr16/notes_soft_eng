gem 'minitest'
require 'minitest/autorun'
require 'minitest/pride'

class NoneTest < Minitest::Test

  def test_none_are_broken
    things = ["functional", "working", "works", "fixed", "good"]
    none_broken = things.none? do |thing|
      thing == "broken"
    end
    assert none_broken
  end

  def test_double_negative
    numbers = [9, 3, 3, 7, 6, -1]
    not_none_negative = numbers.none? do |number|
      number < 0
      # Your code goes here
    end
    refute not_none_negative
  end

  def test_none_are_negative
    numbers = [9, 3, 1, 8, 3, 3, 5]
    # Your code goes here
    none_negative = numbers.none? do |num|
      num < 0
    end
    assert none_negative
  end

  def test_none_shall_pass

    critters = ["elf", "hobbit", "dwarf", "wizard", "human"]
    # Your code goes here
    none_shall_pass = critters.none? do |critter|
      critter == "shall pass"
    end
    assert none_shall_pass
  end

  def test_one_or_more_shall_pass
    phrases = ["go", "left", "can cross", "shall pass", "must stay", "tarried"]
    # Your code goes here
    none_shall_pass = phrases.none? do |critter|
      critter == "shall pass"
    end
    refute none_shall_pass
  end

  def test_none_even
    numbers = [3, 9, 15, 21, 19]
    # Your code goes here
    none_even = numbers.none? do |num|
      num.even?
    end
    assert none_even
  end

end
