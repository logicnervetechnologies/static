import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { format } from 'date-fns';
import {
  Card,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { customerApi } from '../../../__fake-api__/customer-api';
import { useMounted } from '../../../hooks/use-mounted';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import PropTypes from 'prop-types';
import { MoreMenu } from '../../more-menu';
import { Scrollbar } from '../../scrollbar';
import { SeverityPill } from '../../severity-pill';

export const OrganizationMembers = (props) => {
  const [members, setMembers] = useState([])
  const [udsMap, setUdsMap] = useState({})
  const isMounted = useMounted();
  const [invoices, setInvoices] = useState([]);

  const getMembers = useCallback(async () => {
    try {
      const data = await customerApi.getCustomerInvoices();
      const { members, udsMap } = props;

      if (isMounted()) {
        setInvoices(data);
        setMembers(members)
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getMembers();
  }, [getMembers]);

  return (
    <Card {...props}>
      <CardHeader
        action={<MoreMenu />}
        title="Recent Invoices"
      />
      <Divider />
      <Scrollbar>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                ID
              </TableCell>
              <TableCell>
                Date
              </TableCell>
              <TableCell>
                Total
              </TableCell>
              <TableCell>
                Status
              </TableCell>
              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.uid}>
                <TableCell>
                  #
                  {member.uid}
                </TableCell>
                <TableCell>
                  {'Bingus' /* {format(member.issueDate, 'MMM dd,yyyy')} */}
                </TableCell>
                <TableCell>
                  {'bongus'/* {member.amount} */}
                </TableCell>
                <TableCell>
                  <SeverityPill color={/*member.status*/ 'paid' === 'paid' ? 'success' : 'error'}>
                    {/* {member.status} */ 'paid'}
                  </SeverityPill>
                </TableCell>
                <TableCell align="right">
                  <NextLink
                    href="/dashboard/invoices/1"
                    passHref
                  >
                    <IconButton component="a">
                      <ArrowRightIcon fontSize="small" />
                    </IconButton>
                  </NextLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={invoices.length}
        onPageChange={() => {
        }}
        onRowsPerPageChange={() => {
        }}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OrganizationMembers.propTypes = {
  members: PropTypes.array.isRequired,
  udsMap: PropTypes.object.isRequired
};