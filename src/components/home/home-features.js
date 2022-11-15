import { useState } from 'react';
import {
  Avatar,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Cog as CogIcon } from '../../icons/cog';
import { Lock as LockIcon } from '../../icons/lock';
import { MinusOutlined as MinusOutlinedIcon } from '../../icons/minus-outlined';
import { Template as TemplateIcon } from '../../icons/template';

const getFeatures = (theme) => ([
  {
    icon: LockIcon,
    image: `/static/home/auth_${theme}.png`,
    items: [
      'Direct connection to the LN Cloud', 
      'BT Relay connection through the LN Mobile App'
    ],
    subheader: 'Logicnerve’s infrastructure allows your IoT devices to be easily connected to the cloud.',
    title: 'IoT connection options'
  },
  {
    icon: CogIcon,
    items: [
      'Development',
      'Test',
      'Reserve',
      'Pre-deployment',
      'Deployed',
      'Error',
    ],
    subheader: 'Developers can monitor devices between multiple states.',
    image: `/static/home/flows_${theme}.png`,
    title: 'Device State Monitoring'
  },
  {
    icon: TemplateIcon,
    image: `/static/home/landing_${theme}.png`,
    items: ['Pateint Verification', 'Automated Testing', 'EMR Relay'],
    subheader: 'Developers have many features available to setup their devices for usage.',
    title: 'Deployment Features'
  }
]);

export const HomeFeatures = (props) => {
  const theme = useTheme();
  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = getFeatures(theme.palette.mode);

  const handleChangeFeature = (index) => {
    setSelectedFeature(index);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        py: 15
      }}
      {...props}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <Typography variant="h3">
              Modern technology stack
            </Typography>
            <Typography
              color="textSecondary"
              sx={{ py: 2 }}
              variant="subtitle1"
            >
               LogicNerve provides developers with a multitude of features to easily develop thier devices. 
            </Typography>
            {features.map((feature, index) => {
              const { icon: Icon, items, subheader, title } = feature;

              const selected = index === selectedFeature;

              return (
                <Box
                  key={title}
                  onClick={() => handleChangeFeature(index)}
                  sx={{
                    borderRadius: 1,
                    cursor: 'pointer',
                    display: 'flex',
                    mb: 2,
                    p: 2,
                    ...(selected && {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      cursor: 'default'
                    })
                  }}
                >
                  <Avatar
                    sx={{
                      mr: 2,
                      ...(selected && {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText'
                      })
                    }}
                  >
                    <Icon fontSize="small" />
                  </Avatar>
                  <div>
                    <Typography variant="h6">
                      {title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                    >
                      {subheader}
                    </Typography>
                    {selected && (
                      <List
                        disablePadding
                        sx={{
                          display: 'grid',
                          gap: 1,
                          pt: 2,
                          ...(items.length > 4 && {
                            sm: 'repeat(2, 1fr)'
                          })
                        }}
                      >
                        {items.map((item) => (
                          <ListItem
                            disableGutters
                            key={item}
                            sx={{ py: 0 }}
                          >
                            <ListItemAvatar
                              sx={{
                                alignItems: 'center',
                                display: 'flex',
                                minWidth: 0,
                                mr: 0.5
                              }}
                            >
                              <MinusOutlinedIcon color="primary" />
                            </ListItemAvatar>
                            <ListItemText
                              primary={(
                                <Typography variant="subtitle2">
                                  {item}
                                </Typography>
                              )}
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </div>
                </Box>
              );
            })}
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Box
              sx={{
                position: 'relative',
                pt: 'calc(965 / 1224 * 100%)',
                '& img': {
                  height: 'auto',
                  position: 'absolute',
                  top: 0,
                  width: '100%'
                }
              }}
            >
              <img
                alt=""
                src={features[selectedFeature].image}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
