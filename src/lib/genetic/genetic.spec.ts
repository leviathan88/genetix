import test from 'ava'

import { getRandomNumberBetween, shuffleArray, splitArrayIntoTwo, sumItems } from '../helpers/utils'
import { GeneticFrame, GeneticConfig, Chromosome } from './genetic'

test('test OneMax Problem with Genetic Frame', (t) => {
    const GENES_SIZE = 42
    const POPULATION_SIZE = 100

    const config: GeneticConfig<number> = {
        populationSize: POPULATION_SIZE,
        
        genotype: () => {
            const genes = Array(GENES_SIZE).fill([]).map(_ => getRandomNumberBetween(0,1))
            return {
                age: 0,
                genes,
                fitness: 0,
                size: GENES_SIZE
            }
        },

        fitnessComparator: (a: Chromosome, b: Chromosome) => b.fitness - a.fitness,
        fitnessFunction: (a: Chromosome) => sumItems(a.genes),

        crossover: (a: Chromosome, b: Chromosome) => {
            const r = getRandomNumberBetween(0, a.genes.length)

            const [f1, f2] = splitArrayIntoTwo(a.genes, r)
            const [s1, s2] = splitArrayIntoTwo(b.genes, r)

            const aGenes = [...f1, ...s2]
            const bGenes = [...f2, ...s1]

            return [
                Object.assign({}, a, { genes: aGenes}),
                Object.assign({}, b, { genes: bGenes})
            ]
        },

        mutate: (a: Chromosome) => Object.assign({}, a, { genes: shuffleArray(a.genes)}),

        terminate: (population: Array<Chromosome>, _generation: number) => {
            const bestChromosome = population[0]
            const bestResult = config.fitnessFunction(bestChromosome)
            return bestResult === GENES_SIZE
        }
    }

    const gf = new GeneticFrame<number>(config)
    const result = gf.run()
    
    t.assert(result.age >= 0)
    t.assert(result.genes.length === GENES_SIZE)
    t.assert(result.fitness === GENES_SIZE)
    t.deepEqual(result.genes, Array(GENES_SIZE).fill(1))
})

// test('test Spelling Problem with Genetic Frame', (t) => {
//     const TARGET_WORD = "supercalifragilisticexpialidocious"
//     const GENES_SIZE = TARGET_WORD.length
//     const POPULATION_SIZE = 100000

//     const config: GeneticConfig<number> = {
//         populationSize: POPULATION_SIZE,
        
//         genotype: () => {
//             const genes = Array(GENES_SIZE).fill([]).map(_ => getRandomLowerChar())
//             return {
//                 age: 0,
//                 genes,
//                 fitness: 0,
//                 size: GENES_SIZE
//             }
//         },

//         fitnessComparator: (a: Chromosome, b: Chromosome) => b.fitness - a.fitness,
//         fitnessFunction: (a: Chromosome) => compareStrings(a.genes.join(''), TARGET_WORD),

//         crossover: (a: Chromosome, b: Chromosome) => {
//             const r = getRandomNumberBetween(0, a.genes.length)

//             const [f1, f2] = splitArrayIntoTwo(a.genes, r)
//             const [s1, s2] = splitArrayIntoTwo(b.genes, r)

//             const aGenes = [...f1, ...s2]
//             const bGenes = [...f2, ...s1]

//             return [
//                 Object.assign({}, a, { genes: aGenes}),
//                 Object.assign({}, b, { genes: bGenes})
//             ]
//         },

//         mutate: (a: Chromosome) => {
//             return Object.assign({}, a, { genes: shuffleArray(a.genes) })
//         },

//         terminate: (population: Array<Chromosome>) => {
//             const bestChromosome = population[0]
//             const bestResult = config.fitnessFunction(bestChromosome)
//             console.log(`current best result is ${bestResult}`)
//             return bestResult === 1
//         }
//     }

//     const gf = new GeneticFrame<number>(config)
//     const result = gf.run()
    
//     t.assert(result.age >= 0)
//     t.assert(result.genes.length === GENES_SIZE)
//     t.assert(result.fitness === GENES_SIZE)
//     t.deepEqual(result.genes, Array(GENES_SIZE).fill(1))
// })