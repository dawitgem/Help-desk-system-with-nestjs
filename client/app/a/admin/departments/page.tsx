"use client";
import NavbarAgent from "@/Components/NavbarAgent";
import Link from "next/link";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const DepartmentsPage = () => {
  return (
    <div>
      <NavbarAgent currentPage="Departments" />
      <div className="p-5  ">
        <div className="p-10 bg-white flex flex-col gap-5 ">
          <div className="flex justify-between">
            <h1
              className="text-2xl font-bold text-gray-700 self-center
            "
            >
              Departments
            </h1>
            <div className="flex gap-8 ">
              <form action="" className="border relative rounded-md ">
                <BsSearch className="text-sm text-gray-500 absolute top-3 left-2" />
                <input
                  type="text"
                  placeholder="search departments"
                  className="h-full outline-blue-500 rounded-md hover:border-black hover:border pl-8"
                />
              </form>
              <button className="mr-20 text-sm text-white border bg-[#123e54] p-2 px-5 rounded-md">
                New Department
              </button>
            </div>
          </div>
          <div>
            <FetchedAgents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentsPage;

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

const FetchedAgents = () => {
  return (
    <TableContainer className="p-3">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className="p-10">
          <TableRow className="bg-slate-50 pl-5 text-gray-800 ">
            <StyledTableCell className="">Name</StyledTableCell>
            <StyledTableCell align="left">Agents</StyledTableCell>
            <StyledTableCell align="left">Working Hours</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <StyledTableRow
              key={row.name}
              className="bg-white hover:bg-slate-50 "
            >
              <StyledTableCell component="th" scope="row">
                <div className="flex gap-2 align-middle">
                  <Link
                    href={"/a/admin/departments/dawit/edit/generalsetting"}
                    className="self-center text-gray-700 md:font-semibold text-sm hover:text-blue-700 flex flex-col"
                  >
                    <h1>Department name </h1>
                    <p className="text-[12px] text-gray-600 font-normal">
                      Descriptionkalskdjflaksfasdfjalksdjf;alskdjf;alskdjf;lksajdf
                    </p>
                  </Link>
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">0</StyledTableCell>
              <StyledTableCell align="left">12hrs</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Cupcake", 305, 3.7, 67, 4.3),
];
