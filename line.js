const Vector = require('./vector.js')
var _ = require('lodash');
class Line {
  constructor(normalVector, constantTerm=0){
    this.dimension = 2
    if(!normalVector){
      normalVector = new Vector([0,0])
    }
    this.normalVector = normalVector
    this.constantTerm = constantTerm
    this.setBasePoint()
  }

  isParallelTo(ell){
    const n1 = this.normalVector
    const n2 = ell.normalVector
    return n1.isParallelTo(n2)
  }

  setBasePoint(){
    //FIXME non zero elements
    const n = this.normalVector
    const c = this.constantTerm
    let baseCoordinates = [0,0]
    const initialIndex = Line.firstNoneZeroIndex(n.coordinates)
    const initialCoefficient = n.coordinates[initialIndex]
    baseCoordinates[initialIndex] = c/initialCoefficient
    this.basePoint = new Vector(baseCoordinates)
  }

  eq(ell){
    // zero normal vector case
    if(this.normalVector.isZero()){
      if(!ell.normalVector.isZero()){
        return false
      }

      const diff = this.constantTerm-ell.constantTerm
      return Line.isNearZero(diff)
    }else if(ell.normalVector.isZero()){
      return false
    }
    
    if(!this.isParallelTo(ell)){
      return false
    }
    const p0 = this.basePoint
    const p1 = ell.basePoint
    const basePointDifference = p0.minus(p1)
    const n = this.normalVector
    return basePointDifference.isOrthogonalTo(n)
  }

  intersectionWith(ell){
    //FIXME:Handle with the case A*D-B*C == 0
    const [A,B] = this.normalVector.coordinates
    const [C,D] = ell.normalVector.coordinates
    const k1 = this.constantTerm
    const k2 = ell.constantTerm
    const xNumerator = D*k1 - B*k2
    const yNumerator = -C*k1 + A*k2
    const oneOverDenom = 1 / A*D - B*C
    return (new Vector([xNumerator, yNumerator])).timesScalar(oneOverDenom)
  }



  static firstNoneZeroIndex(n){
    return _.findIndex(n, e => !this.isNearZero(e))
  }

  static isNearZero(value, eps = 1e-10){
    return Math.abs(value) < eps
  }

}
module.exports = Line