import React, { useEffect, useState } from "react";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  useGetAllCompanies();
  const { allCompany, searchCompany } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(allCompany);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      allCompany?.length > 0 &&
      allCompany?.filter((company) => {
        if (searchCompany) {
          return company?.name
            .toLowerCase()
            .includes(searchCompany?.toLowerCase());
        }
        return true;
      });

    setFilterCompany(filteredCompany);
  }, [allCompany, searchCompany]);

  return (
    <div>
      <Table>
        <TableCaption>
          A List of your recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allCompany?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't registered any company yet
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company) => (
              <TableRow key={company?._id}>
                {" "}
                <TableCell className="text-center">
                  <Avatar>
                    <AvatarImage
                      src={company?.logo}
                      alt={`${company?.name} Logo`}
                    />{" "}
                    {/* Update the logo URL */}
                  </Avatar>
                </TableCell>
                <TableCell className="text-center">{company?.name}</TableCell>{" "}
                <TableCell className="text-center">
                  {new Date(company?.createdAt).toLocaleDateString() || "N/A"}
                </TableCell>{" "}
                <TableCell className="text-center">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-28">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company?._id}`)
                        }
                        className="flex items-center gap-4 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
