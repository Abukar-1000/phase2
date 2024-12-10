import { Box, Button, Checkbox, FormControlLabel, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface IUploadFileProps {
    Prompt: string;
}

function UploadFile({ Prompt }: IUploadFileProps) {

    const [elevation, setElevation] = useState<number>(4)
    const [debloat, setDebloat] = useState<boolean>(false)
    const [selectedFile, setSelectedFile] = useState<any>(null);

    console.log(selectedFile);
    return (
        <Box
            onMouseEnter={e => setElevation(10)}
            onMouseLeave={e => setElevation(4)}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
            }}
        >
            <Paper
                elevation={elevation}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    flexDirection: "column",
                    minWidth: {
                        xs: "70dvw",
                        sm: "70dvw",
                        md: "50dvw",
                        lg: "35dvw",
                        xl: "30dvw",
                    },
                    minHeight: "20dvh",
                }}
            >
                <Stack direction={"column"} spacing={3}>
                    <Typography variant="h5">{Prompt}</Typography>
                    <Box>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            size="large"
                            color="secondary"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Package
                            <input
                                type="file"
                                style={{
                                    display: "none"
                                }}
                                onChange={(event) => setSelectedFile(event?.target?.files === null ? null: event?.target?.files[0])}
                                multiple
                            />
                        </Button>

                        {/* Debloat opt */}
                        <Box>
                            <FormControlLabel 
                                label="Debloat"
                                control={
                                    <Checkbox
                                        checked={debloat}
                                        onChange={e => setDebloat(e.target.checked)}
                                    />
                                }
                            />
                        </Box>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
}

export default UploadFile;