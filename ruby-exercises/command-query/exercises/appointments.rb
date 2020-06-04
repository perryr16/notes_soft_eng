require 'time'
class Appointments

  #attr_reader :earliest
  def initialize
    @earliest = nil
    @time = []
  end

  def at(time)
    @time << time
  end

  def earliest
    @time.min
  end



end
