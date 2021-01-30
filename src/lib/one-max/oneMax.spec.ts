import test from 'ava'

import { getRandomNumberBetween, sumItems } from '../helpers/utils'
import { crossover, evaluate, selection, mutate, oneMaxAlgorithm } from './oneMax'

test('test evaluate', (t) => {
    const temp = [[0,0,0,0], [1,0,0,1], [1,1,1,1], [1,0,0,0]]
    const evaluated = evaluate(temp, sumItems)
    t.deepEqual(evaluated, [[1,1,1,1], [1,0,0,1], [1,0,0,0], [0,0,0,0]])
})

test('test selection', (t) => {
    const temp = [[0,0,0,0], [1,0,0,1], [1,1,1,1], [1,0,0,0]]
    const selected = selection(temp)
    t.deepEqual(selected, [[[0,0,0,0], [1,0,0,1]], [[1,1,1,1], [1,0,0,0]]])
})

test('test crossover', (t) => {
    const temp: Array<[Array<number>, Array<number>]> = [[[0,0,0,0], [1,0,0,1]], [[1,1,1,1], [1,0,0,0]]]
    const crossedOver = crossover(temp)
    
    t.assert(crossedOver.length === 4)
    t.assert(crossedOver[0].length === 4)
})

test('test mutate', (t) => {
    const arr = [[0,0,0,0], [1,0,0,1], [1,1,1,1], [1,0,0,0]]
    const mutated = mutate(arr)

    t.assert(mutated.length === 4)
    t.assert(mutated[0].length === 4)
})

test('test one max', (t) => {
    const population = Array(50).fill([]).map(_ => Array(42).fill([]).map(_ => getRandomNumberBetween(0,1)))
    const solution = oneMaxAlgorithm(population)
    t.deepEqual(solution, Array(42).fill(1))
})