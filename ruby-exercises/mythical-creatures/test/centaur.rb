class Centaur

  attr_reader :name, :breed, :standing, :cranky_count, :laying
  attr_accessor  :cranky

  def initialize(name, breed)
    @name = name
    @breed = breed
    @standing = true
    @cranky_count = 0
    @cranky = false
    @laying = !@standing
  end

  def shoot
    @cranky_count += 1
    if @cranky_count > 2
      @cranky = true
    end

    if @cranky || @laying
      "NO!"
     else
      "Twang!!!"
     end
  end

  def run
    @cranky_count += 1
    if @cranky_count > 2
      @cranky = true
    end

    if @cranky || @laying
      "NO!"
    else
    "Clop clop clop clop!!!"
    end
  end

  def cranky?
    @cranky
  end

  def standing?
    @standing
  end

  def sleep
    @cranky_count = 0
    @cranky = false
    if @standing
      "NO!"
    else
      "ok"
    end
  end

  def laying?
    @laying
  end

  def lay_down
    @standing = false
    @laying = true
  end

  def stand_up
    @standing = true
    @laying = false
  end

end

puts "-" * 10
c = Centaur.new("n", "b")
puts "cc #{c.cranky_count}"
c.shoot
puts "cc #{c.cranky_count}"
puts "cranky #{c.cranky?}"
c.shoot
puts "cc #{c.cranky_count}"
c.shoot
puts "cranky #{c.cranky?}"
puts "cc #{c.cranky_count}"
puts "cranky #{c.cranky?}"
c.shoot
puts "cc #{c.cranky_count}"
puts "cranky #{c.cranky?}"
puts "-" * 10
