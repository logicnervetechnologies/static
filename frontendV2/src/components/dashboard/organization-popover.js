import { MenuItem, Popover } from '@mui/material';

const organizations = [
  'Acme Inc',
  'Division Inc',
  'Developer View',
  'Provider View',
  'Patient View'
];

export const OrganizationPopover = (props) => {
  const { anchorEl, onClose, open, changeView, views, ...other } = props;

  const handleChange = (organization) => {
    changeView?.(organization);
    onClose?.();
  };
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 248 } }}
      transitionDuration={0}
      {...other}>
      {views.map((view) => (
        <MenuItem
          key={view}
          onClick={() => handleChange(view)}
        >
          {view}
        </MenuItem>
      ))}
    </Popover>
  );
};
