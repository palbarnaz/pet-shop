'use client'
import { Animal } from "@/types/Animal";
import { Box, Card, CardContent, Chip, FormControlLabel, Grid, Radio, Typography } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';


interface CardAnimalProps {
    animal: Animal;



}

export default function CardAnimal({ animal }: CardAnimalProps) {

    const renderCard = () => {
        return (
            <>
               
                <Card  sx={{minHeight: '150px', minWidth:'150px' ,padding: '10px' }}>

                    <CardContent  sx={{ padding: '0px', paddingBottom: '0px !important' }}>
                        <Box display={"flex"} justifyContent={'flex-start'} alignItems={'center'} flexDirection={'column'}>
                            <PetsIcon/>
                            <Typography gutterBottom textAlign={"center"} variant="h6" component="div">
                             {animal.name}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div">
                              
                            <Chip sx={{backgroundColor:'#4de4c1'}} size="medium" label={animal.specie}/>

                            </Typography>

                            
                        </Box>



                    </CardContent>

                </Card>
            </>

        )
    }

    return (
        <>

            <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel value={animal?.id} label={renderCard()} labelPlacement="bottom" control={<Radio/>} />
            </Grid>
        </>

    )
}