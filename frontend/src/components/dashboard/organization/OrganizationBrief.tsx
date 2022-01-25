import type { FC } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown/with-html';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';

interface OrganizationBriefProps {
  description: string;
  title: string;
  owner: string;
}

const MarkdownWrapper = experimentalStyled('div')(
  ({ theme }) => (
    {
      color: theme.palette.text.primary,
      fontFamily: theme.typography.fontFamily,
      '& p': {
        marginBottom: theme.spacing(2)
      }
    }
  )
);

const OrganizationBrief: FC<OrganizationBriefProps> = (props) => {
  const {
    description,
    title,
    owner,
    ...other
  } = props;

  return (
    <Card {...other}>
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <Typography
              color="textSecondary"
              variant="overline"
            >
              Organization Name
            </Typography>
            <Typography
              color="textPrimary"
              variant="subtitle2"
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Typography
            color="textSecondary"
            sx={{ mb: 2 }}
            variant="overline"
          >
            Description
          </Typography>
          <MarkdownWrapper>
            <Markdown source={description} />
          </MarkdownWrapper>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography
            color="textSecondary"
            sx={{ mb: 2 }}
            variant="overline"
          >
            Owner
          </Typography>
          <MarkdownWrapper>
            <Markdown source={owner} />
          </MarkdownWrapper>
        </Box>
      </CardContent>
    </Card>
  );
};

OrganizationBrief.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired
};

export default OrganizationBrief;
