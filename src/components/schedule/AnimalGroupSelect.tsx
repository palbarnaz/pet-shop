'use client'
import { useAppSelector } from "@/globalRedux/hooks";
import { FormControl, FormLabel, Grid, RadioGroup } from "@mui/material";
import { ChangeEvent, useState } from "react";
import CardAnimal from "./CardAnimal";


type AnimalGroupSelectProps = {
  value: string;
  handleChange:  (event: ChangeEvent<HTMLInputElement>, value: string) => void;
}

export default function AnimalGroupSelect({ handleChange,value}: AnimalGroupSelectProps ){
  const {user} = useAppSelector((state)=> state.user)


  return(
    <>
    <FormControl   sx={{width:'100%'}}>
  <RadioGroup
    
    value={value}
    onChange={handleChange}
  >
    <Grid container  spacing={5} justifyContent="center">
    {user.animal.map((item) => <CardAnimal key={item.id} animal={item}  />
          )}
    </Grid>
   
  </RadioGroup>
</FormControl>
    </>
  )
}