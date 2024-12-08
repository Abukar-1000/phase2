import { Box, Button, Grid2, Pagination, Stack } from "@mui/material";
import Package from "../Assets/Package"
import IPackage from "../Types/Package"
import { useState } from "react";
import { example } from "../Pages/testAPIResponse"

// type Packages = IPackage[] | undefined;


function All() {

    // Get page count
    const pageCount = 2;
    const [page, setPage] = useState<number>(0);
    const pageSize = 3;
    const start = page * pageSize;
    const stop = Math.min((start + pageSize), example.length);
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
                    example?.slice(start, stop).map((pkg) => <Package Package={pkg} />)
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