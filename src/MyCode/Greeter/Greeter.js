const _ = require("lodash");
const Utils = {
  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  trim(str) {
    return str.trim();
  }
}

let isMorning = function(currentTime) {
  return currentTime.getHours() > 5 && currentTime.getHours() < 13;
};

let isEvening = function(currentTime) {
  return currentTime.getHours() > 17 && currentTime.getHours() < 23;
};

let isNight = function(currentTime) {
  return currentTime.getHours() > 21 || currentTime.getHours() < 7;
};



class Greeter {
  constructor(currentTime = new Date(), logger, greetBuilder = new GreetBuilder()) {
    this.ct = currentTime;
    this.logger = logger;
    this.greetBuilder = greetBuilder;
  }
  greet(name) {
    let nameWithFirstCapitalLetter = Utils.capitalizeFirstLetter(name);
    let nameWithFirstCapitalLetterTrim = Utils.trim(nameWithFirstCapitalLetter)
    let prefix = this.greetBuilder.getPrefixGreetingByTime(this.ct);
    let greet = this.greetBuilder.build(prefix, nameWithFirstCapitalLetterTrim);

    if (this.logger) {
      this.logger.log(greet);
    }
    return greet;
  }
}

class GreetBuilder {
  build(prefix = "", name) {
    return `${prefix} ${name}`;
  }

  getPrefixGreetingByTime(currentTime) {
    let prefix = "Hello";
    if (isMorning(currentTime)) {
      prefix = "Good morning";
    } else if (isEvening(currentTime)) {
      prefix = "Good evening";
    } else if (isNight(currentTime)) {
      prefix = "Good night";
    }
    return prefix;
  };
}


module.exports = Greeter;
