import { getRandomNumberBetween } from '../helpers/utils'

type Population<Chromosome> = Array<Chromosome>

export type GeneticConfig<Chromosome, FitnessResult> = {
    populationSize: number,
    maxFitness: FitnessResult,

    genotype: () => Chromosome,
    fitnessComparator: (a: Chromosome, b: Chromosome) => number,
    fitnessFunction: (a: Chromosome) => FitnessResult,
}

type ChromosomeAbilities<Chromosome> = {
    crossover: (other: Chromosome) => [Chromosome, Chromosome],
    mutate: () => Chromosome
}

class GeneticFrame<Chromosome extends ChromosomeAbilities<Chromosome>, FitnessResult> {
    
    private geneticConfig: GeneticConfig<Chromosome, FitnessResult>

    // 1. Initialize
    constructor(geneticConfig: GeneticConfig<Chromosome, FitnessResult>) {
        this.geneticConfig = geneticConfig
    }

    // PUBLIC
    run(): Chromosome {
        const population = this.initialize()
        return this.evolve(population)
    }

    // PUBLIC

    // 1. Initialize
    private initialize(): Population<Chromosome> {
        const population = []

        for (let i = 0; i < this.geneticConfig.populationSize; i++) {
            population.push(this.geneticConfig.genotype())
        }

        return population
    }

    private evolve(population: Population<Chromosome>): Chromosome {
        
        const evaluatedPopulation = this.evaluate(population)
        const bestChromosome = evaluatedPopulation[0]
        const bestResult = this.geneticConfig.fitnessFunction(bestChromosome)

        if (this.geneticConfig.maxFitness === bestResult) {
            return bestChromosome
        } else {
            // selection
            const selected = this.select(evaluatedPopulation)

            // crossover
            const newChildren = this.crossover(selected)

            // mutate
            const mutatedPopulation = this.mutate(newChildren)

            // algorithm again
            return this.evolve(mutatedPopulation)
        }
    }

    // 2. Evaluate
    private evaluate(population: Population<Chromosome>): Population<Chromosome> {
        return population.sort(this.geneticConfig.fitnessComparator)
    }

    // 3. Selection
    private select(population: Population<Chromosome>): Array<[Chromosome, Chromosome]> {
        return population.reduce((currentPopulation: Array<[Chromosome, Chromosome]>, nextChromosome: Chromosome, index: number) => {
            if (index % 2 === 0) {
                currentPopulation.push([nextChromosome, population[index + 1]])
                return currentPopulation
            } else {
                return currentPopulation
            }
        }, [])
    }

    // 4. Crossover
    private crossover(selectedPairs: Array<[Chromosome, Chromosome]>): Population<Chromosome> {
        return selectedPairs.reduce((currentPopulation: Population<Chromosome>, nextTuple: [Chromosome, Chromosome]) => {
            const [p1, p2] = nextTuple
            const [c1, c2] = p1.crossover(p2)
    
            currentPopulation.push(c1)
            currentPopulation.push(c2)

            return currentPopulation
        }, [])
    }

    // 5. Mutation
    private mutate(population: Population<Chromosome>): Population<Chromosome> {
        return population.map((chromosome: Chromosome) => {
            // 5% chance of getting mutated
            if (getRandomNumberBetween(0, 100) < 5) {
                return chromosome.mutate()
            } else {
                return chromosome
            }
        })
    }
}

export default GeneticFrame
