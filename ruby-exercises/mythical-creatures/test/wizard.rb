class Wizard

  attr_accessor :name, :bearded

  def initialize(name, bearded: true)
    @name = name
    @bearded = bearded
  end

  def bearded?
    @bearded
  end

  def incantation(spell)
    "sudo #{spell}"
  end


end


puts "-" * 10
gand = Wizard.new("gandolf")
puts "name: #{gand.name}"
puts "beareded: #{gand.bearded?}"
dumb = Wizard.new("dumbledoor", bearded: false)
puts "name: #{dumb.name}"
puts "bearded: #{dumb.bearded?}"


puts "-" * 10
