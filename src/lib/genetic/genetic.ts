import { getRandomNumberBetween } from '../helpers/utils'
import { ToolboxSelection } from '../toolbox/ToolboxSelection'

export type Chromosome = {
    genes: Array<any>,
    size: number
    fitness: number
    age: number
}

export type Population = Array<Chromosome>

export type GeneticConfig<FitnessResult> = {
    populationSize: number,    
    selectionRate?: number,    
    
    genotype: () => Chromosome,

    selectionFunction?: (population: Population, size: number) => [Population, Population],

    fitnessComparator: (a: Chromosome, b: Chromosome) => number,
    fitnessFunction: (a: Chromosome) => FitnessResult,

    mutate: (a: Chromosome) => Chromosome,
    crossover: (a: Chromosome, b: Chromosome) => [Chromosome, Chromosome],
    terminate: (p: Population, generation: number) => boolean,
}

type SelectionType = {
    selectedParents: Array<[Chromosome, Chromosome]>,
    leftovers: Population
}
export class GeneticFrame<FitnessResult> {
    
    private geneticConfig: GeneticConfig<FitnessResult>

    // 1. Initialize
    constructor(geneticConfig: GeneticConfig<FitnessResult>) {
        this.geneticConfig = geneticConfig
    }

    // PUBLIC
    run(): Chromosome {
        const population = this.initialize()
        return this.evolve(population, 0)
    }

    // PRIVATE

    // 1. Initialize
    private initialize(): Population {
        const population = []

        for (let i = 0; i < this.geneticConfig.populationSize; i++) {
            population.push(this.geneticConfig.genotype())
        }

        return population
    }

    // 2. Evaluate
    private evaluate(population: Population): Population {
        return population
            .map(c => Object.assign({}, c, { fitness: this.geneticConfig.fitnessFunction(c), age: c.age + 1 }))
            .sort(this.geneticConfig.fitnessComparator)
    }

    // 3. Selection
    private select(population: Population): SelectionType {
        const populationSize = this.getNewPopulationSize(population)
        const selectFn: (p: Population, n: number) => [Population, Population] = this.geneticConfig.selectionFunction || ToolboxSelection.elite

        const [ parents, leftovers ] = selectFn(population, populationSize)

        const selectedParents = parents.reduce((currentPopulation: Array<[Chromosome, Chromosome]>, nextChromosome: Chromosome, index: number) => {
            if (index % 2 === 0) {
                currentPopulation.push([nextChromosome, population[index + 1]])
                return currentPopulation
            } else {
                return currentPopulation
            }
        }, [])

        return {
            selectedParents,
            leftovers
        }
    }

    // 4. Crossover
    private crossover(selectedPairs: Array<[Chromosome, Chromosome]>): Population {
        return selectedPairs.reduce((currentPopulation: Population, nextTuple: [Chromosome, Chromosome]) => {
            const [p1, p2] = nextTuple
            const [c1, c2] = this.geneticConfig.crossover(p1, p2)
    
            currentPopulation.push(c1)
            currentPopulation.push(c2)

            return currentPopulation
        }, [])
    }

    // 5. Mutation
    private mutate(population: Population): Population {
        return population.map((chromosome: Chromosome) => {
            // 5% chance of getting mutated
            if (getRandomNumberBetween(0, 100) < 5) {
                return this.geneticConfig.mutate(chromosome)
            } else {
                return chromosome
            }
        })
    }

    private evolve(population: Population, generation: number): Chromosome {
        const evaluatedPopulation = this.evaluate(population)

        if (this.geneticConfig.terminate(evaluatedPopulation, generation)) {
            return evaluatedPopulation[0]
        } else {
            // selection
            const { selectedParents, leftovers } = this.select(evaluatedPopulation)

            // crossover
            const newChildren = this.crossover(selectedParents)

            // mutate
            const mutatedPopulation = this.mutate([...newChildren, ...leftovers])

            // algorithm again
            return this.evolve(mutatedPopulation, generation + 1)
        }
    }

    private getNewPopulationSize(population: Population): number {
        const selectRate = this.geneticConfig.selectionRate || 0.8
        const n = Math.round(population.length * selectRate)
        return n % 2 == 0 ? n : n + 1
    }
}


