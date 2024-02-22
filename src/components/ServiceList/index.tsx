import type { Service } from "../../types";

import { useState } from "react";

import {
  Box,
  MenuList,
  MenuItem,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";

import { useAppSelector, useAppDispatch } from "src/store";
import {
  selectServiceList,
  selectCurrentServiceId,
  createService,
  changeCurrentSerivce,
} from "src/store/slices/editor";

interface Props {}

const ServiceList = () => {
  const dispatch = useAppDispatch();
  const currentServiceId = useAppSelector(selectCurrentServiceId);
  const servicesList = useAppSelector(selectServiceList);

  const [serviceName, setServiceName] = useState("");

  const handleClickAdd = () => {
    if (serviceName === "") {
      return;
    }

    dispatch(createService({ serviceName }));
    setServiceName("");
  };

  const handleSelectService = (serviceId: string) => {
    dispatch(changeCurrentSerivce(serviceId));
  };

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        <Button variant="outlined" onClick={handleClickAdd}>
          Add
        </Button>
      </Box>
      <MenuList>
        {servicesList.map((service) => (
          <MenuItem
            key={service.id}
            selected={service.id === currentServiceId}
            onClick={() => handleSelectService(service.id)}
          >
            <ListItemText>{service.name}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Box>
  );
};

export default ServiceList;
