import { Box,  Grid2, IconButton, InputAdornment, OutlinedInput, Paper, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Search() {

    const lableStyle = {
        "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "secondary.main",
                borderWidth: "3px",
                color: "secondary.main"
            }
        }
    }

    return (
        <Box>
            <Paper
                sx={{
                    padding: "0.5rem"
                }}
            >
                <Grid2 container>
                    <Grid2 size={8}>
                        {/* Attach values */}
                        <TextField color="secondary" fullWidth id="outlined-basic" label="Package Name" variant="outlined" />
                    </Grid2>

                    <Grid2 size={4}>
                        {/* <InputLabel htmlFor="Package-Version">Package Version</InputLabel> */}
                        <OutlinedInput 
                            id="Package-Version" 
                            label={"Package Version"}
                            color="secondary"
                            fullWidth
                            sx={lableStyle}
                            endAdornment={
                                <InputAdornment position="end" >
                                    <IconButton
                                        color="secondary"
                                        onClick={e => {
                                            // search
                                        }}
                                        onMouseDown={e => {}}
                                        onMouseUp={e => {}}
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
            >

            </Box>
        </Box>
    )
}

export default Search;