class Dog

  def initialize
    @hungry = true
  end

  def hungry?
    @hungry
  end

  def eat
    @hungry = false
  end

end
