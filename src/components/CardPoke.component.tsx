import React, { useState } from "react";

import { IPokemon, IViewDetail } from "../interface";
import {
  CardActionArea,
  Card,
  CardMedia,
  Typography,
  Dialog,
} from "@mui/material";

interface PokemonProps {
  pokemon: IPokemon;
  setViewDetail: React.Dispatch<React.SetStateAction<IViewDetail>>;
  viewDetail: IViewDetail;
  darkTheme : boolean ;
}

export default function CardPoke({
  pokemon,
  setViewDetail,
  viewDetail,
  darkTheme ,
}: PokemonProps) {
  const handleShowDetail = (pokemonId: number) => {
    if (!viewDetail.isShowDetail) {
      setViewDetail({
        idDetail: pokemonId,
        isShowDetail: true,
      });
    }
    console.log(pokemon.abilities);
  };

  const handleCloseDetailPokemon = () => {
    setViewDetail({ idDetail: 0, isShowDetail: false });
  };

  return (
    <div>
      {viewDetail.idDetail == pokemon.id ? (
        <Dialog
          open={viewDetail.isShowDetail}
          onClose={handleCloseDetailPokemon}
        >
          <Card
            sx={{
              backgroundColor: "burlywood",
              width: "300px",
              height: "300px",
              color : ( darkTheme ? 'white' : 'black' ),
            }}
          >
            <CardActionArea sx={{height:'100%'}} onClick={() => handleShowDetail(pokemon.id)}>
              <Typography
                component={"div"}
                sx={{
                  textAlign: "center",
                  marginTop: "5px",
                  fontWeight: "bold",
                }}
              >
                {pokemon.name.toUpperCase()}
              </Typography>
              <CardMedia
                component={"img"}
                height={200}
                image={pokemon.sprites.front_default}
              />
              <Typography
                component={"div"}
                sx={{
                  textAlign: "center",
                  marginTop: "5px",
                  fontWeight: "bold",
                }}
              >
                Skill
              </Typography>
              <p style={{
                textAlign:'center' ,
                fontWeight:'bold' ,
                marginBottom:'10px'
              }}>
              {pokemon.abilities.map((data) => data.ability.name).join(",")}
              </p>
            </CardActionArea>
          </Card>
        </Dialog>
      ) : (
        <Card
          sx={{
            backgroundColor: "burlywood",
            color : ( darkTheme ? 'white' : 'black' ),
          }}
        >
          <CardActionArea onClick={() => handleShowDetail(pokemon.id)}>
            <Typography
              component={"div"}
              sx={{ textAlign: "center", marginTop: "5px", fontWeight: "bold" }}
            >
              {pokemon.name.toUpperCase()}
            </Typography>
            <CardMedia
              component={"img"}
              height={200}
              image={pokemon.sprites.front_default}
            />
          </CardActionArea>
        </Card>
      )}
    </div>
  );
}
