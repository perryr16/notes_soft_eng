require 'pry'
class RollCall


    def initialize
      @longest_name = nil
      @roll_call = []
    end

    def <<(name)
      @roll_call << name
    end

    def longest_name
      #binding.pry
      #@roll_call.max
      longest = @roll_call.max_by do |name|
        name.length
      end

    end

end
