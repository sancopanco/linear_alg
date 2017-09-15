'use strict';

var expect = require('chai').expect
var _ = require('lodash')
const Vector = require('../vector')
const Line = require('../line')
const Plane = require('../plane')

describe('Vector', function() {
  describe('.plus', function(){
    it('should calc vector addition', function() {
      const v = new Vector([1,0])
      const w = new Vector([0, 1])
      // w = Vector(['-8.802', '6.776'])
      // v = Vector(['7.887', '4.138'])
      const result = v.plus(w)
      expect(result._eq(new Vector([1,1]))).to.eq(true)

    });
  })

  describe('.minus', function(){
    it('should calc vector subtract', function() {
      const v = new Vector([1,0])
      const w = new Vector([0, 1])
      const result = v.minus(w)
      expect(result._eq(new Vector([1,-1]))).to.eq(true)
    });
  })

  describe('.timesScalar', function(){
    it('should calc vector scalar', function() {
      const v = new Vector([1,0])
      const result = v.timesScalar(0)
      expect(result._eq(new Vector([0,0]))).to.eq(true)
    });
  })

  describe('.magnitude', function(){
    it('should calc vector magnitude', function() {
      const v1 = new Vector([1,0])
      const v2 = new Vector([-0.211, 7.437])
      const result1 = v1.magnitude()
      const result2 = v2.magnitude()
      expect(result1).to.eq(1)
      expect(_.round(result2,3)).to.eq(7.440)
    });
  })

  describe('.normalized', function(){
    it('should calc normalized vector', function(){
      const v1 = new Vector([5.581, -2.136])
      const result = v1.normalized()._roundCoordinates()
      expect(result._eq(new Vector([0.934,-0.357]))).to.eq(true)
    })
  })

  describe('.dot', function(){
    it('should calc dot product', function(){
      const v1 = new Vector([7.887, 4.138])
      const v2 = new Vector([-8.802, 6.776])
      const result = v1.dot(v2)
      expect(_.round(result, 3)).to.eq(-41.382)
    })
  })

  describe('.angleWith', function(){
    it('should calc angle with vectors', function(){
      const v1 = new Vector([3.183, -7.627])
      const v2 = new Vector([-2.668, 5.319])
      const result = v1.angleWith(v2)
      expect(_.round(result, 3)).to.eq(3.072)
    })
  })

  describe('.isParallelTo', function(){
    it('should check for parallism', function(){
      const v1 = new Vector([-7.579, -7.88])
      const v2 = new Vector([22.737, 23.64])
      expect(v1.isParallelTo(v2)).to.eq(true)
    })
  })

  describe('.isOrthogonalTo', function(){
    it('should check for not orthogonality', function(){
      const v1 = new Vector([-7.579, -7.88])
      const v2 = new Vector([22.737, 23.64])
      expect(v1.isOrthogonalTo(v2)).to.eq(false)
    })
    it('should check for orthogonality', function(){
      const v1 = new Vector([-2.328, -7.284, -1.214])
      const v2 = new Vector([-1.821, 1.072, -2.94])
      expect(v1.isOrthogonalTo(v2)).to.eq(true)
    })
  })

  describe('.componentParallelTo', function(){
    it('should check for parallel component', function(){
      const v1 = new Vector([3.039, 1.879])
      const b = new Vector([0.825, 2.036])
      const result = v1.componentParallelTo(b)._roundCoordinates()
      expect(result._eq(new Vector([1.083, 2.672]))).to.eq(true)
    })
  })

  describe('.componentOrthogonalTo', function(){
    it('should check for orthogonal component', function(){
      const v1 = new Vector([-9.88, -3.264, -8.159])
      const b = new Vector([-2.155, -9.353, -9.473])
      const result = v1.componentOrthogonalTo(b)._roundCoordinates()
      expect(result._eq(new Vector([-8.350, 3.376, -1.434]))).to.eq(true)
    })
  })

  describe('.cross', function(){
    it('should calc cross product of two vectors', function(){
      const v1 = new Vector([8.462, 7.893, -8.187])
      const v2 = new Vector([6.984, -5.975, 4.778])
      const result = v1.cross(v2)._roundCoordinates()
      expect(result._eq(new Vector([-11.205, -97.609, -105.685]))).to.eq(true)
    })
  })

  describe('.areaOfPrallelogramWith', function(){
    it('should calc area of parallelogram spaned by two vector', function(){
      const v1 = new Vector([-8.987, -9.838, 5.031])
      const v2 = new Vector([-4.268, -1.861, -8.866])
      const result = v1.areaOfPrallelogramWith(v2)
      expect(_.round(result, 3)).to.eq(142.122)
    })
  })
});

describe('Line', function(){
  describe('isParallelTo', function(){
    it('should check for equality of the lines',function(){
      const n1 = new Vector([4.046, 2.836])
      const n2 = new Vector([10.115, 7.09])
      const c1 = 1.21
      const c2 = 3.025
      const l1 = new Line(n1, c1)
      const l2 = new Line(n2, c2)
      expect(l1.eq(l2)).to.eq(true)
    })

    it('should check for parallism of the lines which are not the same',function(){
      const n1 = new Vector([1.182, 5.562])
      const n2 = new Vector([1.773, 8.343])
      const c1 = 6.744
      const c2 = 9.525
      const l1 = new Line(n1, c1)
      const l2 = new Line(n2, c2)
      expect(l1.isParallelTo(l2)).to.eq(true)
      expect(l1.eq(l2)).to.eq(false)
    })

  })

  describe('intersectionWith', function(){
    it('should find intersection of 2 lines', function(){
      const n1 = new Vector([7.204, 3.182])
      const n2 = new Vector([8.172, 4.114])
      const c1 = 8.68
      const c2 = 9.883
      const l1 = new Line(n1, c1)
      const l2 = new Line(n2, c2)
      const result = l1.intersectionWith(l2)
      expect(result._eq(new Vector([1.173, 0.073]))).to.eq(false)
    })
  })
})

describe('Plane', function(){
  describe('eq', function(){
    it('should identify eqaul planes', function(){
      const n1 = new Vector([-0.412, 3.806,0.728])
      const n2 = new Vector([1.03,-9.515,-1.82])
      const c1 = -3.46
      const c2 = 8.65
      const l1 = new Plane(n1, c1)
      const l2 = new Plane(n2, c2)
      expect(l1.eq(l2)).to.eq(true)
    })
  })  
})
