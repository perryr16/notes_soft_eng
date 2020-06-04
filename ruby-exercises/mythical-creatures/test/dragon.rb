class Dragon

  attr_accessor :name, :color, :rider, :hungry, :eat

  def initialize(name, color, rider)
    @name = name
    @color = color
    @rider = rider
    @hungry = true
    @eat_count = 0
  end

  def hungry?
      @hungry
  end

  def eat
    @eat_count += 1
    if @eat_count < 3
      @hungry = true
    else
      @hungry = false
    end
  end

end

# norbert = Dragon.new("Norbert", "gold", "hagrid")
# puts "-" * 10
# puts "Name: #{norbert.name}"
# puts "Hungry? #{norbert.hungry?}"
# norbert.eat
# puts "Eat count: #{norbert.eat_count}"
# puts "still hungry? #{norbert.hungry?}"
# norbert.eat
# puts "Eat count: #{norbert.eat_count}"
# puts "still hungry? #{norbert.hungry?}"
# norbert.eat
# puts "Eat count: #{norbert.eat_count}"
# puts "still hungry? #{norbert.hungry?}"
#
# puts "-" * 10
