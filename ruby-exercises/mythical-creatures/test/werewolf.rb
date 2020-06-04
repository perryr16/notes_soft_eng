class Werewolf

  attr_accessor :name, :location, :human

  def initialize(name, location = "London")
    @name = name
    @location = location
    @human = true
  end

  def human?
    @human
  end

  def werewolf?
    !@human
  end

  def change!
    @human = !@human
  end



end
