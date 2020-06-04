require 'pry'
class Clearance

  def initialize
    @best_deal = nil
    @clearance = []
  end

  def best_deal
    binding.pry
    @best_deal
  end

  def <<(item)
    @clearance << item
  end

end
