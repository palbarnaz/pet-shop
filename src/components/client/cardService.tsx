'use client'
import { Service } from "@/types/Service";
import { Box, Card, CardContent, Chip, FormControlLabel, Grid, Radio, Typography } from "@mui/material";


interface CardServicesProps {
    service: Service;



}

export default function CardService({ service }: CardServicesProps) {
const valueFormatted = new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(service.price)

    const renderCard = () => {
        return (
            <>
               
                <Card  sx={{ minHeight: '150px', padding: '10px' }}>

                    <CardContent  sx={{ padding: '0px', paddingBottom: '0px !important' }}>
                        <Box display={"flex"} justifyContent={'flex-start'} alignItems={'center'} flexDirection={'column'}>
                            <Typography gutterBottom textAlign={"center"} variant="h6" component="div">
                                {service.description}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="div">
                                Duração em torno de {service.duration} hora.
                            </Typography>
                            <Chip size="medium" label={valueFormatted}/>

                            
                        </Box>



                    </CardContent>

                </Card>
            </>

        )
    }

    return (
        <>

            <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel value={service?.id} label={renderCard()} labelPlacement="bottom" control={<Radio/>} />
            </Grid>
        </>

    )
}