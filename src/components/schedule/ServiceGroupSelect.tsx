'use client'
import { useAppSelector } from "@/globalRedux/hooks";
import { FormControl,  Grid, RadioGroup } from "@mui/material";
import { ChangeEvent, useState } from "react";
import CardService from "./CardService";


type ServiceGroupSelectProps = {
  value: string;
  handleChange:  (event: ChangeEvent<HTMLInputElement>, value: string) => void;
}

export default function ServiceGroupSelect({ handleChange,value}: ServiceGroupSelectProps ){
  const {services} = useAppSelector((state)=> state.service)


  return(
    <>
    <FormControl  sx={{width:'100%'}} >
  <RadioGroup

    value={value}
    onChange={handleChange}
  >
    <Grid container justifyContent={"center"} spacing={4}>
    {services.map((item) => <CardService key={item.id} service={item} />
          )}
    </Grid>
   
  </RadioGroup>
</FormControl>
    </>
  )
}