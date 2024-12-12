import { Box,  Grid2, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import config from "../Config/config";
import Inventory2Icon from '@mui/icons-material/Inventory2';

function Search() {
    const [regex, setRegex] = useState<string>("");

    const { isPending, isError, mutate, data, error } = useMutation({
        mutationFn: async (regex: string) => {

            const res =  await axios.get( config.route + `packages/search/${regex}/named`,
                {
                    params: {
                        nameRegex: regex,
                        readmeRegex: ""
                    }
                }
            )

            const data = res?.data?.result?.body;
            if (data === undefined)
            {
                throw new Error("Couldn't find values for " + regex);
            }

            return data;
        },
        
    })
    
    console.log("response", data, "error", error);
    const lableStyle = {
        "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "secondary.main",
                borderWidth: "3px",
                color: "secondary.main"
            }
        }
    }

    const packages = data?.map((pkg: string) => (
            <Paper
            sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "row",
                gap: 2,
                padding: "1rem",
            }}
            >
                <Inventory2Icon />
                <Typography>
                    {pkg}
                </Typography>
            </Paper>
    ));

    return (
        <Box>
            <Paper
                sx={{
                    padding: "0.5rem"
                }}
            >
                <Grid2 container>
                    <Grid2 size={2}>
                        {/* Attach values */}
                        <InputLabel htmlFor="Package-Version">REGEX</InputLabel>
                    </Grid2>

                    <Grid2 size={10}>
                        <OutlinedInput 
                            id="Package-Version" 
                            label={"Regular Expression"}
                            color="secondary"
                            fullWidth
                            onChange={(e) => setRegex(e.target?.value)}
                            sx={lableStyle}
                            endAdornment={
                                <InputAdornment position="end" >
                                    <IconButton
                                        color="secondary"
                                        onClick={(e) =>  {
                                            console.log("regex", regex)
                                            mutate(regex)
                                        }}
                                        edge="end"
                                        >
                                        {<SearchIcon fontSize="large"/>}
                                    </IconButton>
                                </InputAdornment>
                            }    
                        />
                    </Grid2>
                </Grid2>
            </Paper>
            <Box
                minHeight={"80vh"}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    flexDirection: "column",
                    gap: 2
                }}
            >
                {
                    packages
                }
            </Box>
        </Box>
    )
}

export default Search;