class Time

  attr_reader :year, :month, :day, :hour, :min
  def initialize(year, month, day, hour, min)
    @year = year
    @month = month
    @day = day
    @hour = hour
    @min = min
  end
end
