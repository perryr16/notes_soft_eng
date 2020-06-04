class Product

  attr_reader :name, :price
  def initialize(item, price)
    @name = item
    @price = price
  end
end
