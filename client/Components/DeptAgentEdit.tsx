"use client";
import {
  Checkbox,
  FormControlLabel,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BsTrash } from "react-icons/bs";
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
const rows: number[] = [1, 2, 3, 4, 5, 6];
const DeptAgentEdit = () => {
  const [checked, setChecked] = useState(rows.map((row) => false));
  const [selected, setSelected] = useState(0);
  const [allSelected, setAllSelected] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(rows.map((row) => false));
  console.log(selected);
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 700, minHeight: "100%" }}
        aria-label="customized table"
      >
        <TableHead className="p-10">
          <TableRow className="bg-slate-50 pl-5 text-gray-800 ">
            <StyledTableCell>
              <div className="flex gap-1">
                <FormControlLabel
                  label=""
                  control={
                    <Checkbox
                      checked={!checked.includes(false)}
                      onChange={(event) => {
                        setChecked(checked.map((row) => event.target.checked));
                        const trueCount = checked.reduce(
                          (count, currentValue) => {
                            if (currentValue === true) {
                              return count + 1;
                            }
                            return count;
                          },
                          0
                        );
                        setSelected(trueCount);
                      }}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          border: "none",
                          fontSize: 18,
                          color: "green",
                        },
                      }}
                    />
                  }
                />
                {checked.includes(true) ? (
                  <div className="flex gap-1">
                    <p className="self-center">{selected} selected</p>
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
              {" "}
              {!checked.includes(true) && <p>Role</p>}
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
                    else check = true;
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
                            color: "green",
                          },
                        }}
                        onChange={(event) => {
                          setChecked(
                            checked.map((check: any, c: number) => {
                              if (c === i) check = event.target.checked;
                              return check;
                            })
                          );
                          const trueCount = checked.reduce(
                            (count, currentValue) => {
                              if (currentValue === true) {
                                return count + 1;
                              }
                              return count;
                            },
                            0
                          );
                        }}
                      />
                    }
                  />
                  <div className="self-center w-[40px] h-[40px] rounded-lg bg-slate-400">
                    {/* <Image src="" alt="profilepic" /> */}
                  </div>
                  <Link
                    href={"/a/admin/agents/dawit"}
                    className="self-center text-gray-800 font-medium text-sm hover:text-blue-700 flex flex-col "
                  >
                    <h1>Agent name</h1>
                    <p className="text-[12px] text-gray-500">
                      agentemail@gmail.com
                    </p>
                  </Link>
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
  );
};

export default DeptAgentEdit;
