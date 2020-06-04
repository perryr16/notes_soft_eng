class Vampire
  attr_accessor :name, :pet, :drink, :thirsty
  #attr_reader

  def initialize(name, pet = "bat", thirsty = true)
    @name = name
    @pet = pet
    @thirsty = true
  end

  def thirsty?
      @thirsty
  end

  def drink
    @thirsty = false
  end

end

# drac = Vampire.new("Drac")
# puts "-" * 10
# puts "Drac pet #{drac.pet}"
# puts "Drac name #{drac.name}"
# puts "Drac thirsty? #{drac.thirsty?}"
# drac.drink
# puts "just drank, are we thirsty? #{drac.thirsty?}"
# puts "new pet? #{drac.pet}"
# 
#
# puts "-" * 10
