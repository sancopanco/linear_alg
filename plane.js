const Vector = require('./vector.js')
var _ = require('lodash');

class Plane {
  constructor(normalVector, constantTerm=0){
    this.dimension = 3
    if(!normalVector){
      normalVector = new Vector([0,0,0])
    }
    this.normalVector = normalVector
    this.constantTerm = constantTerm
    this.setBasePoint()
  }

  isParallelTo(p){
    const n1 = this.normalVector
    const n2 = p.normalVector
    return n1.isParallelTo(n2)
  }

  setBasePoint(){
    //FIXME non zero elements
    const n = this.normalVector
    const c = this.constantTerm
    let baseCoordinates = [0,0,0]
    const initialIndex = Plane.firstNoneZeroIndex(n.coordinates)
    const initialCoefficient = n.coordinates[initialIndex]
    baseCoordinates[initialIndex] = c/initialCoefficient
    this.basePoint = new Vector(baseCoordinates)
  }

  eq(p){
    // zero normal vector case
    if(this.normalVector.isZero()){
      if(!ell.normalVector.isZero()){
        return false
      }

      const diff = this.constantTerm-p.constantTerm
      return Plane.isNearZero(diff)
    }else if(p.normalVector.isZero()){
      return false
    }
    
    if(!this.isParallelTo(p)){
      return false
    }
    const p0 = this.basePoint
    const p1 = p.basePoint
    const basePointDifference = p0.minus(p1)
    const n = this.normalVector
    return basePointDifference.isOrthogonalTo(n)
  }

  intersectionWith(p){
  }

  static firstNoneZeroIndex(n){
    return _.findIndex(n, e => !this.isNearZero(e))
  }

  static isNearZero(value, eps = 1e-10){
    return Math.abs(value) < eps
  }

}
module.exports = Plane