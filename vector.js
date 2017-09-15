var _ = require('lodash');
var Decimal = require('decimal.js');

Decimal.precision=30

class Vector {
  constructor(coordinates = []) {
    this.coordinates = coordinates //.map(e => new Decimal(e))
    this.demension = coordinates.length
  }
  plus(v){
    const newCoordinates = _.zip(this.coordinates, v.coordinates).map(e => e[0]+e[1])
    return (new Vector(newCoordinates))
  }
  minus(v){
    const newCoordinates = _.zip(this.coordinates, v.coordinates).map(e => e[0]-e[1])
    return (new Vector(newCoordinates))
  }

  timesScalar(c){
    const newCoordinates = this.coordinates.map(e => c*e)
    return new Vector(newCoordinates)
  }

  magnitude(){
    const coordinatesSquared = this.coordinates.map(e => e*e)
    return Math.sqrt(_.sum(coordinatesSquared))
  }

  normalized(){
    const magnitude = this.magnitude()
    if(magnitude === 0) { throw new Error('can not normalize the zero vector')}
    return this.timesScalar(1 / magnitude)
  }

  dot(v){
    return _.sum(_.zip(this.coordinates, v.coordinates).map(e => e[0]*e[1]))
  }

  isZero(tolerance = 1e-10){
    return this.magnitude() < tolerance
  }

  static isNear(number, value, eps = 1e-10){
    return Math.abs(number-value) < eps
  }

  angleWith(v, inDegees = false){
    const u1 = this.normalized()
    const u2 = v.normalized()
    //FIXME due to precision issues
    let r = u1.dot(u2)
    if(Vector.isNear(r, 1)){
      r = 1
    }else if(Vector.isNear(r, -1)){
      r = -1
    }
    console.log(r)
    const angleInRadians = Math.acos(r)
    if(inDegees){
      const degreesPerRadian = 1 / Math.pi
      return angleInRadians * degreesPerRadian
    }
    return angleInRadians
  }

  isParallelTo(v){
    return (this.isZero() || v.isZero() || this.angleWith(v) === 0 || this.angleWith(v) === Math.PI)
  }

  isOrthogonalTo(v, tolerance=1e-10){
    return Math.abs(this.dot(v)) < tolerance
  }

  componentParallelTo(basis){
    //TODO:check for zero vector
    const u = basis.normalized()
    const weight = this.dot(u)
    return u.timesScalar(weight)
  }

  componentOrthogonalTo(basis){
    //TODO:check for zero vector
    const projection = this.componentParallelTo(basis)
    return this.minus(projection)
  }

  areaOfTriangleWith(v){
    return this.areaOfPrallelogramWith(v) / 2
  }

  areaOfPrallelogramWith(v){
    const crossProduct = this.cross(v)
    return crossProduct.magnitude()
  }

  cross(v){
    //TODO:check for zero vector
    //Check for 2 demension expand with z=0
    const [x1, y1, z1] = this.coordinates
    const [x2, y2, z2] = v.coordinates
    const newCoordinates = [y1*z2-y2*z1,-(x1*z2-x2*z1),(x1*y2-x2*y1)]
    return new Vector(newCoordinates)
  }

  _eq(v){
    return _.isEqual(this.coordinates, v.coordinates)
  }
  _roundCoordinates(){
    return new Vector(this.coordinates.map(e => _.round(e, 3)))
  }
}

module.exports = Vector