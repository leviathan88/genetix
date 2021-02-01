import test from 'ava'
import { findMax, getRandomLowerChar, getRandomNumberBetween, shuffleArray, splitArrayIntoTwo, sumItems } from './utils';


test('test getRandomNumberBetween', (t) => {
    const r1 = getRandomNumberBetween(0, 10)
    const r2 = getRandomNumberBetween(0, 10)
    const r3 = getRandomNumberBetween(0, 10)
    t.assert(r1 >= 0 && r1 <= 10)
    t.assert(r2 >= 0 && r2 <= 10)
    t.assert(r3 >= 0 && r3 <= 10)
})

test('test getRandomLowerChar', (t) => {
    const c1 = getRandomLowerChar()
    const c2 = getRandomLowerChar()
    const c3 = getRandomLowerChar()
    t.assert(c1 >= 'a' && c1 <= 'z')
    t.assert(c2 >= 'a' && c2 <= 'z')
    t.assert(c3 >= 'a' && c3 <= 'z')
})

test('test splitArrayIntoTwo', (t) => {
    const r = splitArrayIntoTwo([1,2,3,4,5,6], 2)
    t.deepEqual(r, [[1,2], [3,4,5,6]])
})

test('test sumItems', (t) => {
    const r = sumItems([1,2,3,5])
    t.deepEqual(r, 11)
})

test('test findMax', (t) => {
    const r = findMax([[1,1,1,1],[1,1,0,0], [1,0,0,0], [0,0,0,0]], sumItems)
    t.deepEqual(r, [1,1,1,1])
})

test('test shuffleArray', (t) => {
    const r = shuffleArray([1,2,3,4])
    t.assert(r.length === 4)
    t.assert(r.includes(2))
    t.assert(r.includes(4))
})