enum WeekDays {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday",
  }

  enum WeatherTerms {
    Sunny = "Sunny",
    Cloudy = "Cloudy",
    PartlyCloudy = "Partly Cloudy",
    Rainy = "Rainy",
    Snowy = "Snowy",
    Foggy = "Foggy",
    Windy = "Windy",
    Thunderstorm = "Thunderstorm",
  }
  
  interface CurrentWeather {
    id: number;
    country: string;
    city: string;
    gmt: string;
    weathertype: string;
    temperature: number;
    humidity: number;
    pressure: number;
    wind: number;
    precipitation: number;
  }

class VirtualStorage<T extends CurrentWeather>{
private items: T[];
constructor() {
    this.items = [];
}
add(item: T) {
    this.items.push(item)
}
    remove(id: number) {
      const index = this.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }
    update(id: number, updates: Partial<T>) {
        //Partial - ??
      const index = this.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.items[index] = { ...this.items[index], ...updates };
      }
    }
    find(query: Partial<T>) {
      return this.items.filter((item) => {
        for (const key in query) {
          if (item[key] !== query[key]) {
            return false;
          }
          return true;
        }
      });
    }

    findOne(query: Partial<T>) {
      return this.items.find((item) => {
        for (const key in query) {
          if (item[key] !== query[key]) {
            return false;
          }
        }
        return true;
      });
    }
    count() {
      return this.items.length;
    }
    sumOfBodyLengths() {
      return this.items.reduce((sum, item) => sum + item.temperature, 0);
    }
  }

    //Add
  const weatherStorage = new VirtualStorage();
  weatherStorage.add(
        {
            id: 1,
            country: "Georgia",
            city: "Tbilisi",
            gmt: "UTC +4H",
            weathertype: "Cloudy",
            temperature: 11,
            humidity: 52,
            pressure: 1020,
            wind: 29,
            precipitation: 7,
        }
   
  );
  
  weatherStorage.add(
    {
    id: 2,
    country: "Georgia",
    city: "Batumi",
    gmt: "UTC +4H",
    weathertype: "Rainy",
    temperature: 16,
    humidity: 87,
    pressure: 1022,
    wind: 34,
    precipitation: 95,
    }
  )
  
  //Remove
  weatherStorage.remove(2);
  
  //Update
  weatherStorage.update(1, {
    temperature: 14,
    humidity: 91,
    precipitation: 97,
  });
  
  //Find all weather info in Tbilisi
//   const currentCity = weatherStorage.find({ city: "Tbilisi" });
  
  //Find a single weather info in Tbilisi
//   const firstCity = weatherStorage.findOne({ city: "Tbilisi" });
  
  //Count the total number of cities in storage
  const totalCities = weatherStorage.count();