function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  function createEmployeeRecords(arr) {
    return arr.map(function(emp) {
      return createEmployeeRecord(emp)
    })
  }
  
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ')
  
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    })
  
    return this
  }
  
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ')
  
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    })
  
    return this
  }
  
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(function(event) {
      return event.date === date
    }).hour
  
    const timeOut = this.timeOutEvents.find(function(event) {
      return event.date === date
    }).hour
  
    return (timeOut - timeIn) / 100
  }
  
  function wagesEarnedOnDate(date) {
    const hours = hoursWorkedOnDate.call(this, date)
    const rate = this.payPerHour
    return hours * rate
  }
  
  function allWagesFor() {
    const dates = this.timeInEvents.map(function(event) {
      return event.date
    })
  
    const wages = dates.reduce(function(memo, date) {
      return memo + wagesEarnedOnDate.call(this, date)
    }.bind(this), 0)
  
    return wages
  }
  
  function findEmployeeByFirstName(employees, name) {
    return employees.find(function(emp) {
      return emp.firstName === name
    })
  }
  
  function calculatePayroll(employees) {
    return employees.reduce(function(memo, emp) {
      return memo + allWagesFor.call(emp)
    }, 0)
  }
  