class Student

  attr_accessor :grade

  def initialize(grade = "C")
    @grade = grade
  end

  def study
    if @grade == "B"
      @grade = "A"
    elsif @grade == "C"
      @grade = "B"
    elsif @grade == "D"
      @grade = "C"
    elsif @grade == "F"
      @grade = "D"
    end
  end

    def slack_off
      if @grade == "A"
        @grade = "B"
      elsif @grade == "B"
        @grade = "C"
      elsif @grade == "C"
        @grade = "D"
      elsif @grade == "D"
        @grade = "F"
      end
    end

end
