require 'product'
class Catalogue

  attr_reader :cheapest
  def initialize
    @cheapest = nil
    @products = []
  end

  def <<(product)
    @products << product
  end

  def cheapest
    cheapest_list = @products.min_by do |array|
      array[1]
    end
    binding.pry
    cheapest = cheapest_list[0]
  end

end
