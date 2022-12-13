import React, { useEffect, useState } from "react";

import axios from "axios";

import { Grid, Button, Skeleton, Switch } from "@mui/material";
import styled from "@emotion/styled";

import "./App.css";

import { IPokemon, IViewDetail } from "./interface";
import CardPoke from "./components/CardPoke.component";
import { displayPartsToString } from "typescript";

const Header = styled("div")({
  height: 50,
  lineHeight: "50px",
  backgroundColor: "transparent",
  textAlign: "center",
  fontSize: "40px",
  fontWeight: "bold",
  marginBottom: "20px",
  display:'flex' ,
  justifyContent:'space-between' ,
});

const MyButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
});

const App = (): JSX.Element => {
  const [pokemons, setPokeMons] = useState<IPokemon[]>([]);
  const [viewDetail, setViewDetail] = useState<IViewDetail>({
    idDetail: 0,
    isShowDetail: false,
  });
  const [nextUrl, setNextUrl] = useState<String>("");
  const [loading, setLoading] = useState<Boolean>(true);
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  const handleLoadMorePokemon = async () => {
    setLoading(true);
    const data = await axios({
      method: "GET",
      url: `${nextUrl}`,
    });
    setNextUrl(data.data.next);
    const res = await Promise.all(
      data.data.results.map((item: any) => {
        return axios({
          method: "GET",
          url: `https://pokeapi.co/api/v2/pokemon/${item.name}`,
        });
      })
    );
    setPokeMons((prev) => [...prev, ...res.map((item) => item.data)]);
    setLoading(false);
  };

  const handleChangeDarkTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  useEffect(() => {
    const getPokeMon = async () => {
      const data = await axios({
        method: "GET",
        url: "https://pokeapi.co/api/v2/pokemon?limit=15&offset=20",
      });
      setNextUrl(data.data.next);
      const res = await Promise.all(
        data.data.results.map((item: any) => {
          return axios({
            method: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${item.name}`,
          });
        })
      );
      setPokeMons(res.map((item) => item.data));
      setLoading(false);
    };
    getPokeMon();
  }, []);

  return (
    <div
      style={
        darkTheme
          ? {
              padding: "50px",
              backgroundColor: "black",
              color:"white"
            }
          : {
              padding: "50px",
            }
      }
    >
      <Header>
        <span style={{marginLeft:'44%'}}>Pokemon</span>
        <div style={{ fontSize:'20px'}}>
        <Switch
          checked={darkTheme}
          color="info"
          onChange={handleChangeDarkTheme}
        />
        Dark Theme
        </div>
      </Header>
      <Grid
        container
        spacing={2}
        sx={{
          margin: "auto",
          width: "90%",
          minHeight: "70vh",
          height: "auto",
          backgroundColor: ( darkTheme ? '#333' : 'white' ),
          boxShadow: 3,
          borderRadius: "20px",
          overflow: "hidden",
          paddingBottom: "10px",
        }}
      >
        {pokemons?.map((pokemon, index: number) => {
          return (
            <Grid key={index} item lg={2.4}>
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  width={240}
                  height={229}
                  animation={"pulse"}
                />
              ) : (
                <CardPoke
                  pokemon={pokemon}
                  setViewDetail={setViewDetail}
                  viewDetail={viewDetail}
                  darkTheme={darkTheme}
                />
              )}
            </Grid>
          );
        })}
        <Grid
          sx={{
            justifyContent: "center",
            display: "flex",
          }}
          item
          lg={12}
        >
          <MyButton onClick={handleLoadMorePokemon}>
            {loading ? "Loading...." : "Load more"}
          </MyButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
