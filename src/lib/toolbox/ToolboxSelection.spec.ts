import test from 'ava'
import { Chromosome } from '../genetic/genetic'
import { ToolboxSelection } from './ToolboxSelection'

function generatePrimitiveChromosome(gene: number): Chromosome {
    return {
        age: 0,
        genes: [gene],
        fitness: 0,
        size: 0
    }
}

test('test ToolboxSelection.elite', (t) => {
    
    const population = Array(6).fill(null).map((_,i) => generatePrimitiveChromosome(i))
    const [ parents, leftovers ] = ToolboxSelection.elite(population, 4)

    t.assert(parents.length === 4)
    t.assert(leftovers.length === 2)
    t.deepEqual(parents, Array(4).fill(null).map((_,i) => generatePrimitiveChromosome(i)))
    t.deepEqual(leftovers, Array(2).fill(null).map((_,i) => generatePrimitiveChromosome(i + 4)))
})

test('test ToolboxSelection.random', (t) => {
    
    const population = Array(6).fill(null).map((_,i) => generatePrimitiveChromosome(i))
    const [ parents, leftovers ] = ToolboxSelection.random(population, 4)

    t.assert(parents.length === 4)
    t.assert(leftovers.length === 2)
})