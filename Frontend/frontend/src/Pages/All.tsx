import { Box, Button, Grid2, Pagination, Paper, Stack, Typography } from "@mui/material";
import Package from "../Assets/Package"
import IPackage from "../Types/Package"
import { useState } from "react";
import { example } from "../Pages/testAPIResponse"
import {
    useQuery
  } from '@tanstack/react-query'
import axios from "axios";
import config from "../Config/config";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
function All() {

    // Get page count
    const [page, setPage] = useState<number>(0);
    
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['todos', page],
        queryFn: async () => {
            const res =  await axios.get(config.route + `packages/directory/${page}`,
                {
                    params: {
                        page: page
                    }
                }
            )
            return res?.data?.result?.body;
        },
    })
    
    const pageCount = 2;
    const pageSize = 3;
    const start = 0;
    const stop = Math.min((start + pageSize), data?.length);
    console.log("Context: ",process.env.REACT_APP_Context)
    console.log("data is ", data);
    let uiData = [];

    if (data !== undefined && data?.length > 0) {
        try {
            uiData = data?.slice(start, stop).map((pkg: any, index: number) => <Package key={pkg} Package={pkg} />);
        }
        // end of page 
        catch (err) {
            uiData = [
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignContent={"center"}
                    height={"60dvh"}
                >
                    <Paper
                        sx={{
                            height: "25dvh",
                            width: "40dvw"
                        }}
                    >
                        <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignContent={"center"}
                            flexDirection={"column"}
                            height={"100%"}
                        >
                            <Box
                                display={"flex"}
                                justifyContent={"center"}
                                alignContent={"center"}
                                flexDirection={"row"}
                                gap={5}
                            >
                                <ReplyAllIcon fontSize="large"/>
                                <Typography variant="h5" >No more packages</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            ]
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column"
            }}
        >
            <Stack 
                direction="column" 
                spacing={2}
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
                flexDirection={"column"}
            >
                {
                    uiData
                }
                <Grid2 container>
                    <Grid2 size={6}>
                        <Box
                            display={"flex"}
                            justifyContent={"start"}
                            alignContent={"start"}
                        >
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={(e) => setPage(Math.max(0, page - 1))}
                            >
                                Previous
                            </Button>
                        </Box>
                    </Grid2>

                    <Grid2 size={6}>
                        <Box
                            display={"flex"}
                            justifyContent={"end"}
                            alignContent={"end"}
                        >
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={(e) => setPage(Math.min(pageCount, page + 1))}
                            >
                                Next
                            </Button>
                        </Box>
                    </Grid2>
                </Grid2>
            </Stack>
        </Box>
    )
}

export default All;