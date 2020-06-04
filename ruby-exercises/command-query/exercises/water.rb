class Water

  attr_reader :temperature
  def initialize
    @temperature = 295
  end

  def heat
    @temperature += 1
  end

end
