const enum Directions {
	North,
	East,
	West,
	Sount,
}

export const isNorth = (num: number) => (Directions.North === num ? true : false)
