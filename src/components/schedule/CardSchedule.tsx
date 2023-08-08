import { Animal } from "@/types/Animal";
import { Service } from "@/types/Service";
import { formatCurrency } from "@/utils/formatCurrency";
import { PetsOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";

type CardScheduleProps = {
  animal: Animal;
  service: Service;
  dataHour: any;
}


export default function CardSchedule({animal, service, dataHour}: CardScheduleProps) {
  return (
    <>

      <Grid display={'flex'} justifyContent={'center'}  item xs={12} sm={6} md={3}>
        <Card  sx={{minHeight: '150px' ,padding: '10px', width:'100%' }} >

          <CardContent sx={{ padding: '0px', paddingBottom: '0px !important' }}>
            <Box display={"flex"} justifyContent={'flex-start'} alignItems={'center'} flexDirection={'column'}>
              <Typography gutterBottom textAlign={"center"} variant="h6" component="div">
                {service.description}
              </Typography>
              <Box display="flex" justifyContent="center" flexWrap="wrap" alignItems="center" gap={0.7}>
              <PetsOutlined/>
              <Typography textAlign={'center'} margin={'0'} gutterBottom variant="h6" component="div">
                {animal.name}
              </Typography>
              
          </Box>
             
              <Box display="flex" margin={3} justifyContent="center" flexWrap="wrap" alignItems="center" gap={0.7}>
              <Chip color={"default"} size="medium" label={dayjs(dataHour).format('DD/MM [às] HH:00')} />
              <Chip color={"default"} size="medium" label={formatCurrency(service.price)} />
          </Box>
              


            </Box>



          </CardContent>

        </Card>
      </Grid>
    </>
  )
}