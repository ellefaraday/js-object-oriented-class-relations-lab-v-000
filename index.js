let store = {drivers: [], passengers: [], trips: []};
let driverId = 0;
let passengerId = 0;
let tripId = 0;

class Driver {
  constructor(name) {
    this.name = name;
    this.id = ++driverId;
    store.drivers.push(this);
  }

  trips() {
    return store.trips.filter(
      function (trip) {
        return trip.driverId === this.id
      }.bind(this))
  }

  passengers(){
    return this.trips().map(
      function (trip){
        return trip.passenger();
      }.bind(this)
    )
  }
}

class Passenger {
  constructor(name) {
    this.name = name;
    this.id = ++passengerId;
    store.passengers.push(this)
  }

  trips(){
    return store.trips.filter(
      function (trip){
        return trip.passengerId === this.id
      }.bind(this)
    )
  }

  drivers(){
    return this.trips().map(
      function (trip){
        return trip.driver();
      })
  }

}

class Trip {
  constructor(driver, passenger){
    this.id = ++tripId;
    store.trips.push(this)
    this.driverId = driver.id
    this.passengerId = passenger.id
  }

  passenger() {
   return store.passengers.find(
     function (passenger) {
       return this.passengerId === passenger.id
   }.bind(this))
  }

  driver() {
   return store.drivers.find(
     function (driver) {
       return this.driverId === driver.id
   }.bind(this))
  }
}
