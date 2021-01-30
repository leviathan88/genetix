import test from 'ava'

import { getRandomNumberBetween, shuffleArray, splitArrayIntoTwo, sumItems } from '../helpers/utils'
import GeneticFrame, { GeneticConfig } from './genetic'

declare global {
    interface Array<T> {
        crossover: (other: Array<T>) => [Array<T>, Array<T>]
        mutate: () => Array<T>
    }
}

Array.prototype.mutate = function () {    
    return shuffleArray(this)
}

Array.prototype.crossover = function (other: Array<number>) {    
    const r = getRandomNumberBetween(0, this.length)

    const [f1, f2] = splitArrayIntoTwo(this, r)
    const [s1, s2] = splitArrayIntoTwo(other, r)


    return [
        [...f1, ...s2],
        [...f2, ...s1]
    ]
}

test('test OneMax Problem with Genetic Frame', (t) => {
    type Chromosome = Array<number>
    const MAX_FITNESS = 42
    const POPULATION_SIZE = 100

    const config: GeneticConfig<Chromosome, number> = {
        populationSize: POPULATION_SIZE,
        maxFitness: MAX_FITNESS,
        
        genotype: () => Array(MAX_FITNESS).fill([]).map(_ => getRandomNumberBetween(0,1)),        
        fitnessComparator: (a: Chromosome, b: Chromosome) => sumItems(b) - sumItems(a),
        fitnessFunction: (a: Chromosome) => sumItems(a),
    }

    const gf = new GeneticFrame<Chromosome, number>(config)
    const result = gf.run()
    
    t.deepEqual(result, Array(42).fill(1))
})