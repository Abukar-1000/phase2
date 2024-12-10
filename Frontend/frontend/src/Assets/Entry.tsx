import { Stack } from "@mui/material";
import { JSX } from "react"
interface IEntryProps {
    Left: JSX.Element;
    Right: JSX.Element;
}

function Entry({ Left, Right }: IEntryProps) {

    return (
      <Stack direction="row" spacing={2}>
        {Left}
        {Right}
      </Stack>
    );
}

export default Entry;