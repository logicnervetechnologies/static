import { Box, Card, CardContent, CardHeader } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Chart } from '../../chart';

export const TDChart = (props) => {
  const theme = useTheme();
  const {x, y, label} = props;
  const chartOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: ['#ffb547', '#7783DB'],
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'solid',
      opacity: 0
    },
    grid: {
      borderColor: theme.palette.divider
    },
    markers: {
      strokeColors: theme.palette.background.paper,
      size: 6
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: x
    }
  };

  const chartSeries = [
    {
      name: label,
      data: y
    },
    // {
    //   name: 'Up/Cross-Selling',
    //   data: [11, 32, 45, 32, 34, 52, 41, 80, 96, 140, 30, 100]
    // }
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        p: 3
      }}
    >
      <Card>
        <CardHeader title={label} />
        <CardContent>
          <Chart
            height={360}
            options={chartOptions}
            series={chartSeries}
            type="area"
          />
        </CardContent>
      </Card>
    </Box>
  );
};
