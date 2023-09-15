"use client";
import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BsSearch, BsTrash } from "react-icons/bs";
import AgentInfo from "./AgentInfo";
import AddAgentModal from "./AddAgentModal";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    innerHeight: 200,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

const rows: number[] = [1, 2, 3, 4, 5, 6];
const DeptAgentEdit = () => {
  const [checked, setChecked] = useState(rows.map((row) => false));
  const [isMouseOver, setIsMouseOver] = useState(rows.map((row) => false));
  const [OpenModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col gap-5 w-[75%]">
      <div className="flex justify-between">
        <div className="self-center flex border h-10 bg-white  gap-1 focus:outline-blue-500 rounded-md hover:border-gray-900 relative">
          <BsSearch className="text-[13px] absolute left-1 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search for agents"
            className="placeholder:text-sm  p-4 pl-6 rounded-md outline-blue-600"
          />
        </div>
        <button
          className="mr-20 text-sm text-white border bg-[#123e54] p-2 px-5 rounded-md"
          onClick={() => setOpenModal(true)}
        >
          Add Agents
        </button>
      </div>
      <TableContainer>
        <Table aria-label="customized table" className="">
          <TableHead className="p-10">
            <TableRow className="bg-slate-50 pl-5 text-gray-800 ">
              <StyledTableCell>
                <div className="flex gap-1">
                  <Checkbox
                    checked={!checked.includes(false)}
                    onChange={(event) => {
                      setChecked(checked.map((row) => event.target.checked));
                    }}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        border: "none",
                        fontSize: 18,
                        color: "blue",
                      },
                    }}
                  />
                  {checked.includes(true) ? (
                    <div className="flex gap-1">
                      <p className="self-center ">
                        {checked.reduce((count, currentValue) => {
                          if (currentValue) count++;
                          return count;
                        }, 0)}
                        Selected
                      </p>
                      <button className="text-sm p-1 px-4 border bg-white rounded-md">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <p className="self-center">Agent</p>
                  )}
                </div>
              </StyledTableCell>

              <StyledTableCell align="left">
                {!checked.includes(true) && <p>Department</p>}
              </StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <StyledTableRow
                key={i}
                className="bg-white hover:bg-slate-50 relative"
                onMouseEnter={() =>
                  setIsMouseOver(
                    checked.map((check: any, c: number) => {
                      if (c === i) check = true;
                      else check = false;
                      return check;
                    })
                  )
                }
                onMouseLeave={() =>
                  setIsMouseOver(
                    checked.map((check: any, c: number) => {
                      if (c === i) check = false;
                      return check;
                    })
                  )
                }
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
                              color: "blue",
                            },
                          }}
                          onChange={(event) => {
                            setChecked(
                              checked.map((check: any, c: number) => {
                                if (c === i) check = event.target.checked;
                                return check;
                              })
                            );
                          }}
                        />
                      }
                    />
                    <AgentInfo />
                  </div>
                </StyledTableCell>
                <StyledTableCell align="left">
                  Emaila;lskdfj;alskdjfla;skdfj
                </StyledTableCell>
                <StyledTableCell align="left">
                  {isMouseOver[i] && (
                    <button className="absolute top-5 left-[90%] z-10 p-2 border bg-white text-sm text-gray-500 rounded-md shadow-md">
                      <BsTrash />
                    </button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {OpenModal && (
        <AddAgentModal
          open={OpenModal}
          checked={checked}
          setChecked={setChecked}
          setOpen={setOpenModal}
        />
      )}
    </div>
  );
};

export default DeptAgentEdit;
