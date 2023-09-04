"use client";
import {
  Checkbox,
  FormControlLabel,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
interface FetchedContactsProps {
  setChecked: Dispatch<SetStateAction<boolean[]>>;
  checked: boolean[];
  contacts: number[];
}
const FetchedContacts = ({
  setChecked,
  checked,
  contacts,
}: FetchedContactsProps) => {
  return (
    <TableContainer className="p-3 bg-slate-100">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className="p-10">
          <TableRow className="bg-slate-50 pl-5 text-gray-800 ">
            <StyledTableCell className="pl-20">Contacts</StyledTableCell>
            <StyledTableCell align="left">Email address</StyledTableCell>
            <StyledTableCell align="left">Phone number</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
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
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        checked={checked[i]}
                        sx={{
                          "& .MuiSvgIcon-root": {
                            border: "none",
                            fontSize: 18,
                            color: "green",
                          },
                        }}
                        onChange={(event) =>
                          setChecked(
                            checked.map((check: any, c: number) => {
                              if (c === i) check = event.target.checked;
                              return check;
                            })
                          )
                        }
                      />
                    }
                  />
                  <div className="self-center w-[40px] h-[40px] rounded-lg bg-slate-400">
                    {/* <Image src="" alt="profilepic" /> */}
                  </div>
                  <Link
                    href={""}
                    className="self-center text-gray-900 font-bold text-sm hover:text-blue-700"
                  >
                    Ticket Subject
                  </Link>
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">
                Emaila;lskdfj;alskdjfla;skdfj
              </StyledTableCell>
              <StyledTableCell align="left">091317123019823</StyledTableCell>

              <StyledTableCell align="right">
                <button>
                  <BsThreeDotsVertical />
                </button>
              </StyledTableCell>
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

export default FetchedContacts;
