'use client'
import { useAppSelector } from "@/globalRedux/hooks";
import { FormControl, FormLabel, Grid, RadioGroup } from "@mui/material";
import { ChangeEvent, useState } from "react";
import CardAnimal from "./cardAnimal";
import CardService from "./cardService";


type AnimalGroupSelectProps = {
  value: string;
  handleChange:  (event: ChangeEvent<HTMLInputElement>, value: string) => void;
}

export default function AnimalGroupSelect({ handleChange,value}: AnimalGroupSelectProps ){
  const {user} = useAppSelector((state)=> state.user)


  return(
    <>
    <FormControl>
  <RadioGroup
    
    name="controlled-radio-buttons-group"
    value={value}
    onChange={handleChange}
  >
    <Grid container spacing={'200px'}>
    {user.animal.map((item) => <CardAnimal key={item.id} animal={item}  />
          )}
    </Grid>
   
  </RadioGroup>
</FormControl>
    </>
  )
}