import { Box, Button, Grid2, Pagination, Stack } from "@mui/material";
import Package from "../Assets/Package"
import IPackage from "../Types/Package"
import { useState } from "react";
import { example } from "../Pages/testAPIResponse"
import {
    useQuery
  } from '@tanstack/react-query'
import axios from "axios";
// type Packages = IPackage[] | undefined;


function All() {

    // Get page count
    const pageCount = 2;
    const [page, setPage] = useState<number>(0);
    const pageSize = 3;
    const start = page * pageSize;
    const stop = Math.min((start + pageSize), example.length);

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['todos', page],
        queryFn: async () => {
            const res =  await axios.get(`http://localhost:443/packages/directory/${page}`,
                {
                    params: {
                        page: page
                    }
                }
            )
            return res?.data?.result?.body;
        },
    })

    console.log("data is ", data);
    let uiData = [];

    if (data !== undefined && data?.length > 0) {
        uiData = data?.slice(start, stop).map((pkg: any) => <Package Package={pkg} />);
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