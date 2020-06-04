require 'pry'
class Floor

  def initialize
    @dirty = true
  end

  def dirty?
  #  binding.pry
    if @dirty
      "The floor should be dirty."
    else
      "The floor should be clean."
    end
  end

  def wash
    @dirty = false
  #  binding.pry
  end


end
