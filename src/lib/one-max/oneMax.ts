/**
 * One Max Problem?
 * 
 * What is the maximum sum of a bitstring (1s and 0s) of length N.
 * 
 * Of course it is N, but if you wanted to prove it, you'd need a brute-force search of 2^N time complexity.
 * That is, searching through 2^N different solutions.
 * 
 * 1. Initialize Population
 * 2. Evaluate Population
 * 3. Select Parents
 * 4. Create Children
 * 5. Mutate Children (and go to step 2.)
 * 
 * 
 * Card Example:
 *  - Single card -> CHROMOSOME
 *  - Entire hand -> POPULATION
 *  - Changes you make after every turn -> TRANSFORMATIONS
 *  - Every turn represents one -> GENERATION
 * 
 * GA work via TRANSFORMATIONS on POPULATIONS of CHROMOSOMES over some number of GENERATIONS.
 */

import { findMax, getRandomNumberBetween, shuffleArray, splitArrayIntoTwo, sumItems } from '../helpers/utils'

type Chromosome = Array<number>
type Population = Array<Chromosome>
type ChromosomeTupleArr = Array<[Chromosome, Chromosome]>

function oneMaxAlgorithm(population: Population): Chromosome {
    const best = findMax(population, sumItems)
    const currentResult = sumItems(best)

    if (currentResult === best.length) {
        return best
    } else {
        // evaluate
        const evaluated = evaluate(population, sumItems)

        // selection
        const selected = selection(evaluated)

        // crossover
        const newChildren = crossover(selected)

        // mutate
        const mutatedPopulation = mutate(newChildren)

        // algorithm again
        return oneMaxAlgorithm(mutatedPopulation)
    }
}

/**
 * Evaluate
 * 
 * This function takes a population and evaluates each chromosome based on a fitness function. 
 * Fitness is simply a heuristic that tells you how good or bad a solution is - fitness function calculates this fitness for you.
 * In this problem, the fitness of a chromosome is represented by the sum of the bitstring.
*/
function evaluate(population: Population, fitness: (input: Chromosome) => number): Population {
    return population.sort((a: Chromosome, b: Chromosome) => fitness(b) - fitness(a))
}

/**
 * Selection
 * 
 * Selection is the process of picking the parents that will be combined to create new solutions.
*/
function selection(population: Population): ChromosomeTupleArr {
    return population.reduce((currentPopulation: ChromosomeTupleArr , nextChromosome: Chromosome, index: number) => {
        if (index % 2 === 0) {
            currentPopulation.push([nextChromosome, population[index + 1]])
            return currentPopulation
        } else {
            return currentPopulation
        }
    }, [])
}

/**
 * Crossover
 * 
 * Crossover is analogous to reproduction. 
 * It’s a genetic operator that takes two or more chromosomes and produces two or more child chromosomes.
*/
function crossover(selectedPairs: ChromosomeTupleArr): Population {
    return selectedPairs.reduce((currentPopulation: Population, nextTuple: [Chromosome, Chromosome]) => {
        const [p1, p2] = nextTuple
        const r = getRandomNumberBetween(0, p1.length)

        const [f1, f2] = splitArrayIntoTwo(p1, r)
        const [s1, s2] = splitArrayIntoTwo(p2, r)

        currentPopulation.push([...f1, ...s2])
        currentPopulation.push([...f2, ...s1])
        return currentPopulation
    }, [])
}

/**
 * Mutation
 * 
 * Mutate a small percentage of your population. 
*/
function mutate(population: Population): Population {
    return population.map((chromosome: Chromosome) => {
        // 5% chance of getting mutated
        if (getRandomNumberBetween(0, 100) < 5) {
            return shuffleArray(chromosome)
        } else {
            return chromosome
        }
    })
}


export {
    oneMaxAlgorithm,
    evaluate,
    selection,
    crossover,
    mutate,
}