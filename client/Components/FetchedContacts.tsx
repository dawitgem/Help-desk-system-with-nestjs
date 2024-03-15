"use client";
import {
  Avatar,
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
import { useQuery } from "@tanstack/react-query";
import { getContacts } from "@/utils/QueryActions";
import { user } from "@/app/Redux/features/userSlice";
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

const rows = [1, 2, 3, 4, 5, 6];
interface FetchedContactsProps {
  setChecked: Dispatch<SetStateAction<boolean[]>>;
  checked: boolean[];
  contacts: user[];
}
const FetchedContacts = ({
  setChecked,
  checked,
  contacts,
}: FetchedContactsProps) => {
  
    
  return (
    <>
    {contacts && contacts.length>0 &&
      <TableContainer className="p-3 bg-slate-100 ">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className="p-10">
          <TableRow className="bg-slate-100 border border-gray-300 pl-5 text-gray-800 ">
            <StyledTableCell className="pl-20">Contacts</StyledTableCell>
            <StyledTableCell align="left">Email address</StyledTableCell>
            <StyledTableCell align="left">Phone number</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact, i) => (
            <StyledTableRow key={contact.Id} className="bg-white hover:bg-slate-50 ">
              <StyledTableCell component="th" scope="row">
                <div className="flex gap-2 align-middle">
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        checked={checked[i]}
                        className="text-gray-300 text-sm"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            border: "none",
                            fontSize: 18,
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
                  <Avatar
                    variant="square"
                    alt="image"
                    className="w-[40px] h-[40px] bg-slate-400 rounded-md shadow-md"
                  >
                    {contact?.FullName?.slice(0, 1)}
                  </Avatar>
                  <Link
                    href={`/a/contacts/${contact.Id}`}
                    className="self-center text-gray-900 font-semibold text-sm hover:text-blue-700"
                  >
                   {contact.FullName}
                  </Link>
                </div>
              </StyledTableCell>
              <StyledTableCell align="left">
               {contact?.Email}
              </StyledTableCell>
              
              {!contact.MobilePhone ?
              <StyledTableCell align="left" className="text-gray-600 font-bold">__</StyledTableCell>
              :
              <StyledTableCell align="left">{contact.MobilePhone}</StyledTableCell>
              }


              

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
  }
  </>
  );
};

export default FetchedContacts;
