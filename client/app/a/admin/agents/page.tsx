"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import Link from "next/link";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const AgentPage = () => {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <NavbarAgent
        currentPage="Agents"
        link={[{ name: "Admin", href: "/a/admin" }]}
      />
      <div className="p-5  ">
        <div className="p-10 bg-white flex flex-col gap-5 ">
          <div className="flex justify-between">
            <h1
              className="text-2xl font-bold text-gray-700 self-center
            "
            >
              Agents
            </h1>
            <div className="flex gap-8 ">
              <form action="" className="border relative rounded-md ">
                <BsSearch className="text-sm text-gray-500 absolute top-3 left-2" />
                <input
                  type="text"
                  placeholder="search for agents"
                  className="h-full outline-blue-500 rounded-md hover:border-black hover:border pl-8"
                />
              </form>
              <button className="mr-20 text-sm text-white border bg-[#123e54] p-2 px-5 rounded-md">
                New Agent
              </button>
            </div>
          </div>
          <div className="flex gap-5 p-5">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">sort by</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="sort by"
                onChange={handleChange}
              >
                <MenuItem value={"name"}>Name</MenuItem>
                <MenuItem value={"last seen"}>Last seen</MenuItem>
                <MenuItem value={"created date"}>Created date</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FetchedAgents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPage;

import {
  Checkbox,
  FormControlLabel,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AgentInfo from "@/Components/AgentInfo";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#123d52",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#123d52",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    innerHeight: 200,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [1, 2, 3, 4];
const FetchedAgents = () => {
  return (
    <TableContainer className="p-3">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className="p-10">
          <TableRow className="bg-slate-50 pl-5 text-gray-800 ">
            <StyledTableCell className="">Name</StyledTableCell>
            <StyledTableCell align="left">Role</StyledTableCell>
            <StyledTableCell align="left">Department</StyledTableCell>
            <StyledTableCell align="right">Last seen</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <StyledTableRow key={i} className="bg-white hover:bg-slate-50 ">
              <StyledTableCell component="th" scope="row">
                <AgentInfo />
              </StyledTableCell>
              <StyledTableCell align="left">
                Account adminstrator
              </StyledTableCell>
              <StyledTableCell align="left">091317123019823</StyledTableCell>

              <StyledTableCell align="right">an hour ago</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
