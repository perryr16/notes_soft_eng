class Money

  attr_reader :amount
  def initialize
    @amount = 0
  end

  def earn(value)
    @amount += value
  end

  def spend(value)
    @amount -= value
    if @amount < 0
      @amount = 0
      "You can't spend what you don't have"
    end
  end

end
