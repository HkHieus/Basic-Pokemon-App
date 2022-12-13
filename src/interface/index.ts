export interface IPokemon {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    abilities: { ability: { name: string } }[];
}

export interface IPokemons {
  pokemons: IPokemon[];
}

export interface IViewDetail {
    idDetail: number;
    isShowDetail: boolean;
}

