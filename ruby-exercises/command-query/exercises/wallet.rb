require 'pry'
class Wallet

  attr_reader :cents
  def initialize(cents = 0)
    @cents = cents
    @wallet = []
  end

  def <<(sym)
    @wallet << sym
    if sym == :penny
      @cents += 1
    elsif sym == :nickel
      @cents += 5
    elsif sym == :dime
      @cents += 10
    elsif sym == :quarter
      @cents += 25
    elsif sym == :dollar
      @cents += 100
    end
    sum_cash
  end

  def take(sym1, sym2 = nil)
    if @wallet.include?(sym1)
      index1 = @wallet.index(sym1)
      #binding.pry
      @wallet.delete_at(index1)
    end
    if @wallet.include?(sym2)
      if sym2 != nil
        index2 = @wallet.index(sym2)
        @wallet.delete_at(index2)
      end
    end


    sum_cash
  end

  def sum_cash
    @cents = 0
    @wallet.each do |coin|
      if coin == :penny
        @cents += 1
      elsif coin == :nickel
        @cents += 5
      elsif coin == :dime
        @cents += 10
      elsif coin == :quarter
        @cents += 25
      elsif coin == :dollar
        @cents += 100
      end
    end

  end



end
