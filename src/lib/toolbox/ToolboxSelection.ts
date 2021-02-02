import { Population } from "../genetic/genetic"
import { shuffleArray } from "../helpers/utils"
export class ToolboxSelection {
    public static elite(population: Population, size: number): [Population, Population] {
        const selectedParents = population.slice(0, size)
        const leftovers = population.slice(size)
        return [ selectedParents, leftovers]
    }

    public static random(population: Population, size: number): [Population, Population] {
        const shuffledPopulation = shuffleArray(population)
        return ToolboxSelection.elite(shuffledPopulation, size)
    }

    public static tournamentWithDuplicates(population: Population, size: number, tournSize: number): [Population, Population] {
        // TODO: Needs to be implemented
    }

    public static tournamentNoDuplicates(population: Population, size: number, tournSize: number): [Population, Population] {
        // TODO: Needs to be implemented
    }

    public static rouletteWithDuplicates(population: Population, size: number): [Population, Population] {
        // TODO: Needs to be implemented
    }

    public static rouletteNoDuplicates(population: Population, size: number): [Population, Population] {
        // TODO: Needs to be implemented
    }
}