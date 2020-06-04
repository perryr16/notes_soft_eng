class Pirate

  attr_accessor :name, :job, :cursed

  def initialize(name, job = "Scallywag")
    @name = name
    @job = job
    @heinous_act = 0
    @cursed = false
  end

  def cursed?
    @cursed
  end

  def commit_heinous_act
    @heinous_act += 1
    if @heinous_act < 3
      @cursed = false
    else
      @cursed = true
    end
  end

end
