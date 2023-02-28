var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var WeekDays;
(function (WeekDays) {
    WeekDays["Monday"] = "Monday";
    WeekDays["Tuesday"] = "Tuesday";
    WeekDays["Wednesday"] = "Wednesday";
    WeekDays["Thursday"] = "Thursday";
    WeekDays["Friday"] = "Friday";
    WeekDays["Saturday"] = "Saturday";
    WeekDays["Sunday"] = "Sunday";
})(WeekDays || (WeekDays = {}));
var WeatherTerms;
(function (WeatherTerms) {
    WeatherTerms["Sunny"] = "Sunny";
    WeatherTerms["Cloudy"] = "Cloudy";
    WeatherTerms["PartlyCloudy"] = "Partly Cloudy";
    WeatherTerms["Rainy"] = "Rainy";
    WeatherTerms["Snowy"] = "Snowy";
    WeatherTerms["Foggy"] = "Foggy";
    WeatherTerms["Windy"] = "Windy";
    WeatherTerms["Thunderstorm"] = "Thunderstorm";
})(WeatherTerms || (WeatherTerms = {}));
var VirtualStorage = /** @class */ (function () {
    function VirtualStorage() {
        this.items = [];
    }
    VirtualStorage.prototype.add = function (item) {
        this.items.push(item);
    };
    VirtualStorage.prototype.remove = function (id) {
        var index = this.items.findIndex(function (item) { return item.id === id; });
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    };
    VirtualStorage.prototype.update = function (id, updates) {
        //Partial - ??
        var index = this.items.findIndex(function (item) { return item.id === id; });
        if (index !== -1) {
            this.items[index] = __assign(__assign({}, this.items[index]), updates);
        }
    };
    VirtualStorage.prototype.find = function (query) {
        return this.items.filter(function (item) {
            for (var key in query) {
                if (item[key] !== query[key]) {
                    return false;
                }
                return true;
            }
        });
    };
    VirtualStorage.prototype.findOne = function (query) {
        return this.items.find(function (item) {
            for (var key in query) {
                if (item[key] !== query[key]) {
                    return false;
                }
            }
            return true;
        });
    };
    VirtualStorage.prototype.count = function () {
        return this.items.length;
    };
    VirtualStorage.prototype.sumOfBodyLengths = function () {
        return this.items.reduce(function (sum, item) { return sum + item.temperature; }, 0);
    };
    return VirtualStorage;
}());
//Add
var weatherStorage = new VirtualStorage();
weatherStorage.add({
    id: 1,
    country: "Georgia",
    city: "Tbilisi",
    gmt: "UTC +4H",
    weathertype: "Cloudy",
    temperature: 11,
    humidity: 52,
    pressure: 1020,
    wind: 29,
    precipitation: 7
});
weatherStorage.add({
    id: 2,
    country: "Georgia",
    city: "Batumi",
    gmt: "UTC +4H",
    weathertype: "Rainy",
    temperature: 16,
    humidity: 87,
    pressure: 1022,
    wind: 34,
    precipitation: 95
});
//Remove
weatherStorage.remove(2);
//Update
weatherStorage.update(1, {
    temperature: 14,
    humidity: 91,
    precipitation: 97
});
//Find all weather info in Tbilisi
//   const currentCity = weatherStorage.find({ city: "Tbilisi" });
//Find a single weather info in Tbilisi
//   const firstCity = weatherStorage.findOne({ city: "Tbilisi" });
//Count the total number of cities in storage
var totalCities = weatherStorage.count();
