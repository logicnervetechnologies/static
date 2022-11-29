import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { getInitials } from '../../../utils/get-initials';
import { Scrollbar } from '../../scrollbar';

export const SchematicListTable = (props) => {
  const {
    schematics,
    schematicsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedSchematics, setSelectedSchematics] = useState([]);

  // Reset selected organizations when organizations change
  useEffect(() => {
      if (selectedSchematics.length) {
        setSelectedSchematics([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [schematics]);

  const handleSelectAllSchematics = (event) => {
    setSelectedSchematics(event.target.checked
      ? schematics.map((schematic) => schematic.id)
      : []);
  };

  const handleSelectOneSchematic = (event, schematicId) => {
    if (!selectedSchematics.includes(schematicId)) {
      setSelectedSchematics((prevSelected) => [...prevSelected, schematicId]);
    } else {
      setSelectedSchematics((prevSelected) => prevSelected.filter((id) => id !== schematicId));
    }
  };

  const enableBulkActions = selectedSchematics.length > 0;
  const selectedSomeSchematics = selectedSchematics.length > 0
    && selectedSchematics.length < schematics.length;
  const selectedAllSchematics = selectedSchematics.length === schematics.length;
  console.log(schematics)

  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.mode === 'dark'
            ? 'neutral.800'
            : 'neutral.100',
          display: enableBulkActions ? 'block' : 'none',
          px: 2,
          py: 0.5
        }}
      >
        <Checkbox
          checked={selectedAllSchematics}
          indeterminate={selectedSomeSchematics}
          onChange={handleSelectAllSchematics}
        />
        <Button
          size="small"
          sx={{ ml: 2 }}
        >
          Delete
        </Button>
        <Button
          size="small"
          sx={{ ml: 2 }}
        >
          Edit
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllSchematics}
                  indeterminate={selectedSomeSchematics}
                  onChange={handleSelectAllSchematics}
                />
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Location
              </TableCell>
              <TableCell>
                Orders
              </TableCell>
              <TableCell>
                Spent
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schematics.map((schematic) => {
              const isSchematicSelected = selectedSchematics.includes(schematic.id);

              return (
                <TableRow
                  hover
                  key={schematic.schemaId}
                  selected={isSchematicSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSchematicSelected}
                      onChange={(event) => handleSelectOneSchematic(event, schematic.schemaId)}
                      value={isSchematicSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Box sx={{ ml: 1 }}>
                        <NextLink
                          href={"/dashboard/schematics/" + schematic.schemaId}
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {schematic.type}
                          </Link>
                        </NextLink>
                        {/* <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {schematic.email}
                        </Typography> */}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {/* {`${schematic.address.city}, ${schematic.address.state_prov}, ${schematic.address.country}`} */}
                  </TableCell>
                  <TableCell>
                    {/* {schematic.totalOrders} */}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      {numeral(schematic.totalAmountSpent).format(`${schematic.currency}0,0.00`)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {/* <NextLink
                      href="/dashboard/organizations/1/edit"
                      passHref
                    >
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink> */}
                    <NextLink
                      href={"/dashboard/schematics/" + schematic.schemaId}
                      passHref
                    >
                      <IconButton component="a">
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={schematicsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

SchematicListTable.propTypes = {
  schematics: PropTypes.array.isRequired,
  schematicsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
