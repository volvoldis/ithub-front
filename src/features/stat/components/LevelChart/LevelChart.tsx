import { useAppSelector } from 'store/hooks';
import { useTranslation } from 'react-i18next';
import { BarChart } from '@mantine/charts';
import {
  selectLevelStat,
  selectLevelStatIsLoading,
  selectLevelError,
} from '../../statSlice';
import { ChartTemplate } from '../ChartTemplate';

export default function LevelChart() {
  const { t } = useTranslation();

  const data = useAppSelector(selectLevelStat);
  const loading = useAppSelector(selectLevelStatIsLoading);
  const error = useAppSelector(selectLevelError);

  return (
    <ChartTemplate title={t('level_candidate')} loading={loading} error={error}>
      <BarChart
        h={360}
        data={data}
        dataKey='level'
        withLegend
        withYAxis={false}
        tooltipAnimationDuration={200}
        series={[
          { name: 'Vacancies', color: 'teal.9' },
          { name: 'Candidates', color: 'cyan.9' },
        ]}
      />
    </ChartTemplate>
  );
}
