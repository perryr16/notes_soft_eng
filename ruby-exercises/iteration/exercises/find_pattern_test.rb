gem 'minitest'
require 'minitest/autorun'
require 'minitest/pride'

class FindPatternTest < Minitest::Test

  def test_1
    ages = [39, 45, 29, 24, 50]
    younger_than_thirty = nil
    ages.each do |age|
      if age < 30
        younger_than_thirty = age
        break
      end
    end
    assert_equal 29, younger_than_thirty
  end

  def test_2
    ages = {
      abdi: 39,
      hassan: 45,
      ladonna: 29,
      margaret: 24,
      miguel: 50
    }
    younger_than_thirty = nil
    ages.each do |name, age|
      if age < 30
        younger_than_thirty = name
        break
      end
    end
    assert_equal :ladonna, younger_than_thirty
  end

  def test_3
    ages = [39, 45, 29, 24, 50]
    older_than_fifty = nil
    ages.each do |age|
      # Your Code Here
      if age > 50
        older_than_fifty = age
        break
      end

    end

    assert_nil older_than_fifty
  end

  def test_4
    ages = {
      abdi: 39,
      hassan: 45,
      ladonna: 29,
      margaret: 24,
      miguel: 50
    }
    older_than_fifty = nil
    ages.each do |name, age|
      # Your Code Here
      if age > 50
        older_than_fifty = ages[name]
        break
      end
    end

    assert_nil older_than_fifty
  end

  def test_5
    ages = [39, 45, 29, 24, 50]
    multiple_of_three = nil
    # Your Code Here
    ages.each do |age|
      if age % 3 == 0
        multiple_of_three = age
        break
      end
    end


    assert_equal 39, multiple_of_three
  end

  def test_6
    ages = {
      abdi: 39,
      hassan: 45,
      ladonna: 29,
      margaret: 24,
      miguel: 50
    }
    multiple_of_three = nil
    # Your Code Here
    ages.each do |name, age|
      if ages[name] % 3 == 0
        multiple_of_three = name
        break
      end
    end


    assert_equal :abdi, multiple_of_three
  end

  def test_7
    people = ["Willie", "Carmen Sandiego", "Bryan", "Faith", "Zac"]
    # Your Code Here
    carmen = ''
    # find if 'carmen' is in any of the strings
    people.each do |person|
      if person == "Carmen Sandiego"
        carmen = person
      end
    end


    assert_equal "Carmen Sandiego", carmen
  end

  def test_8
    places = {
      Bangkok: "Willie",
      Santa_Fe: "Carmen Sandiego",
      Rome: "Bryan",
      Munich: "Faith",
      Mogudishu: "Zac"
    }
    # Your Code Here
    where_is_carmen_sandiego = nil

    places.each do |place, person|
      if "Carmen Sandiego" == person
        where_is_carmen_sandiego = place
      end
    end

    assert_equal :Santa_Fe, where_is_carmen_sandiego
  end

  def test_9
    numbers = [3, 7, 13, 11, 10, 2, 17]
    # Your Code Here
    even = nil

    numbers.each do |number|
      if number == 10
        even = number
      end
    end

    assert_equal 10, even
  end

  def test_10
    purchases = {
      "shoes" => :paid,
      "backpack" => :paid,
      "books" => :pending,
      "posters" => :paid,
      "food" => :pending
    }
    # Your Code Here
    pending = nil
    purchases.each do |item, status|
      if status == :pending
        pending = item.to_sym
        break
      end
    end

    assert_equal :books, pending
  end

  def test_11
    purchases = {
      "shoes" => :paid,
      "backpack" => :paid,
      "books" => :pending,
      "posters" => :paid,
      "food" => :pending
    }
    # Your Code Here
    starts_with_b = ''
    purchases.each do |item, status|
      if item[0] == 'b'
        starts_with_b = item
        break
      end
    end 


    assert_equal "backpack", starts_with_b
  end
end
