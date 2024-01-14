import type { Service } from "../../types";

import { Box, MenuList, MenuItem, List, ListItemText } from "@mui/material";

interface Props {
  list: Service[];
  onSelect: (serviceId: number) => void;
}

const ServiceList = ({ list, onSelect }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        border: "1px solid #000",
        borderRadius: 2,
        padding: 2,
      }}
    >
      <h2>Service List</h2>
      <MenuList>
        {list.map((service) => (
          <MenuItem key={service.id} onClick={() => onSelect(service.id)}>
            <ListItemText>{service.name}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Box>
  );
};

export default ServiceList;
