class Santa

  def initialize
    @fits = true
    @count = 0
  end

  def fits?
    @fits
  end

  def eats_cookies
    @count += 1
    if @count > 2
      @fits  = false
    end
  end




end
