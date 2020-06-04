class Hobbit

  attr_accessor :name, :disposition, :age

  def initialize(name, disposition = "homebody")
    @name = name
    @disposition = disposition
    @age = 0
  end

  def celebrate_birthday
    @age += 1
  end

  def adult?
    if @age <= 32
     false
    else
      true
    end
  end

end


frodo = Hobbit.new("Frodo")
puts "-" * 10
puts "name: #{frodo.name}"
puts "disposition: #{frodo.disposition}"
puts "-" * 10
