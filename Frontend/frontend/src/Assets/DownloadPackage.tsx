import { Button } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

interface IDownloadPackageProps {
    Name: string;
    Version: string;
}
export function DownloadPackage({ Name, Version }: IDownloadPackageProps) {

    return (
        <Button
            href=""
            variant="text"
            color="success"
            endIcon={<DownloadIcon />}
        >
            Download
        </Button>
    );
}

export default DownloadPackage;