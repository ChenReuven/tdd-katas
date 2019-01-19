const Greeter = require("./Greeter");

describe("Greeter", () => {
  describe("greet", function() {
    let greeter;
    let logger;

    beforeEach(() => {
      greeter = new Greeter();
      logger = {
        log: jest.fn()
      }
    });

    it("should return Hello chen when called greet function ", () => {
      expect(greeter.greet("chen")).toBe("Hello Chen");
    });

    it("should trims the input", () => {
      expect(greeter.greet("chen   ")).toBe("Hello Chen");
    });

    it("should capitalizes the first letter of the name", () => {
      expect(greeter.greet("chen   ")).toBe("Hello Chen");
    });

    it("should returns Good morning {name} when the time is 06:00-12:00", () => {
      let morningTime = new Date("1/1/19 8:00");
      let greeter = new Greeter(morningTime);
      expect(greeter.greet("chen")).toBe("Good morning Chen");
    });

    it("should returns Good evening {name} when the time is 18:00-22:00", () => {
      let eveningTime = new Date("1/1/19 19:00");
      let greeter = new Greeter(eveningTime);
      expect(greeter.greet("chen")).toBe("Good evening Chen");
    });

    it("should returns Good night <name> when the time is 22:00-06:00", () => {
      let nightTime = new Date("1/1/19 23:00");
      let greeter = new Greeter(nightTime);
      expect(greeter.greet("chen")).toBe("Good night Chen");
    });

    it("should logs into console each time it is called", () => {
      let morningTime = new Date("1/1/19 8:00");
      let greeter = new Greeter(morningTime, logger);
      expect(greeter.logger.log).not.toHaveBeenCalled();
      greeter.greet('chen');
      expect(greeter.logger.log).toHaveBeenCalled();
      expect(greeter.logger.log).toHaveBeenCalledTimes(1);
      expect(greeter.logger.log).toHaveBeenCalledWith('Good morning Chen');
    });
  });
});
