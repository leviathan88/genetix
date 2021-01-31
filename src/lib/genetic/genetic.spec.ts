import test from 'ava'

import { getRandomNumberBetween, shuffleArray, splitArrayIntoTwo, sumItems } from '../helpers/utils'
import GeneticFrame, { GeneticConfig } from './genetic'

test('test OneMax Problem with Genetic Frame', (t) => {
    type Chromosome = Array<number>
    const MAX_FITNESS = 42
    const POPULATION_SIZE = 100

    const config: GeneticConfig<Chromosome, number> = {
        populationSize: POPULATION_SIZE,
        
        genotype: () => Array(MAX_FITNESS).fill([]).map(_ => getRandomNumberBetween(0,1)),

        fitnessComparator: (a: Chromosome, b: Chromosome) => sumItems(b) - sumItems(a),
        
        fitnessFunction: (a: Chromosome) => sumItems(a),

        crossover: (a: Chromosome, b: Chromosome) => {
            const r = getRandomNumberBetween(0, a.length)

            const [f1, f2] = splitArrayIntoTwo(a, r)
            const [s1, s2] = splitArrayIntoTwo(b, r)


            return [
                [...f1, ...s2],
                [...f2, ...s1]
            ]
        },

        mutate: (a: Chromosome) => shuffleArray(a),

        terminate: (population: Array<Chromosome>) => {
            const bestChromosome = population[0]
            const bestResult = config.fitnessFunction(bestChromosome)
            return bestResult === MAX_FITNESS
        }
    }

    const gf = new GeneticFrame<Chromosome, number>(config)
    const result = gf.run()
    
    t.deepEqual(result, Array(42).fill(1))
})