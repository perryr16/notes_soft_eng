class Medusa
  attr_accessor :name, :stare, :statues

  def initialize(name, stare = true)
    @name = name
    @stare =  stare
    @statues = []
  end

  def respond_to?(var)
    var
  end

  def stare(victum)
    statues << victum
    victum.become_stoned
  end

end

class Person
  attr_reader :name
  attr_accessor :stoned

  def initialize(name)
    @name = name
    @stoned = false
  end

  def become_stoned
    @stoned = true
  end

  def stoned?
    @stoned
  end

end


puts "-" * 10
m = Medusa.new("medusa")
puts "name: #{m.name}"
puts "can stare? #{m.respond_to?(:stare)}"
puts "has statues? #{m.respond_to?(:statues)}"
person = Person.new("ross")
m.stare(person)
puts "statues: #{m.statues}"
puts "Count: #{m.statues.count}"
puts "firstname: #{m.statues.first.name}"
puts "-" * 10
