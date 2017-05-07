'use strict';

function Robot() {
  // implement your solution here!
  this.bearings = ['north', 'east', 'south', 'west']
  this.x = 0
  this.y = 0
}

Robot.prototype.orient = function(bearing) {
  if( this.bearings.includes(bearing) ) {
    this.bearing = bearing
    this.bearingNo = this.bearings.findIndex( e => e === bearing )
  } else {
    throw new Error('Invalid Robot Bearing')
  }
}

Robot.prototype.turnRight = function() {
  this.bearingNo += 1
  this.bearing = this.bearings[ this.bearingNo % 4 ]
}

Robot.prototype.turnLeft = function() {
  this.bearingNo -= 1
  if(this.bearingNo < 0) {
    this.bearingNo += 4
  }
  this.bearing = this.bearings[ this.bearingNo % 4 ]
}

Robot.prototype.at = function(x,y) {
  this.x = x
  this.y = y
  this.coordinates = [this.x, this.y]
}

Robot.prototype.advance = function() {
  switch (this.bearing) {
    case 'north':
      this.y += 1
      break
    case 'east':
      this.x += 1
      break
    case 'south':
      this.y -= 1
      break
    case 'west':
      this.x -= 1
      break
  }
  this.coordinates = [this.x, this.y]
}

Robot.prototype.instructions = function(string) {
  var instructions = string.split('').map((letter, i, string) => {
    switch (letter) {
      case 'L':
        return 'turnLeft'
        break
      case 'R':
        return 'turnRight'
        break
      case 'A':
        return 'advance'
        break
    }
  })
  return instructions
}

Robot.prototype.place = function(placement) {
  this.at(placement.x, placement.y)
  this.orient(placement.direction)
}

Robot.prototype.evaluate = function(instrs) {
  var instructs = this.instructions( instrs )
  for( var i = 0; i < instructs.length; i++ ) {
    console.log( instructs[i] )
    this[ instructs[i] ]()
  }
}
