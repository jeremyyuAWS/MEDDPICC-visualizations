import React from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { VisualizationResult } from '../../types';

interface ChartRendererProps {
  chartData: VisualizationResult;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ chartData }) => {
  const { chartType, chartData: data } = chartData;
  
  const getChartOptions = () => {
    // Professional color palettes
    const colorPalettes = {
      default: ['#2E5BFF', '#8C54FF', '#00C6FF', '#33DB95', '#FFC555', '#FF6E6E', '#A855FF', '#6366F1'],
      monochrome: ['#000000', '#2D2D2D', '#4D4D4D', '#6D6D6D', '#8D8D8D', '#ADADAD'],
      cool: ['#2E5BFF', '#5E81FF', '#8C54FF', '#B085FF', '#00C6FF', '#5ED9FF'],
      warm: ['#FFC555', '#FFD88A', '#FF6E6E', '#FF9E9E', '#FF8A5E', '#FFAE8A'],
      forest: ['#33DB95', '#7AE7B7', '#40B37E', '#25754D', '#6ECC91', '#9EDDAC'],
      vibrant: ['#FF3366', '#33DB95', '#FFC555', '#00C6FF', '#8C54FF', '#FF6E6E']
    };

    // Choose palette based on chart type for better visual distinction
    let palette;
    switch (chartType) {
      case 'Bar':
      case 'Column':
        palette = colorPalettes.cool;
        break;
      case 'Line':
      case 'Area':
        palette = colorPalettes.forest;
        break;
      case 'Pie':
      case 'Donut':
        palette = colorPalettes.vibrant;
        break;
      case 'Radar':
        palette = colorPalettes.warm;
        break;
      default:
        palette = colorPalettes.default;
    }

    const baseOptions = {
      title: {
        text: data.title || '',
        fontFamily: 'Inter, sans-serif',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
      },
      subtitle: {
        text: data.subtitle || '',
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#6B7280',
      },
      background: {
        fill: '#ffffff',
      },
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
      theme: {
        palette: {
          fills: palette,
          strokes: palette,
        },
        overrides: {
          line: {
            series: {
              strokeWidth: 3,
              marker: {
                enabled: true,
                size: 6,
                strokeWidth: 1,
                fillOpacity: 1,
              },
              shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.15)',
                xOffset: 0,
                yOffset: 2,
                blur: 4,
              },
            },
          },
          area: {
            series: {
              strokeWidth: 2,
              marker: {
                enabled: true,
                size: 5,
              },
              fillOpacity: 0.7,
              shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.15)',
                xOffset: 0,
                yOffset: 2,
                blur: 4,
              },
            },
          },
          bar: {
            series: {
              label: {
                enabled: true,
                color: '#000000',
                fontSize: 12,
                fontFamily: 'Inter, sans-serif',
              },
              shadowEnabled: true,
              shadow: {
                color: 'rgba(0,0,0,0.15)',
                xOffset: 0,
                yOffset: 2,
                blur: 4,
              },
              cornerRadius: 4,
            },
          },
          column: {
            series: {
              label: {
                enabled: true,
                color: '#000000',
                fontSize: 12,
                fontFamily: 'Inter, sans-serif',
              },
              shadowEnabled: true,
              shadow: {
                color: 'rgba(0,0,0,0.15)',
                xOffset: 0,
                yOffset: 2,
                blur: 4,
              },
              cornerRadius: 4,
            },
          },
          pie: {
            series: {
              strokeWidth: 1,
              stroke: '#ffffff',
              calloutLabel: {
                enabled: true,
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#000000',
              },
              calloutLine: {
                colors: ['#BBBBBB'],
                width: 1,
              },
              label: {
                enabled: true,
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#ffffff',
                minAngle: 20,
              },
              tooltip: {
                enabled: true,
              },
              shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.15)',
                xOffset: 0,
                yOffset: 2,
                blur: 4,
              },
              innerRadiusOffset: 0,
            },
          },
          radar: {
            series: {
              fillOpacity: 0.7,
              strokeWidth: 2,
              marker: {
                enabled: true,
                size: 6,
              },
            },
          },
        },
      },
      legend: {
        enabled: ['Pie', 'Donut', 'Radar'].includes(chartType),
        position: 'bottom',
        spacing: 40,
        marker: {
          shape: 'circle',
          size: 6,
          padding: 8,
        },
        item: {
          fontFamily: 'Inter, sans-serif',
          fontSize: 12,
          color: '#000000',
          paddingX: 16,
          paddingY: 8,
        },
      },
    };

    // Prepare the series data
    const seriesData = data.x.map((label, index) => ({
      label,
      value: data.y[index],
    }));

    // Create chart-specific options
    switch (chartType) {
      case 'Bar':
        return {
          ...baseOptions,
          data: seriesData,
          series: [
            {
              type: 'bar',
              xKey: 'label',
              yKey: 'value',
              cornerRadius: 4,
              shadow: {
                enabled: true,
              },
              label: {
                enabled: true,
                fontWeight: 'bold',
              },
              gradient: true,
              tooltip: {
                enabled: true,
              },
            },
          ],
          axes: [
            {
              type: 'category',
              position: 'left',
              title: {
                text: data.xAxisLabel || '',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 'bold',
              },
              label: {
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#000000',
              },
              line: {
                color: '#E5E7EB',
              },
            },
            {
              type: 'number',
              position: 'bottom',
              title: {
                text: data.yAxisLabel || '',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 'bold',
              },
              label: {
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#000000',
              },
              line: {
                color: '#E5E7EB',
              },
              tick: {
                color: '#E5E7EB',
              },
              nice: true,
            },
          ],
        };
      
      case 'Column':
        return {
          ...baseOptions,
          data: seriesData,
          series: [
            {
              type: 'column',
              xKey: 'label',
              yKey: 'value',
              cornerRadius: 4,
              shadow: {
                enabled: true,
              },
              label: {
                enabled: true,
                fontWeight: 'bold',
              },
              gradient: true,
              tooltip: {
                enabled: true,
              },
            },
          ],
          axes: [
            {
              type: 'category',
              position: 'bottom',
              title: {
                text: data.xAxisLabel || '',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 'bold',
              },
              label: {
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#000000',
                rotation: 0,
              },
              line: {
                color: '#E5E7EB',
              },
            },
            {
              type: 'number',
              position: 'left',
              title: {
                text: data.yAxisLabel || '',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 'bold',
              },
              label: {
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#000000',
              },
              line: {
                color: '#E5E7EB',
              },
              tick: {
                color: '#E5E7EB',
              },
              nice: true,
            },
          ],
        };
      
      case 'Line':
        return {
          ...baseOptions,
          data: seriesData,
          series: [
            {
              type: 'line',
              xKey: 'label',
              yKey: 'value',
              marker: {
                enabled: true,
                size: 6,
              },
              tooltip: {
                enabled: true,
              },
            },
          ],
          axes: [
            {
              type: 'category',
              position: 'bottom',
              title: {
                text: data.xAxisLabel || '',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 'bold',
              },
              label: {
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#000000',
              },
              line: {
                color: '#E5E7EB',
              },
            },
            {
              type: 'number',
              position: 'left',
              title: {
                text: data.yAxisLabel || '',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 'bold',
              },
              label: {
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#000000',
              },
              line: {
                color: '#E5E7EB',
              },
              tick: {
                color: '#E5E7EB',
              },
              nice: true,
            },
          ],
        };
      
      case 'Area':
        return {
          ...baseOptions,
          data: seriesData,
          series: [
            {
              type: 'area',
              xKey: 'label',
              yKey: 'value',
              marker: {
                enabled: true,
                size: 6,
              },
              tooltip: {
                enabled: true,
              },
              fillOpacity: 0.6,
            },
          ],
          axes: [
            {
              type: 'category',
              position: 'bottom',
              title: {
                text: data.xAxisLabel || '',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 'bold',
              },
              label: {
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#000000',
              },
              line: {
                color: '#E5E7EB',
              },
            },
            {
              type: 'number',
              position: 'left',
              title: {
                text: data.yAxisLabel || '',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 'bold',
              },
              label: {
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#000000',
              },
              line: {
                color: '#E5E7EB',
              },
              tick: {
                color: '#E5E7EB',
              },
              nice: true,
            },
          ],
        };
      
      case 'Pie':
        return {
          ...baseOptions,
          data: seriesData,
          series: [
            {
              type: 'pie',
              angleKey: 'value',
              labelKey: 'label',
              label: {
                enabled: true,
              },
              calloutLabel: {
                enabled: true,
                fontWeight: 'bold',
                color: '#000000',
              },
              tooltip: {
                enabled: true,
              },
              shadow: {
                enabled: true,
              },
              innerRadiusRatio: 0,
              fills: palette,
              strokes: palette.map(() => '#ffffff'),
              strokeWidth: 1,
            },
          ],
        };
      
      case 'Donut':
        return {
          ...baseOptions,
          data: seriesData,
          series: [
            {
              type: 'pie',
              angleKey: 'value',
              labelKey: 'label',
              label: {
                enabled: true,
              },
              calloutLabel: {
                enabled: true,
                fontWeight: 'bold',
                color: '#000000',
              },
              tooltip: {
                enabled: true,
              },
              shadow: {
                enabled: true,
              },
              innerRadiusRatio: 0.6,
              fills: palette,
              strokes: palette.map(() => '#ffffff'),
              strokeWidth: 1,
            },
          ],
        };
      
      case 'Radar':
        return {
          ...baseOptions,
          data: seriesData,
          series: [
            {
              type: 'radar',
              angleKey: 'label',
              radiusKey: 'value',
              tooltip: {
                enabled: true,
              },
              fillOpacity: 0.5,
              strokeWidth: 2,
            },
          ],
        };
      
      case 'Scatter':
        return {
          ...baseOptions,
          data: seriesData,
          series: [
            {
              type: 'scatter',
              xKey: 'label',
              yKey: 'value',
              marker: {
                size: 8,
                shape: 'circle',
                fill: palette[0],
                stroke: '#ffffff',
                strokeWidth: 1,
              },
              tooltip: {
                enabled: true,
              },
            },
          ],
          axes: [
            {
              type: 'category',
              position: 'bottom',
              title: {
                text: data.xAxisLabel || '',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 'bold',
              },
              label: {
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#000000',
              },
              line: {
                color: '#E5E7EB',
              },
            },
            {
              type: 'number',
              position: 'left',
              title: {
                text: data.yAxisLabel || '',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 'bold',
              },
              label: {
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#000000',
              },
              line: {
                color: '#E5E7EB',
              },
              tick: {
                color: '#E5E7EB',
              },
              nice: true,
            },
          ],
        };
      
      default:
        // Default to column chart
        return {
          ...baseOptions,
          data: seriesData,
          series: [
            {
              type: 'column',
              xKey: 'label',
              yKey: 'value',
              cornerRadius: 4,
              shadow: {
                enabled: true,
              },
              label: {
                enabled: true,
                fontWeight: 'bold',
              },
              gradient: true,
              tooltip: {
                enabled: true,
              },
            },
          ],
          axes: [
            {
              type: 'category',
              position: 'bottom',
              title: {
                text: data.xAxisLabel || '',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 'bold',
              },
              label: {
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#000000',
              },
              line: {
                color: '#E5E7EB',
              },
            },
            {
              type: 'number',
              position: 'left',
              title: {
                text: data.yAxisLabel || '',
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 'bold',
              },
              label: {
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: '#000000',
              },
              line: {
                color: '#E5E7EB',
              },
              tick: {
                color: '#E5E7EB',
              },
              nice: true,
            },
          ],
        };
    }
  };

  return <AgChartsReact options={getChartOptions()} />;
};

export default ChartRenderer;