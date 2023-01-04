import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
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
import { Scrollbar } from '../../scrollbar';

export const TestDeploymentsListTable = (props) => {
  const {
    tds,
    tdsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  console.log('bang')
  console.log(tds)
  const [selectedTDs, setSelectedTDs] = useState([]);

  // Reset selected organizations when organizations change
  useEffect(() => {
      if (selectedTDs.length) {
        setSelectedTDs([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tds]);

  const handleSelectAllSchematics = (event) => {
    setSelectedTDs(event.target.checked
      ? tds.map((td) => td)
      : []);
  };

  const handleSelectOneSchematic = (event, td) => {
    if (!selectedTDs.includes(td)) {
      setSelectedTDs((prevSelected) => [...prevSelected, td]);
    } else {
      setSelectedTDs((prevSelected) => prevSelected.filter((id) => id !== td));
    }
  };

  const enableBulkActions = selectedTDs.length > 0;
  const selectedSomeSchematics = selectedTDs.length > 0
    && selectedTDs.length < tds.length;
  const selectedAllSchematics = selectedTDs.length === tds.length;
  console.log(tds)

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
            {tds.map((td) => {
              const isSchematicSelected = selectedTDs.includes(td);

              return (
                <TableRow
                  hover
                  key={td}
                  selected={isSchematicSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSchematicSelected}
                      onChange={(event) => handleSelectOneSchematic(event, td)}
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
                          href={"/dashboard/testDeployments/" + td}
                          passHref
                        >
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            Test Deployment:  {td}
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
                      {numeral(td.totalAmountSpent).format(`${td.currency}0,0.00`)}
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
                      href={"/dashboard/schematics/" + td}
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
        count={tdsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

TestDeploymentsListTable.propTypes = {
  tds: PropTypes.array.isRequired,
  tdsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
