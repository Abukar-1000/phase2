import { Button, CircularProgress } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import config from "../Config/config";

interface IDownloadPackageProps {
    Name: string;
    Version: string;
}
export function DownloadPackage({ Name, Version }: IDownloadPackageProps) {
    
    const { isPending, isError, data, mutate, error } = useMutation({
        mutationFn: async () => {
            const res =  await axios.get( config.route + `packages/download/${Name}/${Version}`,
                {
                    params: {
                        packageName: Name,
                        version: Version
                    }
                }
            )

            const dowloadLink  =  res?.data?.result?.body?.downloadLink;
            window.location.replace(dowloadLink);
        },
    })

    return (
        <Button
            href=""
            variant="text"
            color="success"
            onClick={e => mutate()}
            endIcon={
                isPending?
                    <CircularProgress color="success" size="1.5rem" />
                :
                    <DownloadIcon />
            }
        >
            Download
        </Button>
    );
}

export default DownloadPackage;